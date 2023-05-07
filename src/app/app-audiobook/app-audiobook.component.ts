import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Audiobook } from '../services/interfaces/audiobook';

@Component({
  selector: 'app-app-audiobook',
  templateUrl: './app-audiobook.component.html',
  styleUrls: ['./app-audiobook.component.css']
})


export class AppAudiobookComponent implements OnInit {


  audiolibros: Audiobook[]  = []

  constructor(public firestoreService: FirestoreService) {
  }

  ngOnInit() {
    this.firestoreService.getAudioBooks().subscribe((catsSnapshot) => {
      catsSnapshot.forEach((catData: any) => {
        var p: Audiobook = catData.payload.doc.data()
        console.log(catData.payload.doc.data())
        this.audiolibros.push(p)
      })
    })
  }








}
