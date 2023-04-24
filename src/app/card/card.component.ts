import { Component, Input} from '@angular/core';
import {BookDescriptionService} from '../services/book-description.service'
import {Router} from '@angular/router';
import { Book } from '../services/interfaces/book';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  
  @Input() book:Book={
    //id: 0,
    title: '',
    sinopsis: '',
    author: '',
    publicationDate: '',
    uploadDate: '',
    editorial: '',
    isbn: 0,
    reviews: []    ,
    comments: [],
    genre: '',
    url: '',
    read: [],
    imageURL:'',
    pages: 0
  };

  constructor(public router:Router, public bookDescriptionService:BookDescriptionService) { }


  updateDescription(){
    this.bookDescriptionService.updateDescripcion(this.book)
    this.router.navigate(['BOOKDESCRIPTION']);
  }
}
