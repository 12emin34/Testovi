class Pitanje {
    #odgovori = new Map();

    constructor(nizOdgovora) {
        this.#odgovori = new Map(nizOdgovora)
    }

    get odgovori() {
        return this.#odgovori
    }

    set odgovori(nizOdgovora) {
        this.#odgovori = new Map(nizOdgovora)
    }
}

let pitanje1 = new Pitanje([
        ["odg1", true]
    ]
)

pitanje1.odgovori = [["odg1", true], ["odg2", false]]

console.log(pitanje1.odgovori)