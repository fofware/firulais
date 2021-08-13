import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-modal-form',
  templateUrl: './user-modal-form.component.html',
  styleUrls: ['./user-modal-form.component.css']
})
export class UserModalFormComponent implements OnInit {

  @Input() public selectedUser;

  compareUser: any;


  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private user: UsersService

  ) { }

  ngOnInit(): void {
    this.compareUser = JSON.parse(JSON.stringify(this.selectedUser));
  }
  async saveData(){
    try {
      let retData: any;
      if( this.selectedUser._id){
        retData = await this.user.save( this.selectedUser );
      } else {
        retData = await this.user.save( this.selectedUser );
      }
      delete retData.rpta['[[Prototype]]'];
      console.log("RetData",retData);
      this.selectedUser = retData.rpta;
      this.activeModal.close('Save')
    } catch (error) {
      console.log(error);
    }
  }

  checkData(): boolean | Promise<boolean> {
    let equal = (JSON.stringify(this.selectedUser) === JSON.stringify(this.compareUser));
    console.log("Compara data1", (JSON.stringify(this.selectedUser) === JSON.stringify(this.compareUser)))
    console.log(equal);
    if(!equal){
      equal = confirm('Se perderán los cambios si no lo los graba.')
    }
    return equal;
  }

}
