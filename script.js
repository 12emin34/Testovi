class Pitanje {
    constructor(odgovori) {
        this.odgovori = odgovori;
    }
}

let pitanje1 = new Pitanje(new Map([
    ["odg1", true],
    ["odg2", false],
    ["odg3", true],
    ["odg4", false],
]))

if (pitanje1.odgovori.get("odg2")) {
    console.log("dzaja")
} else {
    console.log("ilhan je pametan")
}