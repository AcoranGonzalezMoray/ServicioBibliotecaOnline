import { Component, Input } from '@angular/core';
import { BookDescriptionService } from '../services/book-description.service';
import { Book } from '../services/interfaces/book';
@Component({
  selector: 'app-app-bookdescription',
  templateUrl: './app-bookdescription.component.html',
  styleUrls: ['./app-bookdescription.component.css']
})
export class AppBookdescriptionComponent {

  public book: Book| undefined
  constructor(bookDescriptionService:BookDescriptionService){
    this.book = bookDescriptionService.getLibro()
  }




}
