import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserAuthRequest} from "../../../../core/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formularyLogin!: FormGroup;

  constructor(private _formsBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router) {
    this.formularyLogin = this._formsBuilder.group({
      email: ['', [Validators.maxLength(80), Validators.required]],
      password: ['',[Validators.maxLength(80), Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public login(): void{
    const userAuthRequest: UserAuthRequest = {
      email: this.formularyLogin.value.email,
      password: this.formularyLogin.value.password
    }
    this._authService.login(userAuthRequest).subscribe(
      response => {
        this._authService.setAuthToken(response.email, response.password);
        console.warn("LOGUEADO CORRECTAMENTE", response)
        this._router.navigate(['/productos/home'])
      },
      (error) => {
        console.log("Credeanciales incorrectas");
      }
    );
  }
}
