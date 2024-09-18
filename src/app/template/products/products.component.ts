import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductI } from '../../interfaces/product';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductComponent {
  productos: ProductI[] = [];

  constructor(private service: ProductsService){
  }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.productos = await this.service.obtenerProductos();
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  }
}

