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

  bikes: Array<IMovie> = [];
  myName = '';
  cars = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    this.refresh();
    //this.createCar('car', {make: 'Tesla', model: 'X'});
    //this.updateCar('car/id/1', { make: 'Ford', model: 'Taurus' });

  }

  async refresh() {
    this.cars = await this.getMovie('Movie')
  }
  // getCars('car');
  async getMovie(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from getMovie()', resp);
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
    console.log('from createMovie resp:', resp);
    if (resp) {
      this.cars.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Movie create failed!');
    }
    return resp;

  }

  async updateMovie(Movie: any) {
    console.log('from updateMovie Movie: ', car);
    const resp = await this.http.put(`Movie/id${Movie.id}`, Movie);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Movie successfully saved');
    }
    return resp;

  }
  async removeMovie(Movie: any, index: number) {
    console.log('remove Movie...', index);
    this.cars.splice(index, 1);
  }


}
