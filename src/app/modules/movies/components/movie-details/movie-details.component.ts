import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '@app/interfaces';
import { MoviesService } from '../../services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'bv-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  public movie: Movie;
  private _paramSub: Subscription = new Subscription();
  private _moviesSub: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _moviesService: MoviesService
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
  }

  delete(): void {
    console.log('Not implemented yet');
  }

}
