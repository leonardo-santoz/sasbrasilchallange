import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { EmployeeComponent } from '../pages/employee/employee.component';
import { EmployeeFormComponent } from './../pages/employee/employee-form/employee-form.component';
import { PositionComponent } from './../pages/position/position.component';
import { PositionFormComponent } from './../pages/position/position-form/position-form.component';
import { AreaComponent } from '../pages/area/area.component';
import { AreaFormComponent } from './../pages/area/area-form/area-form.component';

@NgModule({
  declarations: [
    MainComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    PositionComponent,
    PositionFormComponent,
    AreaComponent,
    AreaFormComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    EmployeeFormComponent,
    PositionFormComponent]
})
export class MainModule { }
