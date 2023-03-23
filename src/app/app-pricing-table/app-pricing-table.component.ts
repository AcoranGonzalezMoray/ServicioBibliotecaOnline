import { Component } from '@angular/core';

@Component({
  selector: 'app-app-pricing-table',
  templateUrl: './app-pricing-table.component.html',
  styleUrls: ['./app-pricing-table.component.css']
})
export class AppPricingTableComponent {
  public PLANB = "Plan Básico";
  public BasicURL = "https://buy.stripe.com/test_8wM9Cab7y9Xt7FmaEF"

  public PLANS = "Plan Estándar";
  public StandarURL = "https://buy.stripe.com/test_5kA15EdfG3z5e3K7su"

  public PLANI = "Plan Ilimitado";
  public IlimitedURL = "https://buy.stripe.com/test_5kAaGe1wY2v13p6003"
  
}
