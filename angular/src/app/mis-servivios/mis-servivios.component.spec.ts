import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisServiviosComponent } from './mis-servivios.component';

describe('MisServiviosComponent', () => {
  let component: MisServiviosComponent;
  let fixture: ComponentFixture<MisServiviosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisServiviosComponent]
    });
    fixture = TestBed.createComponent(MisServiviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
