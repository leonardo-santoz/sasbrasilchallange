import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { EmployeeComponent } from './../pages/employee/employee.component';
import { PositionComponent } from './../pages/position/position.component';
import { AreaComponent } from '../pages/area/area.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'funcionarios',
        component: EmployeeComponent
      },
      {
        path: 'cargos',
        component: PositionComponent
      },
      {
        path: 'areas',
        component: AreaComponent
      },
      {
        path: '',
        redirectTo: '/funcionarios',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
