import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PositionService } from './services/position.service';
import { Position } from './models/Position';
import { PositionFormComponent } from './position-form/position-form.component';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})

export class PositionComponent implements OnInit {

  positions: Position[];
  closeResult = '';

  constructor(private positionService: PositionService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listAll()
  }

  listAll() {
    return this.positionService.listAll().subscribe(positions => {
      this.positions = positions;
    })
  }

  remove(id: string) {
    const confirmDelete = confirm('Deseja excluir este cargo?')

    if(confirmDelete) {
      this.positionService.remove(id).subscribe(() => {
        alert('excluido com sucesso')
        this.positions = this.positions.filter(position => position.id !== id)
      }, err => {
        alert(err)
      })
    }
  }

  open(id?: string)  {
    const modal = this.modalService.open(PositionFormComponent)
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
