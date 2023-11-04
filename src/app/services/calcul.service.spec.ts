import { ServiceCalcul } from "./ServiceCalcul";

describe("init service", () =>{
    const serviceCalcul = new ServiceCalcul();
    it("formule vide à l'initialisation", () =>{
        expect(serviceCalcul.isFormuleVide()).toBe(true);
    })
})


describe("test push:", () =>{
    let serviceCalcul:ServiceCalcul;
    beforeEach( () => { serviceCalcul = new ServiceCalcul();})
    it("on peut push un chiffre", () =>{
        serviceCalcul.push("9");
        expect(serviceCalcul.isFormuleVide()).toBe(false);
    })
    it("on peut push deux chiffres, l'un apres l'autre", () =>{
        serviceCalcul.push("9");
        serviceCalcul.push("8");
        expect(serviceCalcul.isFormuleVide()).toBe(false);
        expect(serviceCalcul.getNbrDeTermesDsFormule()).toBe(1);
    })
    it("on peut push des operations", () => {
        serviceCalcul.push("9");
        serviceCalcul.push("8");
        serviceCalcul.push("+");
        expect(serviceCalcul.isFormuleVide()).toBe(false);
        expect(serviceCalcul.getNbrDeTermesDsFormule()).toBe(2);
    })
    it("une formule commence par un nombre", () => {
        serviceCalcul.push("/");
        serviceCalcul.push("9");
        serviceCalcul.push("+");
        serviceCalcul.push("8");
        expect(serviceCalcul.getNbrDeTermesDsFormule()).toBe(3);
    })
    it("les nombres et les operations alternent l'un après l'autre", () =>{
        serviceCalcul.push("9");
        serviceCalcul.push("+");
        serviceCalcul.push("-");
        serviceCalcul.push("8");
        expect(serviceCalcul.getNbrDeTermesDsFormule()).toBe(3);
    })//cas input garbage
})

describe("test calcul: ", () =>{
    let serviceCalcul:ServiceCalcul;
    beforeEach(() => { serviceCalcul = new ServiceCalcul();})
    it("cas formule vide", () => {
        const resultat = serviceCalcul.calculer();
        expect(resultat).toBe(0);
    })
    it("cas nbr sans opération", () => {
        serviceCalcul.push("9");
        const resultat = serviceCalcul.calculer();
        expect(resultat).toBe(9);
    })
    it("cas avec opération mais calcul incomplet", () => {
        serviceCalcul.push("9");
        serviceCalcul.push("+");
        const resultat = serviceCalcul.calculer();
        expect(resultat).toBe(9)
    })
})

describe("test calcul prioritaire: ",() => {
    let serviceCalcul:ServiceCalcul;
    beforeEach( () => { serviceCalcul = new ServiceCalcul(); })
    it("cas formule contient que des opérations non prioritaires", () =>{
        serviceCalcul.push("9");
        serviceCalcul.push("+");
        serviceCalcul.push("9");
        const resultat = serviceCalcul.faireCalculsPrioritaires();
        expect(resultat.length).toBe(3);
    })
    it("cas formule contient plusieurs opérations non prioritaires", () => {
        serviceCalcul.push("9");
        serviceCalcul.push("+");
        serviceCalcul.push("9");
        serviceCalcul.push("+");
        serviceCalcul.push("9");
        const resultat = serviceCalcul.faireCalculsPrioritaires();
        expect(resultat.length).toBe(5);
    })
    it("cas un seul calcul prioritaire", () => {
        serviceCalcul.push("9");
        serviceCalcul.push("*");
        serviceCalcul.push("9");
        const resultat = serviceCalcul.faireCalculsPrioritaires();
        expect(resultat[0]).toBe("81");
    })

    it("cas plusieurs opérations prioritaires multiplication", () => {
        serviceCalcul.push("9");
        serviceCalcul.push("*");
        serviceCalcul.push("9");
        serviceCalcul.push("*");
        serviceCalcul.push("2");
        const resultat = serviceCalcul.faireCalculsPrioritaires();
        expect(resultat[0]).toBe("162");
    })
    it("cas une opération non prioritaire avant une opération prioritaire", () => {
        serviceCalcul.push("9");
        serviceCalcul.push("+");
        serviceCalcul.push("9");
        serviceCalcul.push("*");
        serviceCalcul.push("2");
        const resultat = serviceCalcul.faireCalculsPrioritaires();
        expect(resultat).toEqual(["9","+","18"]);
    })
    it("cas opération prioritaire avant opération non prioritaire", () =>{
        serviceCalcul.push("9");
        serviceCalcul.push("*");
        serviceCalcul.push("2");
        serviceCalcul.push("+");
        serviceCalcul.push("9");
        const resultat = serviceCalcul.faireCalculsPrioritaires();
        console.log("__"+resultat);
        expect(resultat).toEqual(["18", "+", "9"]);
    })
    it("cas plusieurs opérations prioritaires division", () => {
        serviceCalcul.push("4");
        serviceCalcul.push("/");
        serviceCalcul.push("2");
        serviceCalcul.push("/");
        serviceCalcul.push("2");
        const resultat = serviceCalcul.faireCalculsPrioritaires();
        console.log(resultat);
        expect(resultat).toEqual(["1"]);
    })
})

describe("test calcul non prioritaire", () => {
    let serviceCalcul:ServiceCalcul;
    beforeEach(() => { serviceCalcul = new ServiceCalcul();})
    it("cas une opération", () => {
        serviceCalcul.push("9");
        serviceCalcul.push("+");
        serviceCalcul.push("9");
        const resultat = serviceCalcul.faireCalculNonPrioritaire(serviceCalcul.formule);
        expect(resultat).toEqual(["18"]);
    })
})