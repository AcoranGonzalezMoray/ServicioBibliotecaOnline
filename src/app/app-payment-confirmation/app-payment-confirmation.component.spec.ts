import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPaymentConfirmationComponent } from './app-payment-confirmation.component';

describe('AppPaymentConfirmationComponent', () => {
  let component: AppPaymentConfirmationComponent;
  let fixture: ComponentFixture<AppPaymentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPaymentConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPaymentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
