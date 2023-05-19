import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'f269218f9ac41fda847402ed563424ef';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getMovies(page: number): Observable<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`;
    return this.http.get(url);
  }

  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<any>(url);
  }

  getMovieCredits(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<any>(url);
  }
  getMovieImages(movieId: number): Observable<any> {
    return this.getMovieDetails(movieId).pipe(
      map((movieDetails) => {
        return {
          backdropPath: movieDetails.backdrop_path,
          posterPath: movieDetails.poster_path
        };
      })
    );
  }
  
  
}
