import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { EmployeeComponent } from '../pages/employee/employee.component';
import { EmployeeFormComponent } from './../pages/employee/employee-form/employee-form.component';

@NgModule({
  declarations: [
    MainComponent, 
    EmployeeComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
