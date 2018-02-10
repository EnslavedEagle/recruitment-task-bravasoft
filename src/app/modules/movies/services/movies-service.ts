import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '@app/interfaces';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MoviesService {
  constructor(private _http: HttpClient) { }

  fetchMovies(): Observable<Movie[]> {
    return <Observable<Movie[]>>this._http.get(`${environment.apiUrl}/movies`);
  }

  fetchMovieDetails(movieId: string): Observable<Movie> {
    return <Observable<Movie>>this._http.get(`${environment.apiUrl}/movies/${movieId}`);
  }
}
