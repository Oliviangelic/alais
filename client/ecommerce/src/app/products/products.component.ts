import { Component } from '@angular/core';
import { products } from '../interfaces/products.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: any[] = [
    {
      productname: 'hydrate: hyaluronic acid solution',
      description: 'Provides hydration, improves skin elasticity, and promotes a healthy, youthful complexion.',
      price: '$8.99',
      inventory: 'instock'
    },
    {
      productname: 'exfoliate: salicylic acid serum',
      description: 'Penetrates and unclogs the pores, improves skin texture, treats acne, leaves skin looking bright, and feeling beautiful.',
      price: '$7.99',
      inventory: 'instock'
    },
    {
      productname: 'brighten: glycolic acid solution',
      description: 'Reguvenates the skin, aids production of collagen, reduces hyperpigmentation, leaves your skin feeling silky smooth.',
      price: '$9.99',
      inventory: 'instock'
    },

  ]
 
}
