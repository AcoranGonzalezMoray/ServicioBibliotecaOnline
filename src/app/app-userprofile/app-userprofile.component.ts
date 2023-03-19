import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-userprofile',
  templateUrl: './app-userprofile.component.html',
  styleUrls: ['./app-userprofile.component.css']
})
export class AppUserprofileComponent implements OnInit {
  constructor() { }
  public User:any= sessionStorage.getItem('user');
  ngOnInit() {
    this.User =JSON.parse(this.User);
    this.User = this.User.providerData[0];
  }
}
