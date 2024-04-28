import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiketsServiciosComponent } from './tikets-servicios.component';

describe('TiketsServiciosComponent', () => {
  let component: TiketsServiciosComponent;
  let fixture: ComponentFixture<TiketsServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiketsServiciosComponent]
    });
    fixture = TestBed.createComponent(TiketsServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
