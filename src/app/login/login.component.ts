import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  /*aca se pone si voy al html y a la hoja de estilos de css*/
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  testing = 'dev';
  loginForm: FormGroup;
  submitted=false

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }); 
  }

  async onSubmit(): Promise<void> {
    this.submitted=true
    if (this.loginForm.invalid) {
      return;
    }
    try {
      await this.authService.login(this.loginForm.value);
      this.router.navigate(['home'])
    } catch (error: any) {
      console.log(error)
      alert('Error en el inicio de sesión');
    }
  }
}

