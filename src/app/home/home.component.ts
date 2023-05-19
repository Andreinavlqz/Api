import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/moviedetails/movie.service';

@Component({
  selector: 'app-home',
  template: `
    <app-movie *ngFor="let movie of movies" [movie]="movie"></app-movie>
  `
})
export class HomeComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies(1).subscribe((data: any) => {
      this.movies = data.results;
    });
  }
}
