import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EmployeeService } from './../services/employee.service';
import { PositionService } from './../../position/services/position.service';
import { Employee } from './../models/Employee';
import { Position } from './../../position/models/Position';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() id: string
  @Output() onDismiss = new EventEmitter()

  currentAction: string;
  pageTitle: string;
  employeeForm: FormGroup;
  positions: Position[];
  employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.id)
      this.loadEmployee()

    this.setCurrentAction();
    this.createForm();
    this.loadPositions();
  }

  dismiss() {
    this.onDismiss.emit();
  }

  onSubmit(event) {
    if(!this.id)
      this.addEmployee(event)

    this.updateEmployee(event)
  }

  setCurrentAction() {
    this.currentAction = this.currentAction;
  }

  createForm() {
    this.employeeForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      phone_number: [null],
      position_id: [null, [Validators.required]]
    })
  }

  loadPositions() {
    return this.positionService.listAll().subscribe(positions => {
      this.positions = positions;
    })
  }

  addEmployee(event) {
    event.preventDefault()
    const employee = this.employeeForm.value;
    this.employeeService.add(employee).subscribe(() => {
      alert('adicionado com sucesso')
      location.reload();
    }, err => {
      alert(err)
    })
  }

  loadEmployee() {
    this.employeeService.listById(this.id).subscribe(employee => {
      this.employee = employee;
      this.employeeForm.patchValue(employee);
    })
  }

  updateEmployee(event) {
    event.preventDefault()
    const employee: Employee = Object.assign(new Employee(), this.employeeForm.value);
    this.employeeService.update(this.id, employee).subscribe(employee => {
      alert('alterado com sucesso')
      location.reload();
    }, err => {
      alert(err)
    })
  }
}
