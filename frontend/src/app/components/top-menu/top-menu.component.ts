import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})

export class TopMenuComponent implements OnInit { // , AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit

  user: any;
  autorized: boolean;
  isMenuCollapsed = true;

  constructor(private authService: AuthService) {
      this.user = this.authService.user;
      console.log('Top-Menu-OnInit');
    }

  async ngOnInit(): Promise<void> {
  }
}
