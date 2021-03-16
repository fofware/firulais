export interface IArticulo {
  _id?: object;
  fabricante?: string;
  marca?: string;
  rubro?: string;
  linea?: string;
  especie?: string;
  edad?: string;
  raza?: string;
  name?: string;
  d_fabricante?: boolean;
  d_marca?: boolean;
  d_rubro?: boolean;
  d_linea?: boolean;
  d_especie?: boolean;
  d_edad?: boolean;
  d_raza?: boolean;
  private_web?: boolean;
  image?: string;
  url?: string;
  iva?: number;
  margen?: number;
  tags?: string;
}
