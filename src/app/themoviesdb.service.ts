import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../assets/enviroment/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map,catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemoviesdbService {
  API_BASE = environment.API_URL;
  API_KEY = environment.API_KEY;
  body: any;
  err: any;

  constructor(private http: HttpClient) { }

  formatParams(options: { [x: string]: string | number | boolean; }) {
    let params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', 'en-US');

    if (options) {
      Object.keys(options).forEach(function(key) {
        params = params.append(key, options[key]);
      });
    }
    return { params };
  }

  getDiscover(type: any, options: any): Observable<Response> {
    // options.api_key = this.API_KEY;
    const discoverUrl = `${this.API_BASE}discover/${type}`;
    return this.http.get(discoverUrl, this.formatParams(options)).pipe(
      map((res: any) => res)
    );
  }

  getMovieDetails(movieId: any): Observable<Response> {
    const movieDetilasUrl = `${this.API_BASE}movie/${movieId}`;
    return this.http.get(movieDetilasUrl, this.formatParams({})).pipe(
      map((res: any) => res)
    );
  }

  getCastMovie(movieId: any): Observable<Response> {
    const castUrl = `${this.API_BASE}movie/${movieId}/credits?api_key=${
      this.API_KEY
    }`;
    return this.http.get(castUrl).pipe(
      map((res: any) => res)
    );
  }


}
