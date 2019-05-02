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
  selector: 'app-theaterdata',
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.css']
})
export class TheaterComponent implements OnInit {

  bikes: Array<IMovie> = [];
  myName = '';
  theaters = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    this.refresh();
    // this.createCar('car', {make: 'Tesla', model: 'X'});
    // this.updateCar('car/id/1', { make: 'Ford', model: 'Taurus' });

  }

  async refresh() {
    this.theaters = await this.getTheater('Theater')
  }
  // getCars('car');
  async getTheater(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from getTheater()', resp);
    return resp;
  }
  async createTheater() {
    const Theater = {
      Title: null,
      Genre: null,
      Length: null,
      Publisher: null
    };
    const resp = await this.http.post('Theater', Theater);
    console.log('from createTheater resp:', resp);
    if (resp) {
      this.theaters.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Theater create failed!');
    }
    return resp;

  }

  async updateTheater(Theater: any) {
    // console.log('from updateMovie Movie: ', car);
    const resp = await this.http.put(`Theater/id${Theater.id}`, Theater);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Theater successfully saved');
    }
    return resp;

  }
  async removeTheater(Theater: any, index: number) {
    console.log('remove Theater...', index);
    this.theaters.splice(index, 1);
  }


}
