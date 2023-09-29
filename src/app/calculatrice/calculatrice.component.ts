import { Component, OnInit } from '@angular/core';
import { Observer, fromEvent } from 'rxjs';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.css']
})
export class CalculatriceComponent implements OnInit {
  calcul: string[];
  resultat: string;
  affichageCalcul: string;

  constructor() {
    this.calcul = [];
    this.resultat = "";
    this.affichageCalcul = "";
  }

  ngOnInit(): void {

    const oberver: Observer<Event> = {
      next: event => {
        const kbe = event as KeyboardEvent;
        if (/[0-9*+/-]/.test(kbe.key)) {
          this.push(kbe.key);
        } else if (/Enter/.test(kbe.key)) {
          this.calculer();
        }
      },
      error: error => {console.log(error)},
      complete: () => {}
    }

    const observable = fromEvent(document, 'keyup');
    observable.subscribe(oberver);
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
    this.resultat = this.calculNonPrioritaire(calculTemp).toString();
  }

  /**
   * éffectue les calculs prioritaire et retourne une liste de calculs non prioritaires.
   * les calculs prioritaires sont la multiplication et la division.
   * @returns une liste de calculs non prioritaires.
   */
  calculPrioritaire(): string[] {
    const work: string[] = [];
    const temp: string[] = this.calcul.slice();
    if (this.checkCalculCorrecte()) {
      for (let i = 1; i < temp.length; i += 2) {
        switch (temp[i]) {
          case "*": {
            work.push(this.calculPrioritaireMultiplication(work, temp, i).toString());
            break;
          };
          case "/":
            work.push(this.calculPrioritaireDivision(work, temp, i).toString());
            break;
          default:
            this.pushCalculNonPrioritaire(work, temp, i);
            break;
        }
      }
    }
    return work;
  }

  /**
   * éffectue les calculs non prioritaires, addition et soustraction.
   * @returns le resultat du calcul.
   */
  calculNonPrioritaire(calculInput:string[]):number{
    let right = Number.parseFloat(calculInput.pop() as string);
    while(calculInput.length > 0){
      let op = calculInput.pop();
      let left = Number.parseFloat(calculInput.pop() as string);
      switch(op){
        case "+":
          right = left + right;
          break;
        case "-":
          right = left - right;
          break;
        default:
          console.error("erreur ds le calcul");          
      }
    };
    return right;
  }

  calculPrioritaireMultiplication(work: string[], temp: string[], i: number): number {
    let fTerme = work.pop();
    let value = 0;
    if (fTerme) {
      value = Number.parseFloat(fTerme) * Number.parseFloat(temp[i + 1]);
    } else {
      value = Number.parseFloat(temp[i - 1]) * Number.parseFloat(temp[i + 1]);
    }
    return value;
  }

  calculPrioritaireDivision(work: string[], temp: string[], i: number): number {
    let fTerme = work.pop();
    let value = 0;
    if (fTerme) {
      value = Number.parseFloat(fTerme) / Number.parseFloat(temp[i + 1]);
    } else {
      value = Number.parseFloat(temp[i - 1]) / Number.parseFloat(temp[i + 1]);
    }
    return value;
  }

  pushCalculNonPrioritaire(work: string[], temp: string[], i: number) {
    //si en début de la liste de calcul et opération non prioritaire, 
    //alors on ajoute le premier terme de l'opération dans le resultat.
    if (i === 1) {
      work.push(temp[i - 1]);
    }
    work.push(temp[i]);
    work.push(temp[i + 1]);
  }


  /**
   * prettify le calcul pour l'affichage.
   */
  formatterCalcul() {
    this.affichageCalcul = this.calcul.join(" ");
    this.resultat = "";
  }

  /**
   * 
   * @returns true si le calcul est sémantiquement correcte, false sinon.
   */
  checkCalculCorrecte(): boolean {
    const n = Math.floor(this.calcul.length / 2);
    if (this.calcul.length == n * 2 + 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * efface le calcul en cours.
   */
  clearCalcul() {
    this.calcul = [];
    this.formatterCalcul();
  }
}
