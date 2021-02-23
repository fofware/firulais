import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  title = 'Administracion';
  menu = [
    {
      title: 'Configuración',
      icon: 'fas fa-cogs fa-3x',
      permiso: 'moderator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    },
    {
      title: 'Archivos',
      icon: 'fas fa-folder fa-3x',
      permiso: 'moderator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    },
    {
      title: 'Personas',
      icon: 'fas fa-user-alt fa-3x',
      permiso: 'moderator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    },
    {
      title: 'Compras',
      icon: 'fas fa-file-invoice-dollar fa-3x',
      permiso: 'moderator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    },
    {
      title: 'Ventas',
      icon: 'fas fa-cash-register fa-3x',
      permiso: 'moderator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    },
    {
      title: 'Reportes',
      icon: 'fas fa-chart-line fa-3x',
      permiso: 'moderator',
      target: '_blank',
      rel: 'noopener',
      href: 'https://angular.io/tutorial'
    }
   ];

  constructor() { }

  ngOnInit(): void {
  }

}
