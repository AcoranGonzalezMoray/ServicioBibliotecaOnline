import { Component , OnInit} from '@angular/core';
import { BookDescriptionService } from '../services/book-description.service';
import { Book } from '../services/interfaces/book';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserToolsService } from '../services/user-tools.service';
import { Router } from '@angular/router';
import { User } from '../services/interfaces/user';

@Component({
  selector: 'app-app-bookdescription',
  templateUrl: './app-bookdescription.component.html',
  styleUrls: ['./app-bookdescription.component.css']
})
export class AppBookdescriptionComponent implements OnInit {

  public book: Book| undefined
  public id:string|undefined
  public urlID:SafeResourceUrl|undefined
  public pageBook:number = 0
  userInformation!: User
  datauser = sessionStorage.getItem('user')
  fav = false
  public pages:number|undefined = 0
  constructor(private userTool: UserToolsService ,private sanitizer: DomSanitizer,private bookDescriptionService:BookDescriptionService, private route:Router){
    
    this.book = bookDescriptionService.getLibro()
    var backup = sessionStorage.getItem('temporalBookDescription')
    this.book?sessionStorage.setItem('temporalBookDescription', JSON.stringify(this.book)):this.book=JSON.parse(backup?backup:'')
  }

  async ngOnInit() {
    this.book = this.bookDescriptionService.getLibro();
    if (this.book && this.book.title) {
      this.book.title = this.book.title.toUpperCase()
    }
    var backup = sessionStorage.getItem('temporalBookDescription')
    this.book?sessionStorage.setItem('temporalBookDescription', JSON.stringify(this.book)):this.book=JSON.parse(backup?backup:'')
    
    if (this.datauser){
      const user = JSON.parse(this.datauser);
      this.userTool.getUser(user.uid).subscribe(async user => {
        this.userInformation = await user.payload.data() as User;
        let favbooks = this.userInformation.favoriteBooksList;
      for(let i = 0 ; i < favbooks!.length ; i++){
        if (favbooks![i] == this.book!.isbn.toString()){
          this.fav = true
        }
      }
      })
      
    }
  }





  leer(){
    const data = sessionStorage.getItem('user')
    if( data &&this.book && this.book.url) {
      
      var uuid = JSON.parse(data)

      this.userTool.getMarker(uuid.uid,this.book.isbn).then((result)=>{
          this.pageBook = result
          this.pages = this.book?.pages
      })
    






      // expresión regular para extraer el ID del archivo en la url
      const pattern = /\/(file\/d\/|open\?id=)([^\/]*)/;

      // extraer el ID del archivo de la URL utilizando la expresión regular
      const match = this.book.url.match(pattern);
      this.id = match ? match[2] : '';
      // this.santier lo utilizamos para decir que la url ES SEGURA si no da error
      //this.urlID se usa como src del ifrmae que esta en el html
      this.urlID = this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.google.com/file/d/'+this.id+'/preview')
      
    }else{
      this.route.navigate(['/SIGNIN'])
    }
  }

  marker(page: string) {
    const user  = sessionStorage.getItem('user')
    var uuid = {uid: ''}
    if(user &&this.book && this.book.url ){
       uuid = JSON.parse(user)
      this.userTool.updateMarker(uuid.uid,page, this.book.isbn)
    }
    
  }

  async favobook(){
    if (this.datauser){
      const user = JSON.parse(this.datauser);
      if (this.fav == true){
        this.userTool.getUser(user.uid).subscribe(async user => {
          this.userInformation = await user.payload.data() as User;
        })
        let favbooks = await this.userInformation.favoriteBooksList;
        for(let i = 0 ; i < favbooks!.length ; i++){
          if (favbooks![i] == this.book!.isbn.toString()){
            favbooks!.splice(i,1);
          }
        }
        this.userTool.updateFavoritesBooks(this.userInformation.uid!, favbooks!);
        this.fav = !this.fav
      } else{
        this.userTool.getUser(user.uid).subscribe(async user => {
          this.userInformation = await user.payload.data() as User;
        })
        let favbooks = await this.userInformation.favoriteBooksList!;
        favbooks!.push(this.book!.isbn.toString());
        this.userTool.updateFavoritesBooks(this.userInformation.uid!, favbooks!);
        this.fav = !this.fav        
      }
    } else {
      alert("Debe Iniciar Sesión para poder hacer uso de esta funcionalidad")
    }
  }
  


  close(){
    this.id= undefined
  }

}
