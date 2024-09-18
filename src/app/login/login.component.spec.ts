import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

class AuthServiceSpy {
  login = jasmine.createSpy('login');
}

class RouterSpy {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthServiceSpy;
  let router: RouterSpy;

  beforeEach(async () => {
    authService = new AuthServiceSpy();
    router = new RouterSpy();

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule], // Importar el componente standalone
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería llamar a AuthService.login y redireccionar a home cuando el inicio es exitoso', async () => {
    (authService.login as jasmine.Spy).and.returnValue(of({}));

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });

    await component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});














/*

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
