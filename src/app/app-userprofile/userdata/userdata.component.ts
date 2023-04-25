import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { User } from 'src/app/services/interfaces/user';
import { UserToolsService } from 'src/app/services/user-tools.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit, OnChanges {
  @Input() user?: User;
  @Input() username?: string;
  @Input() email?: string;
  @Input() verificado?: boolean;
  @Input() plan?: string;
  dateInit= "10-04-2023"
  dateFinal= "10-05-2023"
  editar = false;


  cpusername?:string
  cpemail?:string

  constructor(private userService: UserToolsService){}

  ngOnInit(): void {
    // console.log(this.user)
    // this.username = this.user?.displayName;
    // this.email = this.user?.email;
    // this.verificado = this.user?.emailVerified;
    // this.plan = this.user?.plan;
  }

  ngOnChanges(changes: SimpleChanges): void{
    // if (changes['user']){
    //   console.log(this.user)
    //   this.username = this.user?.displayName;
    //   this.email = this.user?.email;
    //   this.verificado = this.user?.emailVerified;
    //   this.plan = this.user?.plan;
    // }
  }



  editarInformacion(){
    this.editar = true;
    this.cpusername = this.username;
    this.cpemail = this.email;
  }

  aceptarEdicion(){
    this.editar = false;
    const new_user: User = {
      uid: this.user?.uid,
      email: this.email,
      displayName: this.username,
      plan: this.plan,
      photoURL: this.user?.photoURL,
      emailVerified: this.verificado,
      favoriteBooksList: this.user?.favoriteBooksList,
      followers: this.user?.followers,
      following: this.user?.following,
      readingHistory: this.user?.readingHistory
    }
    this.userService.updateUser(new_user);
  }

  cancelarEdicion(){
    this.username = this.cpusername;
    this.email = this.cpemail;
    this.editar = false;
  }

}
