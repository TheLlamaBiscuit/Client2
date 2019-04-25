import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IBike {
  id?: number;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
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
    const car = {
      make: null,
      model: null,
      year: null
    };
    const resp = await this.http.post('car', car);
    console.log('from createCar resp:', resp);
    if (resp) {
      this.cars.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Car create failed!');
    }
    return resp;

  }

  async updateMovie(car: any) {
    console.log('from updateCar car: ', car);
    const resp = await this.http.put(`car/id${car.id}`, car);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Car successfully saved');
    }
    return resp;

  }
  async removeMovie(car: any, index: number) {
    console.log('remove car...', index);
    this.cars.splice(index, 1);
  }


}