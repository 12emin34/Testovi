class Pitanje {
    constructor(odgovori) {
        this.odgovori = odgovori;
    }
}

let pitanje1 = new Pitanje(new Map([
    ["odg1", false],
    ["odg2", false],
    ["odg3", true],
    ["odg4", false],
]))

if(pitanje1.odgovori.get("odg3")){
    console.log("Tačno!");
}

let pitanje2 = new Pitanje(new Map([
    ["odg1", true],
    ["odg2", false],
    ["odg3", false],
    ["odg4", false],
    ["odg5", false],
    ["odg6", false],
    ["odg7", false],
    ["odg8", false],
    ["odg9", false],
    ["odg10", false],
    ["odg11", false],
]))

if(pitanje2.odgovori.get("odg1")){
    console.log("Tačno!");
}