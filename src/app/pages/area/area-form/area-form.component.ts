import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AreaService } from './../services/area.service';
import { Area } from './../models/Area';
import { Employee } from './../../employee/models/Employee';
import { EmployeeService } from './../../employee/services/employee.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit {
  @Input() id: string
  @Output() onDismiss = new EventEmitter()

  currentAction: string;
  pageTitle: string;
  areaForm: FormGroup;
  employees: Employee[];
  area = new Area();

  constructor(
    private areaService: AreaService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.id)
      this.loadArea()

    this.setCurrentAction();
    this.createForm();
    this.loadEmployees();
  }

  dismiss() {
    this.onDismiss.emit();
  }

  onSubmit(event) {
    if (!this.id)
      this.addArea(event)

    this.updateArea(event)
  }

  setCurrentAction() {
    this.currentAction = this.currentAction;
  }

  createForm() {
    this.areaForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      cordinator_id: [null],
      manager_id: [null],
    })
  }

  loadEmployees() {
    return this.employeeService.listAll().subscribe(areas => {
      this.employees = areas;
    })
  }

  addArea(event) {
    event.preventDefault()
    const Area = this.areaForm.value;
    this.areaService.add(Area).subscribe(() => {
      alert('adicionado com sucesso')
      location.reload();
    }, err => {
      alert(err)
    })
  }

  loadArea() {
    this.areaService.listById(this.id).subscribe(area => {
      this.area = area;
      this.areaForm.patchValue(area);
    })
  }

  updateArea(event) {
    event.preventDefault()
    const area: Area = Object.assign(new Area(), this.areaForm.value);
    this.areaService.update(this.id, area).subscribe(area => {
      alert('alterado com sucesso')
      location.reload();
    }, err => {
      alert(err)
    })
  }
}

