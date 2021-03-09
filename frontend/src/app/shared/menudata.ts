export const menudata = [
  {
    id: 'menu',
    data: {
      title: 'Administración',
      comment: 'asdfasdf adfs asd adsfasdf asdf asf',
      menu: [
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
          target: '',
          rel: 'noopener',
          route: 'archivos',
          param: ''

        },
        {
          title: 'Personas',
          icon: 'fas fa-user-alt fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          route: 'archivos1',
          param: ''
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
       ]
    }
  },
  {
    id: 'default',
    data: {
      title: 'asdasdf',
      comment: 'asdfasdfa',
      menu: [
        {
          title: 'Datos personales',
          icon: 'fas fa-database fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          route: '/pesonas/',
          param: ''
        },

      ]
    }
  },
  {
    id: 'archivos',
    data:
    {
      title: 'Archivos',
      comment: 'asdfas adsaf',
      menu: [
        {
          title: 'Importar Base de Datos',
          icon: 'fas fa-database fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          route: 'menu',
          param: ''
        },
        {
          title: 'Importar Archivos',
          icon: 'fas fa-folder fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          route: '/private/menu',
          param: 'archivos1'
        },
        {
          title: 'Importar Listas',
          icon: 'fas fa-cogs fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: '/cargalistas',
          param: ''
        },
        {
          title: 'Personas',
          icon: 'fas fa-user-alt fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: 'https://angular.io/tutorial',
          param: ''
        },
        {
          title: 'Compras',
          icon: 'fas fa-file-invoice-dollar fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: 'https://angular.io/tutorial',
          param: ''
        },
        {
          title: 'Ventas',
          icon: 'fas fa-cash-register fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: 'https://angular.io/tutorial',
          param: ''
        },
        {
          title: 'Reportes',
          icon: 'fas fa-chart-line fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: 'https://angular.io/tutorial',
          param: ''
        }
      ]
    }
  },
  {
    id: 'archivos1',
    data:
    {
      title: 'Archivos1',
      comment: 'asdfas adsaf',
      menu: [
        {
          title: 'Importar Base de Datos',
          icon: 'fas fa-database fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: '/menuarchivos',
          param: ''
        },
        {
          title: 'Importar Archivos',
          icon: 'fas fa-folder fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: '/menuarchivos',
          param: ''
        },
        {
          title: 'Importar Listas',
          icon: 'fas fa-cogs fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          route: '/cargalistas',
          param: ''
        },
        {
          title: 'Personas',
          icon: 'fas fa-user-alt fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: 'https://angular.io/tutorial',
        },
        {
          title: 'Compras',
          icon: 'fas fa-file-invoice-dollar fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: 'https://angular.io/tutorial',
          param: ''
        },
        {
          title: 'Ventas',
          icon: 'fas fa-cash-register fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: 'https://angular.io/tutorial',
          param: ''
        },
        {
          title: 'Reportes',
          icon: 'fas fa-chart-line fa-3x',
          permiso: 'moderator',
          target: '',
          rel: 'noopener',
          href: 'https://angular.io/tutorial',
          param: ''
        }
      ]
    }
  }
];
