import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PositionService } from './../services/position.service';
import { Position } from './../models/Position';
import { Area } from './../../area/models/Area';
import { AreaService } from './../../area/services/area.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit {
  @Input() id: string
  @Output() onDismiss = new EventEmitter()

  currentAction: string;
  pageTitle: string;
  positionForm: FormGroup;
  areas: Area[];
  position = new Position();

  constructor(
    private positionService: PositionService,
    private formBuilder: FormBuilder,
    private areaService: AreaService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.id)
      this.loadPosition()

    this.setCurrentAction();
    this.createForm();
    this.loadAreas();
  }

  dismiss() {
    this.onDismiss.emit();
  }

  onSubmit(event) {
    if (!this.id)
      this.addPosition(event)

    this.updatePosition(event)
  }

  setCurrentAction() {
    this.currentAction = this.currentAction;
  }

  createForm() {
    this.positionForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null],
      area_id: [null],
    })
  }

  loadAreas() {
    return this.areaService.listAll().subscribe(areas => {
      this.areas = areas;
    })
  }

  addPosition(event) {
    event.preventDefault()
    const position = this.positionForm.value;
    this.positionService.add(position).subscribe(() => {
      alert('adicionado com sucesso')
      location.reload();
    }, err => {
      alert(err)
    })
  }

  loadPosition() {
    this.positionService.listById(this.id).subscribe(position => {
      this.position = position;
      this.positionForm.patchValue(position);
    })
  }

  updatePosition(event) {
    event.preventDefault()
    const position: Position = Object.assign(new Position(), this.positionForm.value);
    this.positionService.update(this.id, position).subscribe(position => {
      alert('alterado com sucesso')
      location.reload();
    }, err => {
      alert(err)
    })
  }
}

