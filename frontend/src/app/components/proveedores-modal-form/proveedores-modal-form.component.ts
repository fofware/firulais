import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListasToPrintService } from 'src/app/services/listas-to-print.service';
import { PrintService } from 'src/app/services/print.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedores-modal-form',
  templateUrl: './proveedores-modal-form.component.html',
  styleUrls: ['./proveedores-modal-form.component.css']
})

export class ProveedoresModalFormComponent implements OnInit {
  @Input() public selectedProveedor;

  compareData: any;

  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private proveedor: ProveedorService

    ) { }

  ngOnInit(): void {
    this.compareData = JSON.parse(JSON.stringify(this.selectedProveedor));
  }
  async saveData(){
    try {
      console.log(this.selectedProveedor);
      const retData = await this.proveedor.save( this.selectedProveedor );
      //delete retData.rpta['[[Prototype]]'];
      console.log("RetData",retData);
      //this.selectedProveedor = retData.rpta;
      this.activeModal.close('Save')
    } catch (error) {
      console.log(error);
    }
  }
  checkData(): boolean | Promise<boolean> {
    let equal = (JSON.stringify(this.selectedProveedor) === JSON.stringify(this.compareData));
    console.log("Compara data1", (JSON.stringify(this.selectedProveedor) === JSON.stringify(this.compareData)))
    console.log(equal);
    if(!equal){
      equal = confirm('Se perderán los cambios si no lo los graba.')
    }
    return equal;
  }

}

