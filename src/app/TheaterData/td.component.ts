import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IMovie {
  id?: number;
  location: string;
  theater_type: string;
  number_of_rooms: number;
  number_of_employees: string;
}

@Component({
  selector: 'app-theaterdata',
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.css']
})
export class TheaterComponent implements OnInit {

  theater: Array<IMovie> = [];
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
  }

  async refresh() {
    this.theaters = await this.getTheater('theater');
  }
  // getTheater('theater');
  async getTheater(path: string) {
    const resp = await this.http.get(path);
    return resp;
  }
  async createTheater() {
    const theater = {
      name: null,
      location: null,
      theater_type: null,
      number_of_rooms: null,
      number_of_employees: null,
      theater_URL: null,
    };
    const resp = await this.http.post('theater', theater);
    if (resp) {
      this.theaters.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Theater creation failed!');
    }
    return resp;

  }

  async updateTheater(theater: any) {
    const resp = await this.http.put(`theater/id/${theater.id}`, theater);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Sucessfullly saved theater!');
    }
    return resp;

  }
  async removeTheater(theater: any, index: number) {
    const resp = await this.http.delete(`theater/id/${theater.id}`);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'Failed to delete theater!');
    }
  }


}
