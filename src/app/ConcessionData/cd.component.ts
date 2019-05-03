import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IConcession {
  id?: number;
  name: string;
  description: string;
  price: string;
  concession_type: string;
  snack_URL: string;
}

@Component({
  selector: 'app-concessionsdata',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.css']
})
export class ConcessionsComponent implements OnInit {

  concession: Array<IConcession> = [];
  myName = '';
  concessions = [];
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
    this.concessions = await this.getConcession('concession');
  }
  async getConcession(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from getConcession()', resp);
    return resp;
  }
  async createConcession() {
    const concession = {
      name: null,
      description: null,
      price: null,
      concession_type: null,
      snack_URL: null
    };
    const resp = await this.http.post('concession', concession);
    if (resp) {
      this.concessions.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Movie creation failed!');
    }
    return resp;

  }

  async updateConcession(concession: any) {
    const resp = await this.http.put(`concession/id/${concession.id}`, concession);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Successfully saved concession!');
    }
    return resp;

  }
  async removeConcession(concession: any, index: number) {
    const resp = await this.http.delete(`concession/id/${concession.id}`);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'Failed to delete concession!');
    }
  }


}
