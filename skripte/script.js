let brojPitanja = 1
let glavniBox = document.getElementById("box")

class Test {
    #ime = ""
    #pitanja = [];

    constructor(ime) {
        this.#ime = ime;
    }

    get ime() {
        return this.#ime;
    }

    set ime(vrijednost) {
        this.#ime = vrijednost;
    }

    get pitanja() {
        return this.#pitanja;
    }

    toJSON() {
        return {
            ime: this.#ime,
            pitanja: this.#pitanja.map(pitanje => pitanje.toJSON())
        };
    }

    static fromJSON(json) {
        const test = new Test(json.ime);
        test.#pitanja = json.pitanja.map(Pitanje.fromJSON);
        return test;
    }
}

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

    #slika = ""

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

    get slika() {
        return this.#slika;
    }

    set slika(slika) {
        this.#slika = slika;
    }

    /**
     * Vraća broj odgovora u pitanju
     * @returns {number}
     */
    brojOdgovora(){
        return this.#odgovori.size
    }

    toJSON() {
        return {
            pitanje: this.#pitanje,
            odgovori: Array.from(this.#odgovori),
            slika: this.#slika
        };
    }

    static fromJSON(json) {
        const pitanje = new Pitanje(json.pitanje, json.odgovori);
        pitanje.#slika = json.slika;
        return pitanje;
    }
}

/**
 * Funkcija koja se koristi za prikazivanje novog pitanja u html dokumentu
 * @param pitanje
 */
function novoPitanje(pitanje) {
    
    let glavniBox = document.getElementById("box")

    let divPitanjeIOdg = document.createElement("div")
    divPitanjeIOdg.classList.add("box-pitanje")
    glavniBox.appendChild(divPitanjeIOdg)

    let divRedniBr = document.createElement("div")
    divRedniBr.className = "broj"

    let divZaRedniBroj = document.createElement("div")
    divZaRedniBroj.className = "redniBroj"
    divPitanjeIOdg.appendChild(divZaRedniBroj)
    divZaRedniBroj.appendChild(divRedniBr)

    let hBrojPitanja = document.createElement("h4")
    divRedniBr.appendChild(hBrojPitanja)
    hBrojPitanja.innerText = brojPitanja.toString()
    brojPitanja++

    let divPitanje = document.createElement("div")
    divPitanje.className = "pitanje"
    divPitanjeIOdg.appendChild(divPitanje)

    let pPitanje = document.createElement("h4")
    pPitanje.innerText = pitanje.pitanje
    divPitanje.appendChild(pPitanje)
    
    if (pitanje.slika !== "") {
        let divSlika = document.createElement("div")
        divSlika.className = "slika"
        let imgSlika = document.createElement("img")
        imgSlika.src = pitanje.slika
        divSlika.appendChild(imgSlika)
        divPitanjeIOdg.appendChild(divSlika)
        divPitanjeIOdg.classList.add("grid-slika")
    } else {
        divPitanjeIOdg.classList.add("grid-obicno")
    }

    let divOdgovori = document.createElement("div")
    divOdgovori.className = "odgovor"
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
            let label = inputOdgovori.item(j).parentElement
            if (Array.from(pitanja[i].odgovori.values())[j] !== inputOdgovori.item(j).checked) {
                tacno = false
                if (inputOdgovori.item(j).checked) {
                    label.insertAdjacentHTML("beforeend", "<i class=\"fa-solid fa-xmark\"></i>")
                    label.classList.add("netacno")
                } else if (!inputOdgovori.item(j).checked && Array.from(pitanja[i].odgovori.values())[j]) {
                    label.insertAdjacentHTML("beforeend", "<i class=\"fa-solid fa-check\"></i>")
                }
            } else if (inputOdgovori.item(j).checked) {
                label.insertAdjacentHTML("beforeend", "<i class=\"fa-solid fa-check\"></i>")
            }
        }
        rezultat.push(tacno)
    }
    return rezultat
}

function testRender(url) {
    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            let test = Test.fromJSON(jsonData)

            for (let pitanje of test.pitanja) {
                novoPitanje(pitanje)
            }

            let dugmeZaProvjeru = document.createElement("button")
            dugmeZaProvjeru.className = "provjeriButton"
            let dugmeZaProvjeruSpan = document.createElement("span")
            dugmeZaProvjeruSpan.innerHTML = "Provjeri"
            dugmeZaProvjeru.appendChild(dugmeZaProvjeruSpan)
            glavniBox.appendChild(dugmeZaProvjeru)
            dugmeZaProvjeru.addEventListener("click", (e) => {
                provjeriOdgovore(test.pitanja)
            })

            console.log(test.toJSON())
        })
        .catch(error => console.error('Error:', error));
}

function testListRender() {
    let text = document.createElement("h1")
    text.innerText = "Izaberi koji test želiš raditi"
    glavniBox.appendChild(text)
    fetch('test_data/index.json')
        .then(response => response.json())
        .then(jsonData => {
            let testovi = jsonData.testovi
            for (let test of testovi) {
                let dugmeZaTest = document.createElement("button")
                dugmeZaTest.className = "provjeriButton"
                let dugmeZaTestSpan = document.createElement("span")
                dugmeZaTestSpan.innerHTML = test.replace(".json", "")
                dugmeZaTest.appendChild(dugmeZaTestSpan)
                dugmeZaTest.addEventListener("click", (e) => {
                    glavniBox.innerText = ""
                    testRender('test_data/' + test)
                })
                glavniBox.appendChild(dugmeZaTest)
            }
        })
        .catch(error => console.error('Error:', error));
}

testListRender()


// let testovi = ["test1.json"]
// let obj = {
//     testovi: testovi
// }
// console.log(JSON.stringify(obj))


// let test1 = new Test("Test 1")
// let pitanje1 = new Pitanje("Kako se naziva uzdužni dio kolovoza namijenjen za saobraćaj vozila u jednom smijeru sa jednom ili više saobraćajnih traka? ", [["odgovor 1", true], ["odgovor 2", false]])
// let pitanje2 = new Pitanje("Mami", [["odgovor 1", true], ["odgovor 2", false]])
// let pitanje3 = new Pitanje("Da napravi jesti", [["odgovor 1", true], ["odgovor 2", false], ["odgovor3", false] , ["odgovor4", false]])
//
// test1.pitanja.push(pitanje1)
// test1.pitanja.push(pitanje2)
// test1.pitanja.push(pitanje3)
//
// console.log(JSON.stringify(test1.toJSON()))