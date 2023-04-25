import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCuentaComponent } from './informacion-cuenta.component';

describe('InformacionCuentaComponent', () => {
  let component: InformacionCuentaComponent;
  let fixture: ComponentFixture<InformacionCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
