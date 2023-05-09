import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { AuthService } from '../services/auth.service';

interface Genre {
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
  
  filter = false

  yrs: Genre[] = [
    {value: 'steak-0', viewValue: '1990'},
    {value: 'steak-0', viewValue: '1991'},
    {value: 'steak-0', viewValue: '1992'},
    {value: 'steak-0', viewValue: '1993'},
    {value: 'steak-0', viewValue: '1994'},
    {value: 'steak-0', viewValue: '1995'},
    {value: 'steak-0', viewValue: '1996'},
    {value: 'steak-0', viewValue: '1997'},
    {value: 'steak-0', viewValue: '1998'},
    {value: 'steak-0', viewValue: '1999'},
  ];
  gnr: Genre[] = [
    {value: 'steak-0', viewValue: 'Infantil'},
    {value: 'pizza-1', viewValue: 'DE 12 AÑOS EN ADELANTE'},
    {value: 'tacos-2', viewValue: 'Clásicos Universales'},
    {value: 'steak-0', viewValue: 'Cuento'},
    {value: 'pizza-1', viewValue: 'Poesía y Teatro'},
    {value: 'tacos-2', viewValue: 'Diarios'},
  ];
  constructor(
    private firestoreService: FirestoreService,
    public authService: AuthService
  ) {}

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

}
