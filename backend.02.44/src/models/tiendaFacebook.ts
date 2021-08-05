import { Schema, model, Document } from "mongoose";

export interface ItiendaFacebook extends Document {
  //Campos obligatorios
  id: string;           // (100)
  title: string;        // (150)
  description: string;  // (5000)
  availabiliti: string; // ('in stock'/'out of stock¡) // si está como 'out of stock' aparecerá como agotado en los canales de venta y no se incluirá en ningún anuncio.
  condition: string;    // (new/refurbished/used)
  price: string;        // El formato del precio debe ser un número seguido de un espacio y, luego, de un código de divisa ISO 4217 de tres letras. Siempre separa los decimales con un punto (.) y no con una coma (,). No incluyas símbolos de divisas como $, € o £. ARS	032	2       
  link: string;         // Url del producto http: o https:  //firulais.net.ar/producto/idproducto
  image_link: string;   // URL de la imagen principal de tu artículo. Las imágenes deben tener formato JPEG o PNG, y ser de al menos 500 x 500 píxeles y de hasta 8 MB. 
                        // Nota: Si cambias la imagen más tarde, la nueva imagen debe usar una URL diferente o no se reconocerá el cambio.
  brand: string;        // Nombre de la marca, número de pieza del fabricante (MPN) único o número mundial de artículo comercial (GTIN) del artículo. Solo debes agregar uno de esos, no todos. Para el GTIN, ingresa el UPC, EAN, JAN o ISBN del artículo. Límite de caracteres: 100.
  /*
  * Los vendedores en los EE. UU. también pueden usar la función de finalización de compra en Facebook e Instagram, que permite que los clientes completen sus compras directamente en nuestras plataformas. Para vender artículos con esa función, también se requieren los siguientes campos:
  */

  quantity_to_sell_on_facebook?: number;  // Sólo en USA
                        /*
                        * La cantidad disponible de este artículo que tienes a la venta en Facebook e Instagram. Ingresa un número entero. Reducimos automáticamente la cantidad de un artículo cada vez que se confirma una orden de compra a través de la función de finalización de compra.
                        * Nota: Para que un artículo aparezca como disponible al momento de completar la compra, la quantity_to_sell_on_facebook (cantidad a vender en Facebook) del artículo debe ser igual a 1 o superior, y el campo de availability (disponibilidad) debe decir in stock (disponible).
                        * Ejemplo: 150
                        */
  fb_product_category: string;  /*
                                * Obligatorio si vendes con la función de finalización de compra, pero recomendado para todas las tiendas. Usa este campo o google_product_category (categoría de productos de Google), o ambos.
                                * Categoría de productos de Facebook que corresponde a este artículo. Consulta la lista de categorías de productos de Facebook (en inglés estadounidense) o busca otros idiomas. Usa la ruta de taxonomía de la categoría o su número de identificación. El campo no distingue entre mayúsculas y minúsculas.
                                * Ejemplos: Clothing & Accessories > Clothing > Women's Clothing > Tops & T-Shirts (Ropa y accesorios > Ropa > Ropa de mujer > Camisas y camisetas) o 430
                                * Después de proporcionar una categoría, te recomendamos que incluyas campos opcionales específicos de esa categoría.
                                */
  google_product_category: string;  /*
                                    * google_product_category
                                    * Obligatorio si vendes con la función de finalización de compra, pero recomendado para todas las tiendas. Usa este campo o fb_product_category (categoría de productos de Facebook), o ambos.
                                    * La categoría de productos de Google para el artículo. Consulta las categorías de productos de Google (en inglés estadounidense) u obtén más información sobre las categorías. Usa la ruta de taxonomía de la categoría o su número de identificación. El campo no distingue entre mayúsculas y minúsculas.
                                    * Ejemplos: Apparel & Accessories > Clothing > Shirts & Tops (Ropa y accesorios > Ropa > Camisas y camisetas) o 212
                                    * Después de proporcionar una categoría, te recomendamos que incluyas campos opcionales específicos de esa categoría.
                                    */
  // Campos opcionales para productos
  /*
  * También puedes incluir muchos campos opcionales para compartir más información del producto con los clientes o controlar cómo se muestran los artículos. Si descargaste una plantilla, esta ya contiene algunos campos opcionales. Puedes agregar más o eliminar los que no resulten relevantes.
  */
  video: string;      //  The URL and tags for the video of your item. Videos must be in formats: 3g2, 3gp, 3gpp, asf, avi, dat, divx, dv, f4v, flv, gif, m2ts, m4v, mkv, mod, mov, mp4, mpe, mpeg, mpeg4, mpg, mts, nsv, ogm, ogv, qt, tod, ts, vob, and wmv.
  sale_price?: string;  //  Ingresa el precio con descuento si el artículo está en oferta. Usa el mismo formato que en el campo price (precio).
  sale_price_effective_date?: string; /*
                                      * El día, la hora y la zona horaria correspondientes al inicio y la finalización de la oferta. Si no agregas este campo, cualquier artículo con un sale_price (precio de oferta) permanecerá en oferta hasta que elimines el precio de oferta. Usa este formato:
                                      * AAAA-MM-DDT23:59+00:00/AAAA-MM-DDT23:59+00:00
                                      * Ingresa la fecha de inicio de la oferta con el formato AAAA-MM-DD, seguida de una "T".
                                      * Ingresa la hora de inicio con el formato de 24 horas (de 00:00 a 23:59), seguida de la zona horaria expresada en UTC (de -12:00 a +14:00).
                                      * Escribe una "/". Repite el mismo formato para especificar la fecha y la hora en que finaliza la oferta.
                                      * Ejemplo: 2020-04-30T09:30-08:00/2020-05-30T23:59-08:00
                                      * Nota: En este ejemplo, se usa la zona horaria PST (-08:00).
                                      */
  item_group_id?: string; //  Te permite configurar variantes del mismo producto, como distintos tamaños, colores o diseños. En este campo, ingresa el mismo identificador del grupo en todas las variantes del mismo producto para indicar que son parte de un grupo. Obtén más información sobre las variantes.
                          //  Ejemplo: Camiseta_algodón_1
  visibility: string;     /*
                          * Controla si el artículo se muestra en los anuncios y en la tienda. Valores admitidos: published (publicado), hidden (oculto). Los artículos se publican de forma predeterminada. Obtén más información sobre cómo desactivar y activar artículos.
                          * Ejemplo: published 
                          */
  additional_image_link?: string; /*
                                  * Las URL de un máximo de 20 imágenes adicionales del artículo, separadas por comas. Sigue las mismas especificaciones de imágenes que en el campo image_link (enlace de la imagen).
                                  * Ejemplo: http://www.jaspersmarket.com/productos/camiseta2.jpg, http://www.jaspersmarket.com/productos/camiseta3.jpg
                                  */

  color?: string;           //  El color principal del artículo. Describe el color en palabras en lugar de usar un código hexadecimal. Límite de caracteres: 200.
                            //  Ejemplo: Azul Francia
  gender?: string;          //  Género al que se dirige el artículo. Valores admitidos: female (mujer), male (hombre), unisex.
                            //  Ejemplo: unisex

  size?: string;            //  El tamaño del artículo. Usa una palabra, abreviatura o número para ingresar el tamaño, por ejemplo, pequeño, XL o 12. Límite de caracteres: 200.
                            //  Ejemplo: Mediano
  age_group?: string;       //  Grupo de edad al que se dirige el artículo. Valores admitidos: adult (adulto), all ages (todas las edades), teen (jóvenes), kids (niños), toddler (bebés), infant (infantes), newborn (recién nacidos).
                            //  Ejemplo: adult

  material?: string;        // Material con el que se fabricó el artículo. Por ejemplo: algodón, poliéster, denim o cuero. Límite de caracteres: 200.
                            //  Ejemplo: Algodón orgánico
  shipping?: string;        /*
                            * Detalles de envío del artículo, con el siguiente formato: "País:Región:Servicio:Precio".
                            * Incluye el código del país ISO 3166 de 2 letras.
                            * Ingresa la región, estado o provincia. Puedes omitir la región (pero conserva ambos signos "::") si los detalles de envío son los mismos para todo el país, como se muestra en el ejemplo de Filipinas (PH) a continuación.
                            * Ingresa el servicio de envío, como terrestre o aéreo.
                            * Ingresa el formato del precio, que debe ser un número seguido por un espacio y, luego, por un código de divisa ISO 4217 de tres letras. Nota: Para usar el texto superpuesto "Envío gratuito" en tus anuncios, ingresa un precio de "0.0".
                            * Si ofreces distintos detalles de envío por región o país, separa cada conjunto con una coma (,) como se muestra a continuación.
                            * Ejemplo: US:NY:Ground (tierra):9.99 USD, PH::Air (aire):300 PHP
                            */
  shipping_weight?: string; //  El peso del artículo para su envío en lb, oz, g o kg.
                            //  Ejemplo: 0,3 kg
  custom_label_0?: string;  //  Hasta cinco campos personalizados con cualquier información adicional en función de la cual quieras filtrar los artículos al crear conjuntos. Por ejemplo, puedes usar un campo personalizado para indicar todos los artículos que forman parte de las rebajas de verano y, luego, filtrar esos artículos en un conjunto.
  custom_label_1?: string;  //  Ejemplo: Rebajas de verano
  custom_label_2?: string;  
  custom_label_3?: string;
  custom_label_4?: string;
  // lista completa de campos opcionales https://developers.facebook.com/docs/marketing-api/catalog/reference/#da-commerce
}

export const facebook_fieldsList = [
  'id',
  'title',
  'description',
  'availabiliti',
  'condition',
  'price',
  'link',
  'image_link',
  'video',
  'brand',
  'quantity_to_sell_on_facebook',
  'fb_product_category',
  'google_product_category',
  'sale_price',
  'sale_price_effective_date',
  'item_group_id',
  'visibility',
  'additional_image_link',
  'color',
  'gender',
  'size',
  'age_group',
  'material',
  'shipping',
  'shipping_weight',
  'custom_label_0',
  'custom_label_1',
  'custom_label_2',
  'custom_label_3',
  'custom_label_4'
]
const tiendaFacebookSchema = new Schema({
  id: { type: Schema.Types.ObjectId }
  , articulo: { type: Schema.Types.ObjectId, ref: "articulos" }
  , parent: { type: Schema.Types.ObjectId, ref: "productos", default: null }
  , name: { type: String, trim: true, default: "" }
  , contiene: { type: Number, default: 0 }
  , unidad: { type: String, trim: true, default: "" }
  , precio: { type: Number, default: 0 }
  , compra: { type: Number, default:0 }
  , reposicion: { type: Number, default:0 }
  , pesable: { type: Boolean, default: false }
  , servicio: { type: Boolean, default: false }
  , pVenta: { type: Boolean, default: true }
  , pCompra: { type: Boolean, default: true }
  , codigo: { type: String, trim: true, default: '' }
  , plu: { type: String, default: "" }
  , image: { type: String, trim: true, default: "" }
  , stock: { type: Number, default: 0 }
  , stockMin: { type: Number, default: 0 }
  , stockMax: { type: Number, default: 0 }
  , iva: { type:Number, default: 0 }
  , margen: { type: Number, default: 35 }
  , tags: { ref: "tags", type: String, default: ''}
},{
  timestamps: true,
  versionKey: true
})


export default model<ItiendaFacebook>('Producto', tiendaFacebookSchema);
