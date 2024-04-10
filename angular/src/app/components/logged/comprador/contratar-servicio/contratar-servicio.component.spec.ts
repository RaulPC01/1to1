import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarServicioComponent } from './contratar-servicio.component';

describe('ContratarServicioComponent', () => {
  let component: ContratarServicioComponent;
  let fixture: ComponentFixture<ContratarServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratarServicioComponent]
    });
    fixture = TestBed.createComponent(ContratarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
