import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInformacionRouterOutletComponent } from './editar-informacion-router-outlet.component';

describe('EditarInformacionRouterOutletComponent', () => {
  let component: EditarInformacionRouterOutletComponent;
  let fixture: ComponentFixture<EditarInformacionRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInformacionRouterOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInformacionRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
