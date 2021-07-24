import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-persona-modal-form',
  templateUrl: './persona-modal-form.component.html',
  styleUrls: ['./persona-modal-form.component.css']
})
export class PersonaModalFormComponent implements OnInit {

  @Input() public selectedPersona;

  comparePersona: any;

  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private persona: PersonasService

    ) { }

  ngOnInit(): void {
    this.comparePersona = JSON.parse(JSON.stringify(this.selectedPersona));

  }
  async saveData(){
    try {
      let retData: any;
      if( this.selectedPersona._id){
        retData = await this.persona.save( this.selectedPersona );
      } else {
        retData = await this.persona.save( this.selectedPersona );
      }
      this.selectedPersona = retData.rpta;
      console.log(retData);
      this.activeModal.close('Save')
    } catch (error) {
      console.log(error);
    }
  }
  checkData(): boolean | Promise<boolean> {
    let equal = (JSON.stringify(this.selectedPersona) === JSON.stringify(this.comparePersona));
    console.log("Compara data1", (JSON.stringify(this.selectedPersona) === JSON.stringify(this.comparePersona)))
    console.log(equal);
    if(!equal){
      equal = confirm('Se perderán los cambios si no lo los graba.')
    }
    return equal;
  }

}
