import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { ProductI } from '../../interfaces/product';
import axios from 'axios';

describe('ProductsService (Integration)', () => {
  let service: ProductsService;
  let accessToken: string = '';

  beforeAll(async () => {
    TestBed.configureTestingModule({
      providers: [ProductsService]
    });

    service = TestBed.inject(ProductsService);

    try {
      const loginResponse = await axios.post('http://localhost:3000/users/login', {
        email: 'carolinapaulacorazza@gmail.com',
        password: 'carolina'
      });

      if (loginResponse.data && loginResponse.data.accessToken) {
        accessToken = loginResponse.data.accessToken;
        localStorage.setItem('token', JSON.stringify({ accessToken }));
        console.log('access token: ', accessToken)
      } else {
        throw new Error('No se recibió el accessToken');
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      throw error;
    }
  });

  it('Debería obtener la lista de productos a partir de obtenerProductos()', async () => {
    try {
      const products: ProductI[] = await service.obtenerProductos();

      if (products && products.length > 0) {
        expect(products.length).toBeGreaterThan(0);
        console.log(products);
      } else {
        fail('La respuesta no contiene productos');
      }
    } catch (error) {
      console.error('Error al recuperar los productos:', error);
      throw error;
    }
  });
});