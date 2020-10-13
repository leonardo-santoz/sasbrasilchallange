import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeService } from './services/employee.service';
import { Employee } from './models/Employee';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  employees: Employee[];
  closeResult = '';

  constructor(private employeeService: EmployeeService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listAll()
  }

  listAll() {
    return this.employeeService.listAll().subscribe(employees => {
      this.employees = employees;
      console.log(employees)
    })
  }

  remove(id: string) {
    const confirmDelete = confirm('Deseja excluir este funcionário?')

    if(confirmDelete) {
      this.employeeService.remove(id).subscribe(() => {
        alert('excluido com sucesso')
        this.employees = this.employees.filter(employee => employee.id !== id)
      }, err => {
        alert(err)
      })
    }
  }

  open(id?: string)  {
    const modal = this.modalService.open(EmployeeFormComponent)
    if(id)
      modal.componentInstance.id = id;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
