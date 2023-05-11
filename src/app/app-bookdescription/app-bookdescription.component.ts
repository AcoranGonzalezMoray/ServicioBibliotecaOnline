import { Component, OnInit } from '@angular/core';
import { BookDescriptionService } from '../services/book-description.service';
import { Book } from '../services/interfaces/book';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserToolsService } from '../services/user-tools.service';
import { Router } from '@angular/router';
import { User } from '../services/interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { elementAt } from 'rxjs';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-app-bookdescription',
  templateUrl: './app-bookdescription.component.html',
  styleUrls: ['./app-bookdescription.component.css']
})
export class AppBookdescriptionComponent implements OnInit {

  public book: Book | undefined
  public id: string | undefined
  public urlID: SafeResourceUrl | undefined
  public pageBook: number = 0
  public availableLanguages: string[] = []
  public pages: number | undefined = 0
  userInformation!: User
  datauser = sessionStorage.getItem('user')
  fav = false
  isLoggedIn: boolean = false;
  userReviewForm!: FormGroup;
  newBooks: any[] = [];

  constructor(private userTool: UserToolsService, private sanitizer: DomSanitizer, private bookDescriptionService: BookDescriptionService, private route: Router, private fb: FormBuilder, private firestoreService: FirestoreService) {

    this.book = bookDescriptionService.getLibro()
    var backup = sessionStorage.getItem('temporalBookDescription')
    this.book ? sessionStorage.setItem('temporalBookDescription', JSON.stringify(this.book)) : this.book = JSON.parse(backup ? backup : '')
  }

  async ngOnInit() {

    this.book = this.bookDescriptionService.getLibro();
    if (this.book && this.book.title) {
      this.book.title = this.book.title.toUpperCase()
    }
    var backup = sessionStorage.getItem('temporalBookDescription')
    this.book ? sessionStorage.setItem('temporalBookDescription', JSON.stringify(this.book)) : this.book = JSON.parse(backup ? backup : '')

    this.firestoreService.getBooks().subscribe((catsSnapshot) => {
      catsSnapshot.forEach((catData: any) => {
        this.newBooks.push({

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
          imageURL: catData.payload.doc.data().imageURL,
          pages: catData.payload.doc.data().pages,
          lan: catData.payload.doc.data().lan
        });
      })
    });

    if (this.datauser) {
      this.isLoggedIn = true;
      const user = JSON.parse(this.datauser);
      this.userTool.getUser(user.uid).subscribe(async user => {
        this.userInformation = await user.payload.data() as User;
        let favbooks = this.userInformation.favoriteBooksList;
        for (let i = 0; i < favbooks!.length; i++) {
          if (favbooks![i] == this.book!.isbn.toString()) {
            this.fav = true
          }
        }
      })
    }
    else {
      this.isLoggedIn = false;
    }

    this.userReviewForm = this.fb.group({
      opinion: ['', Validators.required],
    });

    this.onInitBookLanguage()
    window.scrollTo(0, 0);
  }





  leer() {
    const data = sessionStorage.getItem('user')
    if (data && this.book && this.book.url) {

      var uuid = JSON.parse(data)

      this.userTool.getMarker(uuid.uid, this.book.isbn).then((result) => {
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
      this.urlID = this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.google.com/file/d/' + this.id + '/preview')

    } else {
      this.route.navigate(['/SIGNIN'])
    }
  }

  marker(page: string) {
    const user = sessionStorage.getItem('user')
    var uuid = { uid: '' }
    if (user && this.book && this.book.url) {
      uuid = JSON.parse(user)
      this.userTool.updateMarker(uuid.uid, page, this.book.isbn)
    }

  }

  async favobook() {
    if (this.datauser) {
      const user = JSON.parse(this.datauser);
      if (this.fav == true) {
        this.userTool.getUser(user.uid).subscribe(async user => {
          this.userInformation = await user.payload.data() as User;
        })
        let favbooks = await this.userInformation.favoriteBooksList;
        for (let i = 0; i < favbooks!.length; i++) {
          if (favbooks![i] == this.book!.isbn.toString()) {
            favbooks!.splice(i, 1);
          }
        }
        this.userTool.updateFavoritesBooks(this.userInformation.uid!, favbooks!);
        this.fav = !this.fav
      } else {
        this.userTool.getUser(user.uid).subscribe(async user => {
          this.userInformation = await user.payload.data() as User;
        })
        let favbooks = await this.userInformation.favoriteBooksList!;
        favbooks!.push(this.book!.isbn.toString());
        this.userTool.updateFavoritesBooks(this.userInformation.uid!, favbooks!);
        this.fav = !this.fav
      }
    } else {
      this.route.navigate(['/SIGNIN'])
    }
  }



  close() {
    this.id = undefined
  }
  onInitBookLanguage() {
    const books = sessionStorage.getItem('books')
    var booksJson: Book[]
    if (books) {
      booksJson = JSON.parse(books)

      booksJson.forEach((book: Book) => {
        if (book.title.toLocaleLowerCase() == this.book?.title.toLocaleLowerCase() &&
          book.author.toLocaleLowerCase() == this.book.author.toLocaleLowerCase()) {
          this.availableLanguages.push(book.lan)
        }
      });

    }
  }



  bookLanguage(lan: string, isReading: boolean) {
    const books = sessionStorage.getItem('books')
    var booksJson: Book[]
    if (books) {
      booksJson = JSON.parse(books)

      booksJson.forEach((book: Book) => {
        if (book.title.toLocaleLowerCase() == this.book?.title.toLocaleLowerCase() &&
          book.author.toLocaleLowerCase() == this.book.author.toLocaleLowerCase() && book.lan == lan) {
          this.book = book
        }
      });

    }
    const input: HTMLInputElement | null = document.querySelector('#page')
    console.log(input)
    if (input) {
      input.value = ''
    }


    isReading ? this.leer() : null
  }

  showLoggingMessage() {
    !this.isLoggedIn?this.route.navigate(['/SIGNIN']):null
      
    
  }

  onSubmitReview() {
    const review = {
      username: this.userInformation.displayName,
      opinion: this.userReviewForm.controls['opinion'].value
    };

    const copyBook = Object.assign({}, this.book);
    
    this.newBooks.filter((book: any) => {
      if (book.isbn === copyBook?.isbn) {
        copyBook?.reviews.push(review);
        copyBook!.imageURL = book.imageURL;
        this.firestoreService.updateBook(book.id, copyBook!);
        this.book!.reviews!= copyBook?.reviews
        sessionStorage.setItem('temporalBookDescription', JSON.stringify(this.book));
      }
    });

    alert('Comentario enviado con éxito');
    this.userReviewForm.reset();
  }
}