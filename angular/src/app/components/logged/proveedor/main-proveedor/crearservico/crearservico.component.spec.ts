import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearservicoComponent } from './crearservico.component';

describe('CrearservicoComponent', () => {
  let component: CrearservicoComponent;
  let fixture: ComponentFixture<CrearservicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearservicoComponent]
    });
    fixture = TestBed.createComponent(CrearservicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
