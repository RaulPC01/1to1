import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPeticionesComponent } from './mis-peticiones.component';

describe('MisPeticionesComponent', () => {
  let component: MisPeticionesComponent;
  let fixture: ComponentFixture<MisPeticionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisPeticionesComponent]
    });
    fixture = TestBed.createComponent(MisPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
