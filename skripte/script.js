let brojPitanja = 1
let glavniBox = document.getElementById("box")

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

    let divZaRedniBroj = document.createElement("div")
    divZaRedniBroj.className = "redni-broj-div"
    divPitanje.appendChild(divZaRedniBroj)
    divZaRedniBroj.appendChild(divRedniBr)

    let hBrojPitanja = document.createElement("h4")
    divRedniBr.appendChild(hBrojPitanja)
    hBrojPitanja.innerText = brojPitanja.toString()
    brojPitanja++

    let pPitanje = document.createElement("h4")
    pPitanje.innerText = pitanje.pitanje

    let divP = document.createElement("div")
    divP.className = "pitanje-div"
    divP.appendChild(pPitanje)
    divPitanje.appendChild(divP)
    

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

/**
 * Provjerava tačnost odgovora i vraća niz sa rezultatima te provjere (true ili false za svako pitanje)
 * @param pitanja
 * @returns {boolean[]}
 */
function provjeriOdgovore(pitanja) {
    let boxPitanja = document.getElementsByClassName("box-pitanje")
    let rezultat = []
    for (let i = 0; i < pitanja.length; i++) {
        let inputOdgovori = boxPitanja.item(i).getElementsByTagName("input")
        let tacno = true
        for (let j = 0; j < pitanja[i].brojOdgovora(); j++) {
            if (Array.from(pitanja[i].odgovori.values())[j] !== inputOdgovori.item(j).checked) {
                tacno = false
                break
            }
        }
        rezultat.push(tacno)
    }
    return rezultat
}

// Sljedeći dio je privremen, koristi se samo za isprobavanje prethodnog koda
let pitanje1 = new Pitanje("Kako se naziva uzdužni dio kolovoza namijenjen za saobraćaj vozila u jednom smijeru sa jednom ili više saobraćajnih traka? ", [["odgovor 1", true], ["odgovor 2", false]])
let pitanje2 = new Pitanje("Mami", [["odgovor 1", true], ["odgovor 2", false]])
let pitanje3 = new Pitanje("Da napravi jesti", [["odgovor 1", true], ["odgovor 2", false], ["odgovor3", false] , ["odgovor4", false]])

novoPitanje(pitanje1)
novoPitanje(pitanje2)
novoPitanje(pitanje3)

let pitanja = [
    pitanje1,
    pitanje2,
    pitanje3
]

let dugmeZaProvjeru = document.createElement("button")
dugmeZaProvjeru.innerText = "Provjeri"
glavniBox.appendChild(dugmeZaProvjeru)
dugmeZaProvjeru.addEventListener("click", (e) => {
    let privremeniTekst = document.createElement("p")
    privremeniTekst.innerText = provjeriOdgovore(pitanja).toString()
    glavniBox.appendChild(privremeniTekst)
})