import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './movie.service';



interface MovieDetails {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  original_language: string;
  vote_average: number;
  budget: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Cast {
  name: string;
  character: string;
  profile_path: string;
}

interface MovieImage {
  file_path: string;
}

@Component({
  selector: 'app-movie-details',
  template: `
    <h1>Movie Details</h1>
    <div *ngIf="movieDetails">
      <img [src]="getPosterImageUrl(movieDetails?.poster_path ?? '')" alt="Poster Image">
      <h3>{{ movieDetails?.title }}</h3>
      <img [src]="getPosterImageUrl(movieDetails?.poster_path ?? '')" alt="Poster Image">
      <p>{{ movieDetails?.overview }}</p>
      <p>Genre: {{ getGenreNames() }}</p>
      <p>Language: {{ movieDetails?.original_language }}</p>
      <p>User Rating: {{ movieDetails?.vote_average }}</p>
      <p>Budget: {{ movieDetails?.budget }}</p>
      <p>Production Companies: {{ getProductionCompanyNames() }}</p>
      <h3>Cast</h3>
      <div *ngFor="let cast of movieCast">
        <img [src]="getCastProfileImageUrl(cast?.profile_path)" alt="Cast Profile Image">
        <p>{{ cast?.name }}</p>
        <p>{{ cast?.character }}</p>
      </div>
    </div>
    <button (click)="loadMovieDetails()">Load Movie Details</button>
  `
})
export class MovieDetailsComponent implements OnInit {
  movieId!: number;
  movieDetails: MovieDetails | undefined;
  movieCast: Cast[] = [];
  movieImages: MovieImage[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.loadMovieDetails();
    });
  }

  loadMovieDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe((data: any) => {
      this.movieDetails = {
        id: data.id,
        title: data.title,
        backdrop_path: data.backdrop_path,
        poster_path: data.poster_path,
        overview: data.overview,
        original_language: data.original_language,
        vote_average: data.vote_average,
        budget: data.budget,
        genres: data.genres,
        production_companies: data.production_companies
      };
      this.loadMovieCast();
      this.loadMovieImages();
    });
  }

  loadMovieCast() {
    this.movieService.getMovieCredits(this.movieId).subscribe((data: any) => {
      this.movieCast = data.cast;
    });
  }

  loadMovieImages() {
    this.movieService.getMovieImages(this.movieId).subscribe((data: any) => {
      this.movieImages = data.backdrops;
      
    });
  }

  getBackdropImageUrl(path: string) {
    return `https://image.tmdb.org/t/p/original/${path}`;
  }

  getPosterImageUrl(path: string) {
    return `https://image.tmdb.org/t/p/original/${path}`;
  }

  getCastProfileImageUrl(path: string) {
    return `https://image.tmdb.org/t/p/original/${path}`;
  }

  getGenreNames() {
    if (this.movieDetails && this.movieDetails.genres) {
      return this.movieDetails.genres.map(genre => genre.name).join(', ');
    }
    return '';
  }

  getProductionCompanyNames() {
    if (this.movieDetails && this.movieDetails.production_companies) {
      return this.movieDetails.production_companies.map(company => company.name).join(', ');
    }
    return '';
  }
}
