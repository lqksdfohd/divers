import { Component, OnInit } from '@angular/core';
import { Observer, fromEvent } from 'rxjs';
import { ServiceCalcul } from '../services/ServiceCalcul';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.css']
})
export class CalculatriceComponent implements OnInit {
  resultat: string;
  affichageCalcul: string; 

  constructor(private serviceCalcul:ServiceCalcul) {
    this.resultat = "";
    this.affichageCalcul = "";
  }

  ngOnInit(): void {

    const oberver: Observer<Event> = {
      next: event => {
        const kbe = event as KeyboardEvent;
        if (/[0-9.*+/-]/.test(kbe.key)) {
          this.push(kbe.key);
        } else if (/Enter/.test(kbe.key)) {
          this.calculer();
        } else if(/Backspace/.test(kbe.key)){
          this.supprimerUnTerme();
        }
      },
      error: error => {console.log(error)},
      complete: () => {}
    }

    const observable = fromEvent(document, 'keyup');
    observable.subscribe(oberver);
  }


  /**
   * ajoute une opération ou un chiffre au calcul
   * @param input une opération ou un chiffre
   */
  push(input: string): void {
    this.serviceCalcul.push(input);
    this.formatterCalcul();
  }

  calculer(): void {
    this.serviceCalcul.calculer();
    this.resultat = this.serviceCalcul.getResultatCalcul().toString();
  }

  /**
   * prettify le calcul pour l'affichage.
   */
  formatterCalcul() {
    this.affichageCalcul = this.serviceCalcul.getFormule().join(" ");
  }

  /**
   * efface le calcul en cours.
   */
  clearCalcul() {
    this.serviceCalcul.clearCalcul();
    this.affichageCalcul = "";
  }

  /** supprimer un chiffre ou une opération de la formule */
  supprimerUnTerme(){
    this.serviceCalcul.supprimerTerme();
    this.formatterCalcul();
  }
}
