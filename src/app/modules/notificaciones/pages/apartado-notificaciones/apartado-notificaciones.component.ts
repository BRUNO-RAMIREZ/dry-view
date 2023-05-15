import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-apartado-notificaciones',
  templateUrl: './apartado-notificaciones.component.html',
  styleUrls: ['./apartado-notificaciones.component.scss']
})
export class ApartadoNotificacionesComponent implements OnInit {
  private _unsubscribed: Subject<void>;
  constructor() {


    this._unsubscribed = new Subject<void>();
   }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

}
