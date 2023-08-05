import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.css']
})
export class FormDemoComponent implements OnInit {
  user: any = {};
  email = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit() {
  }
  Submit(login: any) {
    console.log("Email:", login.value.email);
    console.log("Password:", login.value.password);
  }
}

