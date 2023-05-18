import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  public email;
  public userName;

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private authService: AuthService) {
    this.email = activatedRoute.snapshot.params['email'];
    this.userName = activatedRoute.snapshot.params['displayName']
  }

  pasar_a_pagar(plan: number){
    console.log("Empieza Update Plan")
    this.authService.UpdatePlan("Loading", this.email);
    if (plan == 1) {
      location.href = this.BasicURL + "?prefilled_email=" + this.email;
    } else if (plan == 2) {
      location.href = this.StandarURL + "?prefilled_email=" + this.email;
    } else if (plan == 3) {
      location.href = this.IlimitedURL + "?prefilled_email=" + this.email;
    }
  }

  pasar_a_registro(plan: number){
    if (plan == 1) {
      this.route.navigate(['/SIGNUP',this.PLANB, this.BasicURL])
    } else if (plan == 2) {
      this.route.navigate(['/SIGNUP',this.PLANS, this.StandarURL])
    } else if (plan == 3) {
      this.route.navigate(['/SIGNUP',this.PLANI, this.IlimitedURL])
    }
  }
  
}
