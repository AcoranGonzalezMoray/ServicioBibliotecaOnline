import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-app-singup',
  templateUrl: './app-singup.component.html',
  styleUrls: ['./app-singup.component.css']
})
export class AppSingupComponent {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
}
