import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaConfirmacionComponent } from './ventana-confirmacion.component';

describe('VentanaConfirmacionComponent', () => {
  let component: VentanaConfirmacionComponent;
  let fixture: ComponentFixture<VentanaConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
