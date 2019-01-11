import { Response } from '@angular/http';
import { MovieService } from '../services/movie.service';
import Movie from '../models/movie.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(
    private movieService: MovieService
  ) { }

  movieGenres = [
    {
      Name: "Action",
      Value: 1
    },
    {
      Name: "Comedy",
      Value: 2
    },
    {
      Name: "Drama",
      Value: 3
    },
    {
      Name: "Sci Fi",
      Value: 4
    }
  ];

  //Declaring the new todo Object and initilizing it
  public newMovie: Movie = new Movie()

  //An Empty list for the visible todo list
  moviesList: Movie[];
  editMovies: Movie[] = [];


  ngOnInit(): void {
    this.movieService.getMovies()
      .subscribe(movies => {
        this.moviesList = movies
      })
  }

  create() {
    this.movieService.createMovie(this.newMovie)
      .subscribe((res) => {
        this.moviesList.push(res.data)
        this.newMovie = new Movie()
      })
  }

  editMovie(movie: Movie) {
    if(this.moviesList.includes(movie)){
      if(!this.editMovies.includes(movie)){
        this.editMovies.push(movie)
      }else{
        this.editMovies.splice(this.editMovies.indexOf(movie), 1)
        this.movieService.editMovie(movie).subscribe(res => {
          console.log('Update Succesful')
         }, err => {
            this.editMovie(movie)
            console.error('Update Unsuccesful')
          })
        }
      }
    }
  
    seenMovie(movie:Movie){
      movie.seen = true
      this.movieService.editMovie(movie).subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        this.editMovie(movie)
        console.error('Update Unsuccesful')
      })
    }

    unseenMovie(movie:Movie){
      movie.seen = false
      this.movieService.editMovie(movie).subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        this.editMovie(movie)
        console.error('Update Unsuccesful')
      })
    }

    submitMovie(event, movie:Movie){
      if(event.keyCode ==13){
        this.editMovie(movie)
      }
    }

    deleteMovie(movie: Movie) {
      this.movieService.deleteMovie(movie._id).subscribe(res => {
        this.moviesList.splice(this.moviesList.indexOf(movie), 1);
      })
    }

}
