/**
 * Predstavlja pitanje zajedno sa njegovim odgovorima
 * @constructor
 * @param {array} nizOdgovora
 */
class Pitanje {
    /**
     * Predstavlja kolekciju parova odgovora i njihove tačnosti u obliku Map objekta
     * @type {Map<string, boolean>}
     */
    #odgovori = new Map();

    constructor(nizOdgovora) {
        this.#odgovori = new Map(nizOdgovora)
    }

    /**
     * Vraća sve odgovore od pitanja u obliku Map objekta
     * @returns {Map<string, boolean>}
     */
    get odgovori() {
        return this.#odgovori
    }

    /**
     * Postavlja odgovore za pitanje
     * @param nizOdgovora
     */
    set odgovori(nizOdgovora) {
        this.#odgovori = new Map(nizOdgovora)
    }
}

let pitanje1 = new Pitanje([["odgovor 1", true], ["odgovor 2", false]])
console.log(pitanje1.odgovori)

let noviElement = document.createElement("h1")
noviElement.innerText = "dzaja"
document.body.appendChild(noviElement)
