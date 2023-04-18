import { Component} from '@angular/core';
import { BookDescriptionService } from '../services/book-description.service';
import { Book } from '../services/interfaces/book';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-app-bookdescription',
  templateUrl: './app-bookdescription.component.html',
  styleUrls: ['./app-bookdescription.component.css']
})
export class AppBookdescriptionComponent {

  public book: Book| undefined
  public id:string|undefined
  public urlID:SafeResourceUrl|undefined
  constructor(private sanitizer: DomSanitizer,bookDescriptionService:BookDescriptionService){
    this.book = bookDescriptionService.getLibro()
  }

  leer(){
    if( sessionStorage.getItem('user') &&this.book && this.book.url) {
      // expresión regular para extraer el ID del archivo en la url
      const pattern = /\/(file\/d\/|open\?id=)([^\/]*)/;

      // extraer el ID del archivo de la URL utilizando la expresión regular
      const match = this.book.url.match(pattern);
      this.id = match ? match[2] : '';
      // this.santier lo utilizamos para decir que la url ES SEGURA si no da error
      //this.urlID se usa como src del ifrmae que esta en el html
      this.urlID = this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.google.com/file/d/'+this.id+'/preview')
      
    }
  }

  close(){
    this.id= undefined
  }

}
