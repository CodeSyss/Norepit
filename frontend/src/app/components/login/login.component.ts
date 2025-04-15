import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login', 
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', [Validators.required]), 
    rememberMe: new FormControl(false) 
  });

  submitted = false;

  constructor() { }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    console.log('Login successful!', this.loginForm.value);
    alert('Login successful! Check console for details.'); 
  }

  signInWithGoogle() {
    console.log('Attempting Google Sign-In...');
    alert('Google Sign-In clicked (implement logic)');
  }
}