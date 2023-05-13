import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPaginaRouterOutletComponent } from './informacion-pagina-router-outlet.component';

describe('InformacionPaginaRouterOutletComponent', () => {
  let component: InformacionPaginaRouterOutletComponent;
  let fixture: ComponentFixture<InformacionPaginaRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionPaginaRouterOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPaginaRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
