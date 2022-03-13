import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-progress-update',
  templateUrl: './progress-update.component.html',
  styleUrls: ['./progress-update.component.css'],
  providers: [NgbProgressbarConfig]
})
export class ProgressUpdateComponent implements OnInit {
  @Input() value = 0;
  @Input() max = 100;
  @Input() nuevos = 0;
  @Input() errores = 0;
  //@Input() cancelMsg = false;
  public contadoresLabel = [];
  public contadoresValue = [];
  saved = 0;
  constructor(config: NgbProgressbarConfig,
    public activeModal: NgbActiveModal) {
    //config.striped = true;
    //config.animated = true;
    config.showValue = true;
    config.type = 'success';
    config.height = '30px';
  }

  ngOnInit(): void {
  }
  cancel(msg){
    console.log("Canceló");
    //this.cancelMsg = true;
    this.activeModal.dismiss(msg);
  }
  setContadores(object){
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const idx = this.contadoresLabel.findIndex( value => value === key)
        if(idx === -1){
          this.contadoresLabel.push(key);
          this.contadoresValue.push(object[key]);
        } else this.contadoresValue[idx] += object[key];
      }
    }
  }
  close(msg){
    console.log("Cerro");
    this.activeModal.close(msg)
  }
}
