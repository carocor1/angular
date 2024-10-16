import { TestBed } from '@angular/core/testing';

import axios from 'axios';
import { ProductsService } from './template/products/products.service';
import { ProductI } from './interfaces/product';

describe('ProductsService', () => {
  let service: ProductsService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
// Simular el localStorage para que tenga un token válido
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({
      accessToken: 'mockAccessToken'
      }));

    axiosGetSpy = spyOn(axios, 'get');// Spy para simular la llamada a axios.get
  });

  it('debería obtener productos', async () => {
    const mockProducts: ProductI[] = [
      { name: 'Product 1', price: 100, productType: { id: 1, name: 'Type 1' } },
      { name: 'Product 2', price: 200, productType: { id: 2, name: 'Type 2' } }
    ];
   
    axiosGetSpy.and.returnValue(Promise.resolve({ data: mockProducts })); // Simulamos una respuesta exitosa sin hacer la petición real
    const productos = await service.obtenerProductos();
// Verifica si se obtienen productos
    expect(productos.length > 0).toBeTrue();
  });

  it('debería manejar correctamente la ausencia de productos', async () => {
    const mockProducts: ProductI[] = []; // Array vacío, sin productos
  // Simulamos una respuesta vacía sin productos
    axiosGetSpy.and.returnValue(Promise.resolve({ data: mockProducts }));
    const productos = await service.obtenerProductos();
 // Verifica que no se obtienen productos (el array está vacío)
    expect(productos.length === 0).toBeTrue();
  });

  it('debería obtener un único producto', async () => {
    const mockProduct: ProductI = { 
      name: 'Single Product', 
      price: 150, 
      productType: { id: 1, name: 'Type 1' } 
    };
  
    axiosGetSpy.and.returnValue(Promise.resolve({ data: [mockProduct] })); // Simulamos una respuesta con un solo producto
  
    const productos = await service.obtenerProductos();
  
    // Verificamos que se haya obtenido un solo producto
    expect(productos.length).toBe(1);
    expect(productos[0].name).toBe('Single Product');
    expect(productos[0].price).toBe(150);
  });
  
});