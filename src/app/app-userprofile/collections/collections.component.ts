import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/services/interfaces/book';
import { UserToolsService } from 'src/app/services/user-tools.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit{
  @Input() booksfavISBN!: String[];
  booksfav!: Book[];

  constructor(private userTools: UserToolsService){}

  async ngOnInit(){
    await this.cargarlibros();
    console.log(this.booksfav);
  }

   async cargarlibros(){
    for(let ISBN_book in this.booksfavISBN){
      console.log(this.booksfavISBN[ISBN_book])
      // this.userTools.getBookforISBN(Number(ISBN_book)).subscribe(async books => {
      //   books.forEach((element:any) => {
      //     console.log(element.payload.doc.data());
      //   });
      //   //this.booksfav.push(libro);
      //   //console.log(libros);
      // });
      await this.userTools.getBookforISBN(Number(this.booksfavISBN[ISBN_book])).subscribe(async book => {
        book.forEach(async( element:any) => {
          console.log(element.payload.doc.data() as Book );
        });
      })
    }
  }
}
