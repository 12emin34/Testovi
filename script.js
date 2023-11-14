/**
 * Predstavlja pitanje zajedno sa njegovim odgovorima
 * @constructor
 * @param {array} nizOdgovora
 */
class Pitanje {
    /**
     * Predstavlja kolekciju parova odgovora i njihove tačnosti u obliku Map objekta
     * @type {Map<any, any>}
     */
    #odgovori = new Map();

    constructor(nizOdgovora) {
        this.#odgovori = new Map(nizOdgovora)
    }

    /**
     * Vraća sve odgovore od pitanja u obliku Map objekta
     * @returns {Map<any, any>}
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

let pitanje1 = new Pitanje()
