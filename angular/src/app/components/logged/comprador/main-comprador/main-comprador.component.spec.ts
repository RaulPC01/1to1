import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCompradorComponent } from './main-comprador.component';

describe('MainCompradorComponent', () => {
  let component: MainCompradorComponent;
  let fixture: ComponentFixture<MainCompradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainCompradorComponent]
    });
    fixture = TestBed.createComponent(MainCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
