import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProveedorComponent } from './main-proveedor.component';

describe('MainProveedorComponent', () => {
  let component: MainProveedorComponent;
  let fixture: ComponentFixture<MainProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainProveedorComponent]
    });
    fixture = TestBed.createComponent(MainProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
