import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AreaService } from './services/area.service';
import { Area } from './models/Area';
import { AreaFormComponent } from './area-form/area-form.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})

export class AreaComponent implements OnInit {

  areas: Area[];
  closeResult = '';

  constructor(private areaService: AreaService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listAll()
  }

  listAll() {
    return this.areaService.listAll().subscribe(areas => {
      this.areas = areas;
    })
  }

  remove(id: string) {
    const confirmDelete = confirm('Deseja excluir esta área?')

    if(confirmDelete) {
      this.areaService.remove(id).subscribe(() => {
        alert('excluido com sucesso')
        this.areas = this.areas.filter(Area => Area.id !== id)
      }, err => {
        alert(err)
      })
    }
  }

  open(id?: string)  {
    const modal = this.modalService.open(AreaFormComponent)
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
