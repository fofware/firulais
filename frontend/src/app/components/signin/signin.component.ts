import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  signIn(): void {
    this.authService.signIn(this.user).subscribe(
      res => {
        const token: any = res;
        localStorage.setItem( 'token', token );
//        localStorage.setItem( 'user', JSON.stringify(data.user));
        this.router.navigate( ['private', 'menu'] );
      },
      err => {
        console.log(err);
      }
    );
  }

}
