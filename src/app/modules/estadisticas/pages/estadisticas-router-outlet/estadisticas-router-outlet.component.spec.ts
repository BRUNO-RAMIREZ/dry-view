import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasRouterOutletComponent } from './estadisticas-router-outlet.component';

describe('EstadisticasRouterOutletComponent', () => {
  let component: EstadisticasRouterOutletComponent;
  let fixture: ComponentFixture<EstadisticasRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasRouterOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
