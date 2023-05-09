import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Audiobook } from '../services/interfaces/audiobook';
import { Observable, map } from 'rxjs';

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
  element!: HTMLElement




  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  chapter: number = 0
  play = true
  img!: AudioItem;



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
          this.chapter = parseInt(nameSimple.split('_')[1])
          return audioItem;
        });
      })
    );
    this.audioItems$.subscribe((items: AudioItem[]) => {
      this.audioItems = items;
      this.audioItemsNoComplete =  items.filter(item => !item.name.endsWith('.jpg'));
      this.img =  items.filter(item => item.name.endsWith('.jpg'))[0];
      this.getImg(this.img.fullPath)
      
    });
  }


  getImg(fullPath: string){
    const audioRef = this.storage.ref(fullPath);
    audioRef.getDownloadURL().subscribe(url => {
      this.img = url
    });
  }

  playAudio(filePath: string) {
    this.chapter = parseInt(filePath.split('/')[1].split('_')[1])
    const audioRef = this.storage.ref(filePath);
    audioRef.getDownloadURL().subscribe(url => {
      this.audioURL = url;
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.play();
      this.play = true
    });

    this.changeColor(filePath)
  }

  playStopAudioControl(){
    if (this.audioPlayer.nativeElement.paused) {
      this.audioPlayer.nativeElement.play();
      this.play = true
    }
    else{
      this.audioPlayer.nativeElement.pause();
      this.play = false
    } 
  }


  changeChapter(direccion: number) {
    var minimo = parseInt(this.audioItemsNoComplete[0].name.split('_')[1])
    console.log(minimo, this.chapter, this.audioItemsNoComplete.length)
    if((this.chapter+direccion) >= minimo && (this.chapter+direccion)<=this.audioItemsNoComplete.length){
      this.chapter = this.chapter+direccion
      var audio:AudioItem = this.audioItemsNoComplete[this.chapter-1]
      this.playAudio(audio.fullPath)  
    }
  }

  changeColor(id:string){
    if(this.element) this.element.style.display = "none"
    this.element = document.getElementById(id)!
    this.element.style.display = "block"
  }

  viewChapters(id:string){
    var chapter = document.getElementById(id)!
    var element = document.getElementById(id+"Des")!
    if(chapter .style.display !="block"){
      chapter.style.display="block"
      element.style.maxWidth="250px"
      element.style.fontSize="14px"
    }else{
      chapter .style.display="none"
      element.style.maxWidth="500px"
      element.style.fontSize="20px"
    }
  }
  
}
