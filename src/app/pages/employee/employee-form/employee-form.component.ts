import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Output() onDismiss = new EventEmitter() 

  constructor() { }

  ngOnInit(): void {
  }

  dismiss() {
    this.onDismiss.emit();
  }

}
