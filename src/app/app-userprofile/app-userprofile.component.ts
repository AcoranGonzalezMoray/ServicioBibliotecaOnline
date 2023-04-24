import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-userprofile',
  templateUrl: './app-userprofile.component.html',
  styleUrls: ['./app-userprofile.component.css']
})
export class AppUserprofileComponent implements OnInit {
  dates: boolean = true;

  constructor() { }
  public User:any= sessionStorage.getItem('user');
  public Userdata:any= sessionStorage.getItem('user');

  ngOnInit() {
    this.User =JSON.parse(this.User);
    this.Userdata = this.User;
    this.User = this.User.providerData[0];
    console.log(this.Userdata.uid)
  }

  mostrardatos(state: boolean){
    this.dates = state;
  }

  algo(){
    console.log("AAAAAAAAAAAAAAa")
  }
}
