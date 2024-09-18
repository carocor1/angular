import { Injectable } from '@angular/core';
import axios from 'axios';
import { ProductI } from '../../interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  url2 = 'http://localhost:3001';
  
  constructor() { }

  async obtenerProductos(): Promise<ProductI[]> {
    try {
      const token = (localStorage.getItem('token'));
      if (!token) {
        throw new Error('Token no encontrado en localStorage');
      }
      const tokenData = JSON.parse(token);
      const response = (await axios.get<ProductI[]>(`${this.url2}/products`, {
        headers: {
          Authorization: tokenData.accessToken
        }
    })).data;
      return response;
    } catch (error) {
      alert('Error al obtener productos');
      throw new HttpErrorResponse({ error });
    }
  }
}
