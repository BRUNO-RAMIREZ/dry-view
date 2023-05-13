import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartadoNotificacionesComponent } from './apartado-notificaciones.component';

describe('ApartadoNotificacionesComponent', () => {
  let component: ApartadoNotificacionesComponent;
  let fixture: ComponentFixture<ApartadoNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartadoNotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartadoNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
