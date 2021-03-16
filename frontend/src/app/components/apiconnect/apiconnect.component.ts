import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apiconnect',
  templateUrl: './apiconnect.component.html',
  styleUrls: ['./apiconnect.component.css']
})
export class ApiconnectComponent implements OnInit {

  username = '';
  password = '';
  apiUri = '';
  token = '';

  constructor() { }

  ngOnInit(): void {
  }

}
