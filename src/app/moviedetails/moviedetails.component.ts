import { Component, OnInit } from '@angular/core';
import { ThemoviesdbService } from '../themoviesdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/assets/enviroment/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId!: string;
  movie: any;
  genres: string = "";
  languages: string = "";
  companies: string = "";
  
  constructor(
    private theMovieDBService: ThemoviesdbService,
    private router: Router,
    private route: ActivatedRoute,) { 
      this.route.params.subscribe(params => {
        this.movieId = params['id'];
        this.getMovieDetails(this.movieId);
      });
  }

  ngOnInit(): void {
  }

  getMovieDetails(id: any) {
    this.theMovieDBService.getMovieDetails(id).subscribe((res: any) => {
      this.movie = res;
      this.getCast();
      this.getGenres();
      this.getLanguages();
      this.getCompanies();
      this.movie.poster_path = `${environment.imgUrl}${this.movie.poster_path}`;
      this.movie.backdrop_path = `${environment.imgUrlBig}${this.movie.backdrop_path}`;
    });
  }

  getCast() {
    this.theMovieDBService.getCastMovie(this.movieId).subscribe((res: any) => {
      this.movie.cast = res['cast'].slice(0, 10).map((cast: any) => {
        cast.imgUrl = `${environment.imgUrl}${cast.profile_path}`;
        
        return cast;
      });
      console.log(this.movie)
    });
  }

  getGenres() {
    this.movie.genres.forEach((genre: any) => {
      console.log(genre)
      this.genres += genre.name + "  ";
    })
    console.log("genre",this.genres)
  }

  getLanguages() {
    this.movie.spoken_languages.forEach((language: any) => {
      console.log(language)
      this.languages += language.english_name + "  ";
    })
    console.log("languages",this.languages)
  }

  getCompanies() {
    this.movie.production_companies.forEach((companie: any) => {
      console.log(companie)
      this.companies += companie.name + "  ";
    })
    console.log("companies",this.companies)
  }

}
