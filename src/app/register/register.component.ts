import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServiceService } from '../account-service.service';
import { User } from '../login-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private accountService: AccountServiceService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required]]
    });
  }

  get emailControl() {
    return this.registerForm.get('Email');
  }

  get passwordControl() {
    return this.registerForm.get('Password');
  }

  get confirmPasswordControl() {
    return this.registerForm.get('ConfirmPassword');
  }

  onSubmit() {
    const registerData = {
      Email: this.registerForm.get('Email')!.value,
      Password: this.registerForm.get('Password')!.value,
      ConfirmPassword: this.registerForm.get('ConfirmPassword')!.value
    };
    this.accountService.register(registerData).subscribe({
      next: () => {
        console.log('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.message;
      }
    });
  }

}