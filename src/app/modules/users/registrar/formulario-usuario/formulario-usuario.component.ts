import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserModel } from '../../../../core/models/user.model';
@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioUsuarioComponent implements OnInit {
  public tituloForm;
  public usuario:UserModel;
  
  public formularioUsuarios:FormGroup;
  constructor(private activatedroute:ActivatedRoute,
              private fctrl:FormBuilder) { 
    this.usuario = new UserModel('','',0);
    this.tituloForm = "";
    this.formularioUsuarios = fctrl.group({
      nombres: ['', Validators.compose([
        Validators.required
      ])],
      apellidos: ['', Validators.compose([
        Validators.required
      ])],
      correo: ['', Validators.compose([
        Validators.required
      ])],
      celular: ['', Validators.compose([
        Validators.required
      ])],
      usuario: ['', Validators.compose([
        Validators.required
      ])],
      contrasenia: ['', Validators.compose([
        Validators.required
      ])],
      foto: ['', Validators.compose([

      ])]

    });

  }

  public registrar(){

  }
  ngOnInit(): void {
    this.activatedroute.params.subscribe(params =>{
       if(params.id){
        this.tituloForm = "Edicion de Usuario";
       }else{
        this.tituloForm = "Creacion de Usuario";
       }
    });
  }

}
