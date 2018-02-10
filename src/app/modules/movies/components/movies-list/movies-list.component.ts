import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '@app/interfaces';
import { MoviesService } from '../../services';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from '@modules/shared/components';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'bv-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  public moviesList: Movie[];
  public isLoading = true;

  private _moviesSub: Subscription = new Subscription();
  private _deletionSub: Subscription = new Subscription();
  private _dialogSub: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private _moviesService: MoviesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetch();
  }
  
  ngOnDestroy() {
    this._moviesSub.unsubscribe();
    this._deletionSub.unsubscribe();
    this._dialogSub.unsubscribe();
  }

  fetch() {
    this.isLoading = true;
    this._moviesSub = this._moviesService.fetchMovies()
      .subscribe((movies) => {
        this.moviesList = movies;
        this.isLoading = false;
      });
  }

  delete(movieId: string, title: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '380px',
      data: {
        confirmationHeading: 'Are you sure?',
        confirmationText: `Do you really want to delete movie ${title}?`,
        movieId, title
      }
    });

    this._dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._deletionSub = this._moviesService.deleteMovie(movieId)
          .subscribe(() => {
            this._snackBar.open('Movie deleted!', null, { duration: 3000 });
            this.fetch();
          });
      }
    });
  }

}
