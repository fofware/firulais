import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Administracion';
  menu = [
    {
      title: 'Configuración',
      icon: 'fas fa-cogs fa-3x',
      permiso: 'admin,modrator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    },
    {
      title: 'Personas',
      icon: 'fas fa-tasks fa-3x',
      permiso: 'admin,modrator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    },
    {
      title: 'Compras',
      icon: 'fas fa-tasks fa-3x',
      permiso: 'admin,modrator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    },
    {
      title: 'Ventas',
      icon: 'fas fa-tasks fa-3x',
      permiso: 'modrator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    },
    {
      title: 'Algo asdf asdf asdf asdf asd adsf ',
      icon: 'fas fa-tasks fa-3x',
      permiso: 'modrator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    }
   ];
}
