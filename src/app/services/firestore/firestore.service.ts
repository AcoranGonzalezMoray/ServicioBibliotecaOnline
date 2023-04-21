import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}
  //Crea un nuevo libro
  public createBook(book: Book) {
    return this.firestore.collection('LIBROS').add(book);
  }
  //Obtiene un libro
  public getBook(documentId: string) {
    return this.firestore.collection('LIBROS').doc(documentId).snapshotChanges();
  }
  //Elimina un libro
  public deleteBook(documentId: string) {
    return this.firestore.collection('LIBROS').doc(documentId).delete();
  }
  //Obtiene todos los libros
  public getBooks() {
    return this.firestore.collection('LIBROS').snapshotChanges();
  }
  //Actualiza un libro
  public updateBook(documentId: string, book: Book) {
    return this.firestore.collection('LIBROS').doc(documentId).set(book);
  }


    //Obtiene todos los usuarios
    public getUsers() {
      return this.firestore.collection('USUARIOS').snapshotChanges();
    }
  
}