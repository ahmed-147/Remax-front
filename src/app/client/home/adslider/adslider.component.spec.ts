import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADsliderComponent } from './adslider.component';

describe('ADsliderComponent', () => {
  let component: ADsliderComponent;
  let fixture: ComponentFixture<ADsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ADsliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ADsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
