import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}
  //Crea un nuevo libro
  public createBook(data: {Autor: string, Descripcion: string,IMG: string,Number: string, Votos:number}) {
    return this.firestore.collection('LIBROS').add(data);
  }
  //Obtiene un gato
  public getBook(documentId: string) {
    return this.firestore.collection('LIBROS').doc(documentId).snapshotChanges();
  }
  //Obtiene todos los gatos
  public getBooks() {
    return this.firestore.collection('LIBROS').snapshotChanges();
  }
  //Actualiza un gato
  public updateBook(documentId: string, data: any) {
    return this.firestore.collection('LIBROS').doc(documentId).set(data);
  }
}