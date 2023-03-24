import { Component, OnInit } from '@angular/core';
import { Book } from '../services/interfaces/book';
import { FirestoreService } from '../services/firestore/firestore.service';



@Component({
  selector: 'app-app-adminprofile',
  templateUrl: './app-adminprofile.component.html',
  styleUrls: ['./app-adminprofile.component.css']
})
export class AppAdminprofileComponent implements OnInit {


  constructor(public firestoreService: FirestoreService) { }
  ngOnInit(): void {

  }
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
    pages: string) {
    const numberisbn = parseInt(isbn)
    const numberpages = parseInt(pages)
    const book: Book = {
      title: title, sinopsis: sinopsis, author: author, publicationDate: publicationDate, uploadDate: uploadDate,
      editorial: editorial, isbn: numberisbn, reviews: [], comments: [], genre: genre, url: url, read: [], imageURL: imageURL, pages: numberpages
    }

    //this.firestoreService.createBook(book)
    this.clearModal()
  }

  clearModal() {
    //(<HTMLInputElement> document.querySelector('title')).value=''
    let n = document.getElementsByTagName('input').length
    let inputs = document.getElementsByTagName('input')

    for (let i = 0; i < n; i++) {
      inputs[i].value = ''
    }

  }

}


