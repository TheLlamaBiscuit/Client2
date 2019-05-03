import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IMovie {
  id?: number;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-moviedata',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  movies: Array<IMovie> = [];
  myName = '';
  cars = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    await this.refresh();
  }

  async refresh() {
    this.movies = await this.getMovie('Movie');
  }
  // getCars('car');
  async getMovie(path: string) {
    const resp = await this.http.get(path);
    return resp;
  }
  async createMovie() {
    const Movie = {
      Title: null,
      Genre: null,
      Length: null,
      Publisher: null
    };
    const resp = await this.http.post('Movie', Movie);
    if (resp) {
      this.movies.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Movie creation failed!');
    }
    return resp;

  }

  async updateMovie(Movie: any) {
    const resp = await this.http.put(`Movie/id/${Movie.id}`, Movie);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Successfully saved movie!');
    }
    return resp;

  }
  async removeMovie(Movie: any, index: number) {
    const resp = await this.http.delete(`movie/id/${Movie.id}`);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'Failed to delete movie!');
    }
  }


}
