import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, interval } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:3000'; //Cambiar por la url de tu servidor
  private inventoryUrl = `${this.baseUrl}/inventory`;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) {}
/*cada 10 seg
  public startMonitoring(): Observable<any> {
    return interval(10000).pipe(
      tap(() => {
        this.checkInventory();
      })
    );
  }
/* 
Utiliza el servicio HTTP para realizar una solicitud GET a una URL, 
que se especifica en this.inventoryUrl. Una vez que se recibe la respuesta, 
se recorre cada elemento en la respuesta inventory. Si la quantity del elemento es cero,
 se muestra una notificación de advertencia utilizando la biblioteca Toastr. 
 Si la quantity es menor que 10, se muestra una notificación de información que indica 
 cuántas unidades quedan.

  private checkInventory(): void {
    this.http.get(`${this.inventoryUrl}`).subscribe((inventory: any[]) => {
      inventory.forEach(item => {
        if (item.quantity === 0) {
          this.toastrService.warning(`El producto ${item.name} está agotado.`);
        } else if (item.quantity < 10) {
          this.toastrService.info(
            `El producto ${item.name} está por terminarse. Quedan ${item.quantity} unidades.`
          );
        }
      });
    });
  }*/
}