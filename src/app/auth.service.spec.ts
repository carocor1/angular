import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LoginI } from './interfaces/token';
import axios from 'axios';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería llamar a axios.post con la URL correcta y con el cuerpo determinado, y guardar el token recibido en localStorage', async () => {
    const body: LoginI = { email: 'test@example.com', password: 'password123' };
    const response = { token: 'abc123', expirationTime: new Date().toISOString() };
  
    spyOn(axios, 'post').and.returnValue(Promise.resolve({ data: response }));
    spyOn(localStorage, 'setItem');
  
    await service.login(body);
  
    expect(axios.post).toHaveBeenCalledWith(`${service.url}/users/login`, body);
  
    expect(localStorage.setItem).toHaveBeenCalledWith('token', JSON.stringify(response));
  });

});

