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
  aparece = false;

  constructor(private userTools: UserToolsService){}

  async ngOnInit(){
    this.booksfav  = await this.cargarlibros();
    console.log(this.booksfav);
  }

  async cargarlibros():Promise<Book[]>{
    var booksfav: Book[] = [];
    for(let ISBN_book in this.booksfavISBN){
      await this.userTools.getBookforISBN(Number(this.booksfavISBN[ISBN_book])).subscribe(async book => {
        book.forEach(async( element:any) => {
          booksfav.push(element.payload.doc.data() as Book)
        });
      })
    }
    console.log(booksfav)
    this.aparece = true;
    return booksfav
  }
}
