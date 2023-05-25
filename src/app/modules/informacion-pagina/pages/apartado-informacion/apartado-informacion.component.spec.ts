import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApartadoInformacionComponent } from './apartado-informacion.component';

describe('ApartadoInformacionComponent', () => {
  let component: ApartadoInformacionComponent;
  let fixture: ComponentFixture<ApartadoInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartadoInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartadoInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
