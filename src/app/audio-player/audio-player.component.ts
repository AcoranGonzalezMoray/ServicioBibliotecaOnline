import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Audiobook } from '../services/interfaces/audiobook';
import { ListResult } from '@angular/fire/compat/storage/interfaces';
import { Observable, map } from 'rxjs';
import { from } from 'rxjs';

interface AudioItem {
  name: string;
  nameSimple:string
  fullPath: string;
  downloadURL?: string;
}


@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})


export class AudioPlayerComponent implements OnInit {
  @Input() audioBook!: Audiobook 

  audioItems$!: Observable<AudioItem[]>;
  audioItems: AudioItem[] = [];
  audioItemsNoComplete: AudioItem[] = [];
  audioURL!: string;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  
  constructor(public storage: AngularFireStorage){}
  ngOnInit() {
    const storageRef = this.storage.ref(this.audioBook.container);


    this.audioItems$ = storageRef.listAll().pipe(
      map((result: { items: { name: any; fullPath: any; }[]; }) => {
        return result.items.map((item: { name: any; fullPath: any; }) => {
          var nameSimple:string = item.name
          const audioItem: AudioItem = {
            name: item.name,
            nameSimple: nameSimple.split('_')[0]+nameSimple.split('_')[1],
            fullPath: item.fullPath
          };
          return audioItem;
        });
      })
    );
    this.audioItems$.subscribe((items: AudioItem[]) => {
      this.audioItems = items;
      this.audioItemsNoComplete =  items.filter(item => !item.name.endsWith('.jpg'));
    });
  }

  playAudio(filePath: string) {
    const audioRef = this.storage.ref(filePath);
    audioRef.getDownloadURL().subscribe(url => {
      this.audioURL = url;
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.play();
    });
  }
}
