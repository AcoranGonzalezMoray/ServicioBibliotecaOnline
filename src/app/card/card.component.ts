import { Component, Input, OnInit} from '@angular/core';
import {BookDescriptionService} from '../services/book-description.service'
import {Router} from '@angular/router';
import { Book } from '../services/interfaces/book';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  
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
    pages: 0,
    lan:''
  };

  constructor(public router:Router, public bookDescriptionService:BookDescriptionService) {
  
   }
  ngOnInit(): void {
   this.book.imageURL.includes('usp')?this.book.imageURL = this.embeddingDriveImg(this.book.imageURL.split("/")[5]):null

  }

  embeddingDriveImg(data:string){
    return "https://drive.google.com/uc?export=view&id="+data
  }

  updateDescription(){
    this.bookDescriptionService.updateDescripcion(this.book)
    this.router.navigate(['BOOKDESCRIPTION']);
  }
}
