import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasRouterOutletComponent } from './ventas-router-outlet.component';

describe('VentasRouterOutletComponent', () => {
  let component: VentasRouterOutletComponent;
  let fixture: ComponentFixture<VentasRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasRouterOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
