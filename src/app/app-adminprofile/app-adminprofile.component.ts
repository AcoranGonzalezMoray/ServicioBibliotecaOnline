import { Component } from '@angular/core';
import { Book } from '../services/interfaces/book';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-app-adminprofile',
  templateUrl: './app-adminprofile.component.html',
  styleUrls: ['./app-adminprofile.component.css']
})
export class AppAdminprofileComponent {
  constructor (public firestoreService: FirestoreService){}
  
  addBook(title: string,
    sinopsis: string,
    author: string,
    publicationDate: string,
    uploadDate: string,
    editorial: string,
    isbn: string,
    genre: string,
    url: string,
    imageURL: string,
    pages:string) {
    const numberisbn = parseInt(isbn)
    const numberpages = parseInt(pages)
    const book: Book = {
      title: title, sinopsis: sinopsis, author: author, publicationDate: publicationDate, uploadDate: uploadDate, 
      editorial: editorial, isbn: numberisbn, reviews: [], comments: [], genre: genre, url: url, read: [], imageURL: imageURL,pages: numberpages
    }
    
    this.firestoreService.createBook(book)

  }
}


