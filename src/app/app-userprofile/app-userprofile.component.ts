import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserToolsService } from '../services/user-tools.service';
import { User } from '../services/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-app-userprofile',
  templateUrl: './app-userprofile.component.html',
  styleUrls: ['./app-userprofile.component.css']
})
export class AppUserprofileComponent implements OnInit, OnDestroy {
  dates: boolean = true;
  userInformation?: User;
  suscribe!: Subscription;

  constructor(private userTools: UserToolsService) {}
  public User:any= sessionStorage.getItem('user');
  public Userdata:any= sessionStorage.getItem('user');

  ngOnInit() {
    this.User =JSON.parse(this.User);
    // this.Userdata = this.User;
    // this.User = this.User.providerData[0];
    this.suscribe = this.userTools.getUser(this.User.uid)
    .subscribe(user => {
       this.userInformation = user.payload.data() as User;
    })
  }

  ngOnDestroy(): void {
      this.suscribe.unsubscribe();
  }

  mostrardatos(state: boolean){
    this.dates = state;
  }

  algo(){
    console.log("AAAAAAAAAAAAAAa")
  }
}
