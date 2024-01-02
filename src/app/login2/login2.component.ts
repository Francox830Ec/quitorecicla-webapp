import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit{
  formReg: FormGroup;

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.formReg = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

}
