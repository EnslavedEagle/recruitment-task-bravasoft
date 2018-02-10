import { Component, OnInit } from '@angular/core';
import { Movie } from '@app/interfaces';
import { MoviesService } from '../../services';

@Component({
  selector: 'bv-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass']
})
export class MoviesListComponent implements OnInit {
  public moviesList: Movie[];

  constructor(private _moviesService: MoviesService) { }

  ngOnInit() {
    this._moviesService.fetchMovies()
      .subscribe((movies) => this.moviesList = movies);
  }

}
