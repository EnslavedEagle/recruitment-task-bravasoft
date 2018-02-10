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

  updateMovie(movieId: string, payload: Movie): Observable<any> {
    return this._http.put(`${environment.apiUrl}/movies/${movieId}`, payload);
  }

  createMovie(payload: Movie): Observable<any> {
    return this._http.post(`${environment.apiUrl}/movies`, payload);
  }

  deleteMovie(movieId: string) {
    return this._http.delete(`${environment.apiKey}/movies/${movieId}`);
  }
}
