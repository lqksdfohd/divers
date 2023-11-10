import { Injectable, Output } from "@angular/core";


@Injectable({providedIn: "root"})
export class ServiceCalcul {
    formule: string[] = [];

    isFormuleVide() {
        return this.formule.length === 0;
    }

    getFormule():string[]{
        return this.formule;
    }

    clearCalcul():void{
        this.formule = [];
    }

    supprimerTerme():void{
        let terme:string = this.formule.pop() as string;
        //si le dernier terme est un nombre ou chiffre
        if(/[0-9]+/.test(terme)){
            let temp = terme.substring(0,terme.length-1);
            //s'il reste des chiffres dans le nombre
            if(temp != "" && temp != undefined){
                this.formule.push(temp);
            }
        }//sinon on supprime les nombres composés d'un chiffre ou les opérations.
        else {}
    }

    push(nbr: string): void {
        const regxChiffres = /[0-9.]+/;
        const regxOperations = /[*/+-]+/;
        let precedent = this.formule.pop() as string;
        console.log("precedent: " + precedent)
        console.log("nbr: " + nbr);
        //si formule est vide
        if (!precedent) {
            //si n est un chiffre
            if (!regxOperations.test(nbr)) {
                //on l'append à formule
                this.formule.push(nbr);
            }
        }
        //si le dernier élément de formule est un nombre et l'input n un chiffre
        else if (regxChiffres.test(precedent) && regxChiffres.test(nbr)) {
            //on concatene nombre et chiffre et on l'append à formule
            precedent += nbr;
            this.formule.push(precedent);
        }//si le dernier élément est une operation et l'input n aussi
        else if (regxOperations.test(precedent) && regxOperations.test(nbr)) {
            //on remplace l'encienne operation par l'input
            console.log(this.formule);
            this.formule.push(nbr);
        } else {
            //si le dernier élément est un nombre et l'input n une opération ou 
            //l'inverse alors on append le dernier élément et ensuite l'input n.
            this.formule.push(precedent);
            this.formule.push(nbr);
        }
    }

    getNbrDeTermesDsFormule(): number {
        return this.formule.length;
    }

    calculer(): number {
        if (this.isFormuleVide()) {
            return 0;
        } else if (this.getNbrDeTermesDsFormule() < 3) {
            const temp: string = this.formule.shift() as string;
            const output: number = Number.parseFloat(temp);
            return output;
        } else {
            let temp: string[] = this.faireCalculsPrioritaires();
            return Number.parseFloat(this.faireCalculNonPrioritaire(temp));
        }
    }

    faireCalculsPrioritaires(): string[] {
        let temp = this.formule.slice();
        let output: string[] = [];

        while (temp.length > 0) {
            let gauche = temp.shift()!;
            let op = temp.shift()!;
            //tans qu'il y a des opérations
            if (op != undefined) {
                switch (op) {
                    case "*":
                        //cas multiplication
                        let termeDroiteMultiplication = Number.parseFloat(temp.shift()!);
                        const resultatMultiplication = Number.parseFloat(gauche) * termeDroiteMultiplication;
                        temp.unshift(resultatMultiplication.toString());
                        break;
                    case "/":
                        //cas division
                        let termeDroiteDivision = Number.parseFloat(temp.shift()!);
                        const resultatDivision = Number.parseFloat(gauche) / termeDroiteDivision;
                        temp.unshift(resultatDivision.toString());
                        break;
                    // si opération est non prioritaire on l'ajoute 
                    // à l'output sans faire de calcul dessus.
                    default:
                        output.push(gauche);
                        output.push(op);

                }
            } else {
                output.push(gauche);
            }
        }
        return output;
    }

    faireCalculNonPrioritaire(input: string[]): string {
        while (input.length > 1) {
            let droite: string = input.pop()!;
            let op: string = input.pop()!;
            if (op != undefined) {
                switch (op) {
                    case "+":
                        let NgaucheAddition = Number.parseFloat(input.pop()!);
                        let NdroiteAddition = Number.parseFloat(droite);
                        input.push((NgaucheAddition + NdroiteAddition).toString());
                        break;
                    case "-":
                        let NgaucheSoustraction = Number.parseFloat(input.pop()!);
                        let NdroiteSoustraction = Number.parseFloat(droite);
                        input.push((NgaucheSoustraction - NdroiteSoustraction).toString());
                        break;
                    default:
                        break;
                }
            } else {
                input.push(droite);
            }
        }
        return input[0];
    }

}