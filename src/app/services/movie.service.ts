import Movie from '../models/movie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable()
export class MovieService {

  api_url = 'http://localhost:3000';
  movieUrl = `${this.api_url}/api/movies`;

  constructor(
    private http: HttpClient
  ) { }

  createMovie(movie: Movie): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.movieUrl}`, movie);
  }

  getMovies(): Observable<Movie[]>{
    return this.http.get(this.movieUrl)
    .pipe(map(res  => {
      return res["data"].docs as Movie[];
    }))
  }

  editMovie(movie:Movie){
    let editUrl = `${this.movieUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, movie);
  }

  deleteMovie(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.movieUrl}/${id}`
    return this.http.delete(deleteUrl)
    .pipe(map(res  => {
      return res;
    }))
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
  
    return Promise.reject(error.message || error);
  }

}