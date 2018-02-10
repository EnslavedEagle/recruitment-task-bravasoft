import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Movie } from '@app/interfaces';
import { Subscription } from 'rxjs/Subscription';
import { MoviesService } from '../../services';
import { RoutingStateService } from '@modules/shared/services';

@Component({
  selector: 'bv-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.sass']
})
export class MovieEditComponent implements OnInit {
  public movieForm: FormGroup;
  public movie: Movie;
  public formSent = false;
  public ratingOptions: boolean[];

  private _movieId = null;
  private _paramSub: Subscription = new Subscription();
  private _movieSub: Subscription = new Subscription();
  private _submitSub: Subscription = new Subscription();
  private _previousRoute: string;

  constructor(
    private _fb: FormBuilder,
    private _moviesService: MoviesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _routingState: RoutingStateService
  ) {
    this._routingState.loadRouting();
    this._previousRoute = this._routingState.getPreviousUrl();
  }

  ngOnInit() {
    this.ratingOptions = Array(10).fill(false);
    this._paramSub = this._route.params.subscribe((params) => {
      if (params['movieId']) {
        this._movieSub = this._moviesService.fetchMovieDetails(params['movieId'])
          .subscribe((movie) => {
            this._movieId = movie.Id;
            this.movie = movie;
            this.ratingOptions.map((x, i) => movie.Rating < i);
            this._initForm();
          });
      } else {
        this._initForm();
      }
    });
  }

  setRating(value) {
    this.movieForm.controls.Rating.setValue(value);
    this.movieForm.markAsDirty();
  }

  saveMovie() {
    this.formSent = true;
    const payload = this.movieForm.value;
    if (this._movieId) {
      this._submitSub = this._moviesService.updateMovie(this._movieId, payload)
        .subscribe(() => {
          this._snackBar.open('Movie updated!', null, { duration: 3000 });
          this.redirect();
        });
    } else {
      this._submitSub = this._moviesService.createMovie(payload)
        .subscribe(() => {
          this._snackBar.open('Movie created!', null, { duration: 3000 });
          this.redirect();
        });
    }
  }

  redirect(): void {
    if (!this._movieId) {
      this._router.navigate(['../list'], { relativeTo: this._route });
    } else {
      if (/^\/movies\/list$/.test(this._previousRoute)) {
        this._router.navigate(['../../list'], { relativeTo: this._route });
      } else {
        this._router.navigate(['../../details/', this._movieId], { relativeTo: this._route });
      }
    }
  }

  private _initForm(): void {
    if (this._movieId) {
      this.movieForm = this._fb.group({
        Title: [this.movie.Title, Validators.required],
        Year: [this.movie.Year, [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
        Director: [this.movie.Director, [Validators.required, Validators.pattern(/^[A-Za-z ']{2,}$/)]],
        Rating: [this.movie.Rating, Validators.required]
      });
    } else {
      this.movieForm = this._fb.group({
        Title: ['', Validators.required],
        Year: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
        Director: ['', [Validators.required, Validators.pattern(/^[A-Za-z ']{2,}$/)]],
        Rating: ['', Validators.required]
      });
    }
  }

}
