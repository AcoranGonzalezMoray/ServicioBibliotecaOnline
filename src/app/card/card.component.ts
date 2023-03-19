import { Component, Input} from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() Nombre="";
  @Input() Descripcion="";
  @Input() Autor="";
  @Input() IMG="";
  @Input() Votos=0;
  @Input() id="";
  

  constructor() { }
}
