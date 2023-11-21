let brojPitanja = 2

/**
 * Predstavlja pitanje zajedno sa njegovim odgovorima
 * @constructor
 * @param pitanje
 * @param nizOdgovora
 */
class Pitanje {
    /**
     * Predstavlja tekst pitanja
     * @type {string}
     */
    #pitanje = ""

    /**
     * Predstavlja kolekciju parova odgovora i njihove tačnosti u obliku Map objekta
     * @type {Map<string, boolean>}
     */
    #odgovori = new Map();

    constructor(pitanje, nizOdgovora) {
        this.#pitanje = pitanje 
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
     * Vraća tekst pitanja
     * @returns {string}
     */
    get pitanje() {
        return this.#pitanje
    }

    /**
     * Vraća ID pitanja
     * @returns {number}
     */

    /**
     * Postavlja odgovore za pitanje
     * @param nizOdgovora
     */
    set odgovori(nizOdgovora) {
        this.#odgovori = new Map(nizOdgovora)
    }

    /**
     * Postavlja tekst pitanja
     * @param pitanje
     */
    set pitanje(pitanje){
        this.#pitanje = pitanje
    }

    /**
     * Vraća broj odgovora u pitanju
     * @returns {number}
     */
    brojOdgovora(){
        return this.#odgovori.size
    }
}

/**
 * Funkcija koja se koristi za prikazivanje novog pitanja u html dokumentu
 * @param pitanje
 */
function novoPitanje(pitanje) {
    
    let glavniBox = document.getElementById("box")

    let divPitanjeIOdg = document.createElement("div")
    divPitanjeIOdg.className = "box-pitanje" 
    glavniBox.appendChild(divPitanjeIOdg)

    let divPitanje = document.createElement("div")
    divPitanje.className = "pitanje"
    divPitanjeIOdg.appendChild(divPitanje)

    let divRedniBr = document.createElement("div")
    divRedniBr.className = "rednibroj"
    divPitanje.appendChild(divRedniBr)

    let hBrojPitanja = document.createElement("h4")
    divRedniBr.appendChild(hBrojPitanja)
    hBrojPitanja.innerText = brojPitanja.toString()
    brojPitanja++

    let pPitanje = document.createElement("h4")
    divPitanje.appendChild(pPitanje)
    pPitanje.innerText = pitanje.pitanje

    let divOdgovori = document.createElement("div")
    divOdgovori.className = "odgovori"
    divPitanjeIOdg.appendChild(divOdgovori)

    for (const [key, value] of pitanje.odgovori) {
        let odabraniOdgovor = document.createElement("input")
        odabraniOdgovor.type = "checkbox"

        let odgovor = document.createElement("label")
        odgovor.appendChild(odabraniOdgovor)
        odgovor.insertAdjacentText("beforeend", " " + key)

        let brOdgovori = document.createElement("br")

        divOdgovori.appendChild(odgovor)
        divOdgovori.appendChild(brOdgovori)
    }
}

// Sljedeći dio je privremen, koristi se samo za isprobavanje prethodnog koda
let pitanje1 = new Pitanje("Kako se naziva uzdužni dio kolovoza namijenjen za saobraćaj vozila u jednom smijeru sa jednom ili više saobraćajnih traka? ", [["odgovor 1", true], ["odgovor 2", false]])
let pitanje2 = new Pitanje("Mami", [["odgovor 1", true], ["odgovor 2", false]])
let pitanje3 = new Pitanje("Da napravi jesti", [["odgovor 1", true], ["odgovor 2", false], ["odgovor3", false] , ["odgovor4", false]])

novoPitanje(pitanje1)
novoPitanje(pitanje2)
novoPitanje(pitanje3)