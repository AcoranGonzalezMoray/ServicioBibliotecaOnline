import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Audiobook } from '../services/interfaces/audiobook';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
@Component({
  selector: 'app-app-audiobook',
  templateUrl: './app-audiobook.component.html',
  styleUrls: ['./app-audiobook.component.css']
})


export class AppAudiobookComponent implements OnInit {


  audiolibros: Audiobook[]  = []
  activeElement: Audiobook[]  = []

  constructor(public firestoreService: FirestoreService) {
  }

  
  @ViewChild(AudioPlayerComponent)hijo!: AudioPlayerComponent;
  miEvento = new EventEmitter();

  emitirEvento() {
    this.miEvento.emit();
  }


  
  ngOnInit() {
    this.firestoreService.getAudioBooks().subscribe((catsSnapshot) => {
      catsSnapshot.forEach((catData: any) => {
        var p: Audiobook = catData.payload.doc.data()
        this.audiolibros.push(p)
      })
      
    this.activeElement.push(this.audiolibros[0])
    this.audiolibros = this.audiolibros.slice(1);
    })
    
  
  
  }








}
