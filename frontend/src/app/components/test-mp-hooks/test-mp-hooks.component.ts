import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-mp-hooks',
  templateUrl: './test-mp-hooks.component.html',
  styleUrls: ['./test-mp-hooks.component.css']
})
export class TestMpHooksComponent implements OnInit {
  retdata: {};
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retdata = this.route.queryParams['_value'];
    console.log(this.retdata);
  }

}
