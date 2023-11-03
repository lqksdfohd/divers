export class ServiceCalcul{
    formule:string[] = [];

    isFormuleVide(){
        return this.formule.length === 0;
    }

    push(nbr:string):void{
        const regxChiffres = /[0-9]+/;
        const regxOperations = /[+-/*]+/;
        let precedent = this.formule.pop() as string;
        //si formule est vide
        if(!precedent){
            //si n est un chiffre
            if(!regxOperations.test(nbr)){
                //on l'append à formule
                this.formule.push(nbr);
            }
        }
        //si le dernier élément de formule est un nombre et l'input n un chiffre
        else if(regxChiffres.test(precedent) && regxChiffres.test(nbr)){
            //on concatene nombre et chiffre et on l'append à formule
            precedent += nbr;
            this.formule.push(precedent);
        }//si le dernier élément est une operation et l'input n aussi
        else if(regxOperations.test(precedent) && regxOperations.test(nbr)){
            //on remplace l'encienne operation par l'input
            this.formule.push(nbr);
        }else{
            //si le dernier élément est un nombre et l'input n une opération alors ou 
            //l'inverse alors on append le dernier élément et ensuite l'input n.
            this.formule.push(precedent);
            this.formule.push(nbr);
        }
    }

    getNbrDeTermesDsFormule():number{
        return this.formule.length;
    }

}