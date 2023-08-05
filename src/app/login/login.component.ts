import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServiceService } from '../account-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private accountService: AccountServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });
  }

  get emailControl() {
    return this.loginForm.get('Email');
  }

  get passwordControl() {
    return this.loginForm.get('Password');
  }

  onSubmit() {
    const loginData = {
      Email: this.loginForm.get('Email')!.value,
      Password: this.loginForm.get('Password')!.value,
    };
    debugger;
    this.accountService.login(loginData).subscribe({
      next: () => {
        console.log('Login successful');
        this.router.navigate(['/quotes']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.message;
      }
    });
  }
}   