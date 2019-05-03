import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IEmployee {
  id?: number;
  first_name: string;
  last_name: string;
  emp_type: string;
}

@Component({
  selector: 'app-employeedata',
  templateUrl: './ed.component.html',
  styleUrls: ['./ed.component.css']
})

export class EmployeeComponent implements OnInit {

  bikes: Array<IEmployee> = [];
  myName = '';
  employees = [];
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
    this.employees = await this.getEmployee('employee');
  }
  // getCars('car');
  async getEmployee(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from getEmployee()', resp);
    return resp;
  }
  async createEmployee() {
    const employee = {
      first_name: null,
      last_name: null,
      emp_type: null,
      emp_URL: null,
    };
    const resp = await this.http.post('employee', employee);
    console.log('from createEmployee resp:', resp);
    if (resp) {
      this.employees.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Employee create failed!');
    }
    return resp;

  }

  async updateEmployee(employee: any) {
    // console.log('from updateEmployee employee: ', employee);
    const resp = await this.http.put(`employee/id/${employee.id}`, employee);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Employee successfully saved');
    }
    return resp;

  }
  async removeEmployee(employee: any, index: number) {
    const resp = await this.http.delete(`employee/id/${employee.id}`);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'Delete employee failed');
    }
  }


}
