import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { AuthService } from '../services/auth.service';
import { Book } from '../services/interfaces/book';
import { NgForm } from '@angular/forms';
// import Swiper core and required modules
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-app-inicio',
  templateUrl: './app-inicio.component.html',
  styleUrls: ['./app-inicio.component.css']
})



export class AppInicioComponent implements OnInit{
  public books:any[] = [];
  public categories:any[] = [];
  public searchResults: Book[] = [];
  public searchEnabled: boolean = false;
  public genreResults: Book[] = [];
  public genreEnabled: boolean = false;
  public yearResults: Book[] = [];
  public yearEnabled: boolean = false;
  public selectedGenre!: string;
  public selectedYear!: string;

  filter = false

  years: Option[] = [];



  
  gnr: Option[] = [
    {value: 'Infantil', viewValue: 'Infantil'},
    {value: 'Misterio', viewValue: 'Misterio'},
    {value: 'DE 12 AÑOS EN ADELANTE', viewValue: 'DE 12 AÑOS EN ADELANTE'},
    {value: 'Clásicos Universales', viewValue: 'Clásicos Universales'},
    {value: 'Cuento', viewValue: 'Cuento'},
    {value: 'Poesía y Teatro', viewValue: 'Poesía y Teatro'},
    {value: 'Diarios', viewValue: 'Diarios'},
  ];
  constructor(
    private firestoreService: FirestoreService,
    public authService: AuthService
  ) {

    for (let year = 1980; year <= 2020; year++) {
      const option: Option = {value: year.toString(), viewValue: year.toString()};
      this.years.push(option);
    }

  }

  shuffleArray(array: any[]) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  embeddingDriveImg(data:string){
    return "https://drive.google.com/uc?export=view&id="+data
  }

  ngOnInit() {
    
    //Obtenemos Coleccion Libros
    this.firestoreService.getBooks().subscribe((catsSnapshot) => {
      this.books = [];
      catsSnapshot.forEach((catData: any) => {
        this.books.push({
      
          //id: catData.payload.doc.id,
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
          imageURL:this.embeddingDriveImg(catData.payload.doc.data().imageURL.split("/")[5]),
          pages: catData.payload.doc.data().pages,
          lan: catData.payload.doc.data().lan,
        });
        sessionStorage.setItem('books',JSON.stringify(this.books))
      })
      // Mezcla la matriz de libros aleatoriamente una vez
      this.categories = [["MásLeídos","A", this.shuffleArray(this.shuffleArray(this.books))],
      ["MásVotados","B",  this.shuffleArray(this.shuffleArray(this.books))],
      ["MásComentados","C", this.shuffleArray(this.shuffleArray(this.books))],
      ["MásRecientes","D", this.shuffleArray(this.shuffleArray(this.books))]]

    });
    window.scrollTo(0, 0);
  }


  search(form: NgForm, searchTerm: string){
    this.searchResults = this.books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
    this.searchEnabled = true;

    this.genreEnabled = false;
    this.yearEnabled = false;
  }

  category(form: NgForm, genre: string){
    this.genreResults = this.books.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
    this.genreEnabled = true;

    this.searchEnabled = false;
    this.yearEnabled = false;
  }

  year(form: NgForm, year: string){
    this.yearResults = this.books.filter(book => book.publicationDate === year);
    this.yearEnabled = true;

    this.searchEnabled = false;
    this.genreEnabled = false;

  }






  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
