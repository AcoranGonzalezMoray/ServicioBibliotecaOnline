import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-app-inicio',
  templateUrl: './app-inicio.component.html',
  styleUrls: ['./app-inicio.component.css']
})
export class AppInicioComponent implements OnInit{
  public books:any[] = [];
  public categories:any[] = [];
  constructor(
    private firestoreService: FirestoreService,
    public authService: AuthService
  ) {}
  ngOnInit() {
    //this.firestoreService.createCat({Autor: "ROBERTO ARLT", Descripcion: "Conjunto de escritos que describe la mutación de la ciudad de Buenos Aires, interpretando su pulso cotidiano, de modo crítico, nada concesivo, y haciendo del humor el estilo desenfadado de abordar esa compleja trama de personajes urbanos que desfilan en la vida porteña: tan lejos de cualquier moralismo abstracto como de toda pretensión estetizante y sacralizadora del mundo popular.",IMG: "https://covers.alibrate.com/b/59872e85cba2bce50c19b25b/29ea8e7b-0cff-4b81-8d6b-677faca87094/medium",Nombre: "AGUAFUERTES PORTEÑAS", Votos:65})
    this.categories = [["Más Leídos","A"],["Más Votados","B"],["Más Comentados","C"],["Más Recientes","D"]]
    //Obtenemos Coleccion Libros
    this.firestoreService.getBooks().subscribe((catsSnapshot) => {
      this.books = [];
      catsSnapshot.forEach((catData: any) => {
        //console.log(catData.payload.doc.data())
        this.books.push({
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
