import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  username = "Alfredo";
  email = "user@example.com";
  plan = "Basico"
  verificado = false;
  editar = false;
  dateInit= "10-04-2023"
  dateFinal= "10-05-2023"

  cpusername = ""
  cpemail=""

  ngOnInit(): void {
      
  }



  editarInformacion(){
    this.editar = true;
    this.cpusername = this.username;
    this.cpemail = this.email;
  }

  aceptarEdicion(){
    this.editar = false;
  }

  cancelarEdicion(){
    this.username = this.cpusername;
    this.email = this.cpemail;
    this.editar = false;
  }

}
