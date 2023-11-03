class Pitanje {
    constructor(odgovori) {
        this.odgovori = odgovori;
    }
}

let pitanje1 = new Pitanje(new Map([
    ["odg1", true],
    ["odg2", false],
    ["odg3", true],
]))

if (pitanje1.odgovori.get("odg1")) {
    console.log("dzaja")
}