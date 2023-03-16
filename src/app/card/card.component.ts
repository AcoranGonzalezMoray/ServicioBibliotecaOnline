import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public cats:any[] = [];
  constructor(
    private firestoreService: FirestoreService,
  ) { }
  ngOnInit() {
    //this.firestoreService.createCat({Autor: "ROBERTO ARLT", Descripcion: "Conjunto de escritos que describe la mutación de la ciudad de Buenos Aires, interpretando su pulso cotidiano, de modo crítico, nada concesivo, y haciendo del humor el estilo desenfadado de abordar esa compleja trama de personajes urbanos que desfilan en la vida porteña: tan lejos de cualquier moralismo abstracto como de toda pretensión estetizante y sacralizadora del mundo popular.",IMG: "https://covers.alibrate.com/b/59872e85cba2bce50c19b25b/29ea8e7b-0cff-4b81-8d6b-677faca87094/medium",Nombre: "AGUAFUERTES PORTEÑAS", Votos:65})
    this.firestoreService.getBooks().subscribe((catsSnapshot) => {
      this.cats = [];
      catsSnapshot.forEach((catData: any) => {
        console.log(catData.payload.doc.data())
        this.cats.push({
          id: catData.payload.doc.id,
          Nombre:catData.payload.doc.data().Number,
          Descripcion:catData.payload.doc.data().Descripcion,
          Autor:catData.payload.doc.data().Autor,
          IMG:catData.payload.doc.data().IMG,

        });
      })
    });
  }
}
