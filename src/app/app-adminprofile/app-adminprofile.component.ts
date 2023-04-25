import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../services/interfaces/book';
import { User } from '../services/interfaces/user';
import {Router} from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';
import {BookDescriptionService} from '../services/book-description.service'

@Component({
  selector: 'app-app-adminprofile',
  templateUrl: './app-adminprofile.component.html',
  styleUrls: ['./app-adminprofile.component.css']
})
export class AppAdminprofileComponent implements OnInit {

  booksClicked: boolean;
  public books: any;
  public users: any;
  selectedBooks: Array<any> = [];
  public currentBook: any;


  constructor(public firestoreService: FirestoreService, public bookDescriptionService:BookDescriptionService, public router:Router) {
    this.booksClicked = true;
    this.currentBook = "";
  }

  ngOnInit(): void {
    this.books = sessionStorage.getItem("books");
    this.books = JSON.parse(this.books);
    //Obtenemos Coleccion Libros
    this.firestoreService.getBooks().subscribe((catsSnapshot) => {
      this.books = [];
      catsSnapshot.forEach((catData: any) => {
        this.books.push({

          id: catData.payload.doc.id,
          title: catData.payload.doc.data().title,
          sinopsis: catData.payload.doc.data().sinopsis,
          author: catData.payload.doc.data().author,
          publicationDate: catData.payload.doc.data().publicationDate,
          uploadDate: catData.payload.doc.data().uploadDate,
          editorial: catData.payload.doc.data().editorial,
          isbn: catData.payload.doc.data().isbn,
          reviews: catData.payload.doc.data().reviews,
          comments: catData.payload.doc.data().comments,
          genre: catData.payload.doc.data().genre,
          url: catData.payload.doc.data().url,
          read: catData.payload.doc.data().read,
          imageURL: this.embeddingDriveImg(catData.payload.doc.data().imageURL.split("/")[5]),
          pages: catData.payload.doc.data().pages
        });
        sessionStorage.setItem('books', JSON.stringify(this.books))
      })
    });
    console.log(this.books);


    //Obtenemos Coleccion Usuarios
    this.firestoreService.getUsers().subscribe((catsSnapshot) => {
      this.users = [];
      catsSnapshot.forEach((catData: any) => {
        this.users.push({
          id: catData.payload.doc.id,
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
        sessionStorage.setItem('users', JSON.stringify(this.users))
      })
    });
    this.users = sessionStorage.getItem("users");
    this.users = JSON.parse(this.users);
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

  addUser(uid: string,
    email: string,
    displayName: string,
    photoURL: string,
    plan: string) {
    const user: User = {
      uid: uid,
      email: email,
      displayName: displayName,
      photoURL: photoURL,
      emailVerified: true,
      plan: plan,
      favoriteBooksList: [],
      followers: [],
      following: [],
      readingHistory: [],
    }

    this.firestoreService.createUser(user);
    this.clearModal();
  }

  embeddingDriveImg(data: string) {
    return "https://drive.google.com/uc?export=view&id=" + data
  }

  clearModal() {
    //(<HTMLInputElement> document.querySelector('title')).value=''
    let n = document.getElementsByTagName('input').length
    let inputs = document.getElementsByTagName('input')

    for (let i = 0; i < n; i++) {
      inputs[i].value = ''
    }

  }

  changestate(state: boolean) {
    this.booksClicked = state;
    console.log(this.booksClicked);
  }

  getSelectedBooks() {
    for (let book of this.books) {
      let checkbox = document.getElementById(`checkbox_${book.id}`) as HTMLInputElement;
      if (checkbox.checked) {
        this.selectedBooks.push({
          book
        })
      }
    }
  }

  deleteSelectedBooks() {
    for (let book of this.books) {
      let checkbox = document.getElementById(`checkbox_${book.id}`) as HTMLInputElement;
      if (checkbox.checked) {
        this.firestoreService.deleteBook(book.id)
      }
    }
  }

  deleteSelectedUsers() {
    for (let user of this.users) {
      let checkbox = document.getElementById(`checkbox_${user.id}`) as HTMLInputElement;
      if (checkbox.checked) {
        this.firestoreService.deleteUser(user.id)
      }
    }
  }

  viewBook(id:Book) {
    this.bookDescriptionService.updateDescripcion(id)
    this.router.navigate(['BOOKDESCRIPTION']);
  
  }

  getCurrentBook(a:Book){
    this.currentBook = a;
  }

}


