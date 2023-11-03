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
    })
    
})