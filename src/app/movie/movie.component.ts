import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MovieService } from 'src/app/moviedetails/movie.service';

interface Movie {
  id: number;
  title: string;
  posterPath: string;
}

@Component({
  selector: 'app-movie',
  template: `
    <div class="movie">
      <img [src]="getMovieImageUrl(movie.posterPath)" alt="Movie Poster">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <button (click)="viewMovieDetails()">View Details</button>
    </div>
  `
})
export class MovieComponent {
  @Input() movie!: Movie;
  @Output() movieClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor(private movieService: MovieService) {}

  getMovieImageUrl(posterPath: string) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  }

  viewMovieDetails() {
    this.movieService.getMovieDetails(this.movie.id).subscribe((data: any) => {
      
      
    });
  }
}
