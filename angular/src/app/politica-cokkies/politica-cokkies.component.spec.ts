import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaCokkiesComponent } from './politica-cokkies.component';

describe('PoliticaCokkiesComponent', () => {
  let component: PoliticaCokkiesComponent;
  let fixture: ComponentFixture<PoliticaCokkiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoliticaCokkiesComponent]
    });
    fixture = TestBed.createComponent(PoliticaCokkiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
