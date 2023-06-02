import { Component, OnInit,OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InformacionUpdateRequest,InformacionGetResponce,InformacionUpdateResponse} from '../../../../core/models/informacion.model';
import {InformacionService} from '../../services/informacion.service';
import {Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {filter, switchMap, take, takeUntil} from "rxjs/operators";
@Component({
  selector: 'app-editar-informacion',
  templateUrl: './editar-informacion.component.html',
  styleUrls: ['./editar-informacion.component.scss']
})
export class EditarInformacionComponent implements OnInit, OnDestroy {
  private _unsubscribed: Subject<void>;
  public formularyInfo!: FormGroup;
  public infoUpdateRequest:InformacionUpdateRequest;
  constructor(private _informacionService:InformacionService,
              private _formsBuilder: FormBuilder,
              private _toastrService: ToastrService) {
    this._unsubscribed = new Subject<void>();
    this.infoUpdateRequest = {description:'',direction:'',email:'',links:[],id:0,phone:0,tittle:''};
    this._validate();
   }

  ngOnInit(): void {

    this._informacionService.getInfo().subscribe(res =>{
     // this.infoUpdateRequest = res;
      this._validate();
    });

  }
  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }


  updateInfo(){
    this._toastrService.error(`Apartado en proceso`);
    if(this.formularyInfo.valid){
      const infoUpdateRequest: InformacionUpdateRequest = {
        ...this.formularyInfo.value,
        id: this.infoUpdateRequest.id
      };
      infoUpdateRequest.description =  infoUpdateRequest.description.trim();
      infoUpdateRequest.direction =  infoUpdateRequest.direction.trim();
      infoUpdateRequest.email =  infoUpdateRequest.email.trim();
      infoUpdateRequest.links[0] =  infoUpdateRequest.links[0].trim();
      infoUpdateRequest.tittle =  infoUpdateRequest.tittle.trim();
      infoUpdateRequest.links[1] =  infoUpdateRequest.links[1].trim();
      infoUpdateRequest.links[2] =  infoUpdateRequest.links[2].trim();
      if(this.infoUpdateRequest.description != '' &&
      this.infoUpdateRequest.direction != '' &&
      this.infoUpdateRequest.email != '' &&
      this.infoUpdateRequest.links[0] != '' &&
      this.infoUpdateRequest.tittle != '' &&
      this.infoUpdateRequest.links[1] != '' &&
      this.infoUpdateRequest.links[2] != ''
      ){
        this._informacionService.editInfo(infoUpdateRequest)
        .pipe(take(1))
        .subscribe(
          (response: InformacionUpdateResponse) => {
            this._toastrService.warning(`Información actualizado con éxito`, 'Actualizar');
          },
          (error) => {
            this._toastrService.error(`Ocurrió un error al actualizar la Información`);
          });
      }else{
        this._toastrService.error(`Los campos de Información no pueden ser vacios`);
      }
      
    }else{
      this._toastrService.error(`Alguno de los campos de Información no son validos`);
    }
  }

  get tittle() {
    return this.formularyInfo.get('tittle')
  }

  get description() {
    return this.formularyInfo.get('description')
  }

  get direction() {
    return this.formularyInfo.get('direction')
  }

  get phone() {
    return this.formularyInfo.get('phone')
  }

  get email() {
    return this.formularyInfo.get('email')
  }

  get wslink() {
    return this.formularyInfo.get('wslink')
  }
  get fblink() {
    return this.formularyInfo.get('fblink')
  }
  get ytlink() {
    return this.formularyInfo.get('ytlink')
  }

  private _validate(): void {
    this.formularyInfo = this._formsBuilder.group({
      tittle: [this.infoUpdateRequest.tittle ? this.infoUpdateRequest.tittle : '', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ. ]*')]],
      description: [this.infoUpdateRequest.description ? this.infoUpdateRequest.description : '', [Validators.required, Validators.maxLength(80), Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,;:/ ]*')]],
      direction: [this.infoUpdateRequest.direction ? this.infoUpdateRequest.direction : '', [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,;:/ ]*')]],
      phone: [this.infoUpdateRequest.phone ? this.infoUpdateRequest.phone : '', [Validators.min(0), Validators.required, Validators.pattern('^([6-7][0-9]{7})$')]],
      email: [this.infoUpdateRequest.email ? this.infoUpdateRequest.email : '', [Validators.required,  Validators.pattern('[a-zA-Z0-9_.]{3,60}[@]{1}[a-zA-Z0-9_.]{4,60}[.]{1}[a-zA-Z]{2,20}')]],
      wslink: [this.infoUpdateRequest.links[2] ? this.infoUpdateRequest.links[2] : '', [Validators.required]],
      fblink: [this.infoUpdateRequest.links[0] ? this.infoUpdateRequest.links[0] : '', [Validators.required]],
      ytlink: [this.infoUpdateRequest.links[1] ? this.infoUpdateRequest.links[1] : '', [Validators.required]]
    });
  }
/*tittle:string;
    description: string;
    phone: number;
    direction:string;
    email:string;
    links: string[]; //1 fb, 2 yt, 3 ws*/

}
