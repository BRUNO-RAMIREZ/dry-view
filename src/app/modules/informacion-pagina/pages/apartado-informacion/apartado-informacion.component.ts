import { Component, OnInit } from '@angular/core';
import {InformacionService} from '../../../edicionInformacion/services/informacion.service';
import {InformacionGetResponce} from '../../../../core/models/informacion.model';
@Component({
  selector: 'app-apartado-informacion',
  templateUrl: './apartado-informacion.component.html',
  styleUrls: ['./apartado-informacion.component.scss']
})
export class ApartadoInformacionComponent implements OnInit {

  info:InformacionGetResponce;
  constructor(private _informacionService:InformacionService) { 
    this.info = {description:'Es brindar información al usuario sobre nuestros productos, con finalidad de entregar una buena experiencia',
                direction:'Calle Oquendo',
                email:'dryelectronic@gmail.com',
                links:['https://www.facebook.com/profile.php?id=100093075485231',
                'https://www.youtube.com/@dryelectronic',
                'https://wa.link/ib2imf'],
               
                id:0,
                phone:64878483,
                tittle:'Nuestra misión'};
  }
//links: string[]; //1 fb, 2 yt, 3 ws
  ngOnInit(): void {
    this._informacionService.getInfo(1).subscribe(res=>{
      this.info = res;
    });
  }

}
