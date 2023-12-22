import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  formReg: FormGroup
  // showRegisterForm = false;
  @Output() showRegisterForm = new EventEmitter();

  constructor(private userService: UserService,
              private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()

    })
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log("this.formReg.value:",  this.formReg.value);
    this.userService.register(this.formReg.value).then( response => {
      console.info("response: ", response);

      // this.router.navigate(['/login']);
      this.showRegisterForm.emit(false);
      }
    ).catch( error => console.error(error)
    );
  }


}
