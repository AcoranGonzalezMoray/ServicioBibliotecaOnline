import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../services/interfaces/book';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-app-adminprofile',
  templateUrl: './app-adminprofile.component.html',
  styleUrls: ['./app-adminprofile.component.css']
})
export class AppAdminprofileComponent implements OnInit {

  booksClicked: boolean;
  public books:any;
  public users:any;

  constructor(public firestoreService: FirestoreService) { 
    this.booksClicked = true;
  }

  ngOnInit(): void {
    this.books = sessionStorage.getItem("books");
    this.books = JSON.parse(this.books);
    console.log(this.books);
    
    //Obtenemos Coleccion Usuarios
    this.firestoreService.getUsers().subscribe((catsSnapshot) => {
      this.users = [];
      catsSnapshot.forEach((catData: any) => {
        this.users.push({
          uid: catData.payload.doc.uid,
          email: catData.payload.doc.data().email,
          displayName: catData.payload.doc.data().displayName,
          photoURL: catData.payload.doc.data().photoURL,
          emailVerified: catData.payload.doc.data().emailVerified,
          plan: catData.payload.doc.data().plan,
          favoriteBooksList: catData.payload.doc.data().favoriteBooksList,
          followers: catData.payload.doc.data().followers,
          following: catData.payload.doc.data().following,
          readingHistory: [],
        });
        sessionStorage.setItem('users',JSON.stringify(this.users))
      })
    });
    console.log(this.users);
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

    this.firestoreService.createBook(book)
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

  changestate(state:boolean){
    this.booksClicked = state;
    console.log(this.booksClicked);
  }

}


