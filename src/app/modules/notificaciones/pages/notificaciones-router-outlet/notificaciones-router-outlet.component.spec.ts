import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesRouterOutletComponent } from './notificaciones-router-outlet.component';

describe('NotificacionesRouterOutletComponent', () => {
  let component: NotificacionesRouterOutletComponent;
  let fixture: ComponentFixture<NotificacionesRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionesRouterOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
