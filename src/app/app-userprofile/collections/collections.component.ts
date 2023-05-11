import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/services/interfaces/book';
import { UserToolsService } from 'src/app/services/user-tools.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  @Input() booksfavISBN!: String[];
  @Input() bookspengISBN!: String[];
  @Input() booksreadISBN!: String[];
  @Input() booksfinISBN!: String[];
  booksfav: Book[] = [];
  bookspeng: Book[] = [];
  booksread: Book[] = [];
  booksfin: Book[] = [];
  aparece = false;

  constructor(private userTools: UserToolsService) { }

  async ngOnInit() {
    await this.cargarlibros();
  }

  async cargarlibros() {
    for (let ISBN_book in this.booksfavISBN) {
      await this.userTools.getBookforISBN(Number(this.booksfavISBN[ISBN_book])).subscribe(async book => {
        book.forEach(async (element: any) => {
          this.booksfav.push(element.payload.doc.data() as Book)
        });
        await this.eliminaDuplicados(); // Llamamos al método aquí, dentro del bloque subscribe
      });
    }
    for (let ISBN_book in this.bookspengISBN) {
      await this.userTools.getBookforISBN(Number(this.bookspengISBN[ISBN_book])).subscribe(async book => {
        book.forEach(async (element: any) => {
          this.bookspeng.push(element.payload.doc.data() as Book)
        });
        //await this.eliminaDuplicados(); // Llamamos al método aquí, dentro del bloque subscribe
      });
    }

    for (let ISBN_book in this.booksreadISBN) {
      await this.userTools.getBookforISBN(Number(this.booksreadISBN[ISBN_book])).subscribe(async book => {
        book.forEach(async (element: any) => {
          this.booksread.push(element.payload.doc.data() as Book)
        });
        //await this.eliminaDuplicados(); // Llamamos al método aquí, dentro del bloque subscribe
      });
    }

    for (let ISBN_book in this.booksfinISBN) {
      await this.userTools.getBookforISBN(Number(this.booksfinISBN[ISBN_book])).subscribe(async book => {
        book.forEach(async (element: any) => {
          this.booksfin.push(element.payload.doc.data() as Book)
        });
        //await this.eliminaDuplicados(); // Llamamos al método aquí, dentro del bloque subscribe
      });
    }

    this.aparece = true;
  }

  async eliminaDuplicados() {
    //console.log(this.booksfav)
    let arraySinDuplicados: Book[] = [];
    this.booksfav.forEach((objeto) => {
      if (!arraySinDuplicados.some((item) => item.isbn === objeto.isbn)) {
        //console.log(objeto.isbn)
        arraySinDuplicados.push(objeto);
      }
    });
    this.booksfav = arraySinDuplicados;
    //console.log(this.booksfav)
  }
}
