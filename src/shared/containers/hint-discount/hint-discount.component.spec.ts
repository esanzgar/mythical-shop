import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HintDiscountComponent } from './hint-discount.component';

describe('HintDiscountComponent', () => {
  let component: HintDiscountComponent;
  let fixture: ComponentFixture<HintDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HintDiscountComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
