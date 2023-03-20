import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPricingTableComponent } from './app-pricing-table.component';

describe('AppPricingTableComponent', () => {
  let component: AppPricingTableComponent;
  let fixture: ComponentFixture<AppPricingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPricingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPricingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
