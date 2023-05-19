import { Component, OnInit } from '@angular/core';
import { ThemoviesdbService } from '../themoviesdb.service';
import { Router } from '@angular/router';
import { environment } from 'src/assets/enviroment/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movieList: any;
  options = { page: 1}
  pager = { currentPage: 1, totalPages: 0 };
  constructor(
    private theMovieDBService: ThemoviesdbService,
    private router: Router) { 
    this.getDiscover(this.options);
  }

  ngOnInit(): void {
  }

  getDiscover(options: any) {
    this.theMovieDBService.getDiscover('movie', options).subscribe(
      (res: any) => {
        this.pager.totalPages = res.total_pages;
        if(this.movieList == undefined) {
          this.movieList = res.results;
        } else {
          this.movieList.push(...res.results);
        }


        this.movieList.forEach((movie: any) => {
          movie.poster_path = `${environment.imgUrl}${movie.poster_path}`;
          movie.backdrop_path = `${environment.imgUrl}${movie.backdrop_path}`;
        })
      },
      (error) => {
      },
    );
  }

  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details', movie.id]);
  }

  loadMore() {
    this.options.page++;
    this.getDiscover(this.options);
  }
}
