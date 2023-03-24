import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-open',
  templateUrl: './carousel-open.component.html',
  styleUrls: ['./carousel-open.component.css']
})
export class CarouselOpenComponent implements OnInit {
  public books:any;
  constructor(){}
  ngOnInit(): void {
    this.books = sessionStorage.getItem("books");
    this.books = JSON.parse(this.books)
  }
  
}
