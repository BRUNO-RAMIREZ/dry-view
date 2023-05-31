import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInformacionComponent } from './editar-informacion.component';

describe('EditarInformacionComponent', () => {
  let component: EditarInformacionComponent;
  let fixture: ComponentFixture<EditarInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
