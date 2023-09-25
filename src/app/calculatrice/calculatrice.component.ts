import { Component } from '@angular/core';
import { fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.css']
})
export class CalculatriceComponent {
  calcul: string[];
  resultat: string;
  affichageCalcul: string;

  constructor() {
    this.calcul = [];
    this.resultat = "";
    this.affichageCalcul = "";
  }

  push(input: string): void {
    const regexNombre = /[0-9]+/;
    //si l'array calcul est vide et que l'input est un chiffre on l'ajoute à l'array.
    if (this.calcul.length == 0 && regexNombre.test(input)) {
      this.calcul.push(input);
    } else {
      let last = this.calcul.pop() as string;
      //si le dernier element de calcul est un nombre et que l'input est un chiffre on les concatene.
      if (regexNombre.test(last) && regexNombre.test(input)) {
        last += input;
        this.calcul.push(last);
      }
      //si le dernier element de calcul est une opération et que l'input est aussi une opération 
      //on remplace l'ancienne operation;
      else if (!regexNombre.test(last) && !regexNombre.test(input)) {
        this.calcul.push(input);
      }//si le dernier element de calcul est un nombre et que l'input est une opération
      //ou si c'est l'inverse on push les éléments dans l'ordre.
      else {
        this.calcul.push(last);
        this.calcul.push(input);
      }
    }
    this.formatterCalcul();
  }

  calculer(): void {
    let calculTemp: string[] = this.calculPrioritaire();
    this.resultat = calculTemp.join(" ");
    //this.calculSecondaire(calculTemp);
  }

  calculPrioritaire(): string[] {
    const work: string[] = [];
    const temp: string[] = this.calcul.slice();
    let opPrim = undefined;
    if (this.checkCalcul()) {
      for (let i = 1; i < temp.length; i += 2) {
        if (/[*/]/i.test(temp[i]) && !opPrim) {
          let left = Number.parseFloat(temp[i - 1]);
          let right = Number.parseFloat(temp[i + 1]);
          let value = 0;
          if (temp[i] == '*') {
            value = left * right;
          }else{
            value = left / right;
          }
          work.push(value.toString());
          opPrim = true;
        }else if (/[*/]/i.test(temp[i]) && opPrim) {
          let left = Number.parseFloat(work.pop() as string);
          let right = Number(temp[i+1]);
          let value = 0;
          if(temp[i] === "*"){
            value = left * right;
          }else{
            value = left / right;
          }
          work.push(value.toString());
          opPrim = true;
        }else {
          work.push(temp[i-1]);
          work.push(temp[i]);
          //work.push(temp[i+1]);
        }
      }
    }
    return work;
  }

  formatterCalcul() {
    this.affichageCalcul = this.calcul.join(" ");
  }
  formatterResultat() {

  }

  checkCalcul(): boolean {
    const n = Math.floor(this.calcul.length / 2);
    if (this.calcul.length == n * 2 + 1) {
      return true;
    } else {
      return false;
    }
  }
}
