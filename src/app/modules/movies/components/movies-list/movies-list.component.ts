import { Component, OnInit } from '@angular/core';
import { Movie } from '@app/interfaces';
import { MoviesService } from '../../services';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from '@modules/shared/components';

@Component({
  selector: 'bv-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass']
})
export class MoviesListComponent implements OnInit {
  public moviesList: Movie[];
  public isLoading = true;

  constructor(
    public dialog: MatDialog,
    private _moviesService: MoviesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.isLoading = true;
    this._moviesService.fetchMovies()
      .subscribe((movies) => {
        this.moviesList = movies;
        this.isLoading = false;
      });
  }

  delete(movieId: string, title: string): void {
    console.log(movieId, title);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '380px',
      data: {
        confirmationHeading: 'Are you sure?',
        confirmationText: `Do you really want to delete movie ${title}?`,
        movieId, title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._moviesService.deleteMovie(movieId)
          .subscribe(() => {
            this._snackBar.open('Movie deleted!', null, { duration: 3000 });
            this.fetch();
          });
      }
    });
  }

}
