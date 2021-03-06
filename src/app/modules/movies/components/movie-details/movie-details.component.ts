import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '@app/interfaces';
import { MoviesService } from '../../services';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from '@modules/shared/components';

@Component({
  selector: 'bv-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  public movie: Movie;
  private _paramSub: Subscription = new Subscription();
  private _moviesSub: Subscription = new Subscription();
  private _deletionSub: Subscription = new Subscription();
  private _dialogSub: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute,
    private _moviesService: MoviesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._paramSub = this._route.params.subscribe((params) => {
      this._moviesSub = this._moviesService.fetchMovieDetails(params['movieId'])
        .subscribe((movie) => this.movie = movie);
    });
  }

  ngOnDestroy() {
    this._paramSub.unsubscribe();
    this._moviesSub.unsubscribe();
    this._deletionSub.unsubscribe();
    this._dialogSub.unsubscribe();
  }
  
  delete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '380px',
      data: {
        confirmationHeading: 'Are you sure?',
        confirmationText: `Do you really want to delete movie ${this.movie.Title}?`,
        movieId: this.movie.Id,
        title: this.movie.Title
      }
    });

    this._dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._deletionSub = this._moviesService.deleteMovie(this.movie.Id)
          .subscribe(() => {
            this._snackBar.open('Movie deleted!', null, { duration: 3000 });
            this._router.navigate(['../../list'], { relativeTo: this._route });
          });
      }
    });
  }

}
