import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  autorized: boolean;
  isMenuCollapsed = true;

  constructor(public users: UsersService ) { }

  async ngOnInit(): Promise <void> {
    this.user = await this.users.profile();
    console.log(this.user);
  }

  async saveData(){
    /*
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
    */
    console.log("Gabar Registro")
  }

  checkData(): boolean | Promise<boolean> {
    /*
    let equal = (JSON.stringify(this.selectedUser) === JSON.stringify(this.compareUser));
    console.log("Compara data1", (JSON.stringify(this.selectedUser) === JSON.stringify(this.compareUser)))
    console.log(equal);
    if(!equal){
      equal = confirm('Se perderán los cambios si no lo los graba.')
    }
    return equal;
    */
    return true
  }

}
