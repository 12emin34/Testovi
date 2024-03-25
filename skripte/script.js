let brojPitanja = 1
let glavniBox = document.getElementById("box")
let pitanjaContainer = document.getElementById("pitanjaContainer")
let kategorija = "b"

class Test {
    #ime = ""
    #pitanja = [];
    #kategorija = ""

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

    set pitanja(value) {
        this.#pitanja = value;
    }

    get kategorija() {
        return this.#kategorija;
    }

    set kategorija(value) {
        this.#kategorija = value;
    }

    static fromJSON(json) {
        const test = new Test(json.ime);
        test.#pitanja = json.pitanja.map(Pitanje.fromJSON);
        test.#kategorija = json.kategorija;
        return test;
    }

    moguciBodovi() {
        let temp = 0;
        for (let pitanje of this.#pitanja) {
            temp += pitanje.bodovi;
        }
        return temp;
    }

    toJSON() {
        return {
            ime: this.#ime,
            pitanja: this.#pitanja.map(pitanje => pitanje.toJSON()),
            kategorija: this.#kategorija,
        };
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

    #slika = "";

    #bodovi = 2;

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
     * Postavlja odgovore za pitanje
     * @param nizOdgovora
     */
    set odgovori(nizOdgovora) {
        this.#odgovori = new Map(nizOdgovora)
    }

    /**
     * Vraća tekst pitanja
     * @returns {string}
     */
    get pitanje() {
        return this.#pitanje
    }

    /**
     * Postavlja tekst pitanja
     * @param pitanje
     */
    set pitanje(pitanje) {
        this.#pitanje = pitanje
    }

    get slika() {
        return this.#slika;
    }

    set slika(slika) {
        this.#slika = slika;
    }

    get bodovi() {
        return this.#bodovi;
    }

    set bodovi(value) {
        this.#bodovi = value;
    }

    static fromJSON(json) {
        const pitanje = new Pitanje(json.pitanje, json.odgovori);
        pitanje.#slika = json.slika;
        pitanje.#bodovi = json.bodovi;
        return pitanje;
    }

    /**
     * Vraća broj odgovora u pitanju
     * @returns {number}
     */
    brojOdgovora() {
        return this.#odgovori.size
    }

    toJSON() {
        return {
            pitanje: this.#pitanje,
            odgovori: Array.from(this.#odgovori),
            slika: this.#slika,
            bodovi: this.#bodovi,
        };
    }
}

/**
 * Funkcija koja se koristi za prikazivanje novog pitanja u html dokumentu
 * @param pitanje
 */
function novoPitanje(pitanje) {

    let glavniBox = document.getElementById("pitanjaContainer")

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
        if (tacno) {
            boxPitanja.item(i).style.display = "none"
        }
    }
    return rezultat
}

function testRender(url) {
    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            let test = Test.fromJSON(jsonData)
            let ukupniBodovi = 0;
            document.getElementsByClassName("kategorija")[0].style.display = "none";

            for (let pitanje of test.pitanja) {
                novoPitanje(pitanje)
            }

            let dugmeZaProvjeru = document.createElement("button")
            dugmeZaProvjeru.className = "provjeriButton"
            let dugmeZaProvjeruSpan = document.createElement("span")
            dugmeZaProvjeruSpan.innerHTML = "Provjeri"
            dugmeZaProvjeru.appendChild(dugmeZaProvjeruSpan)
            pitanjaContainer.appendChild(dugmeZaProvjeru)
            dugmeZaProvjeru.addEventListener("click", (e) => {
                dugmeZaProvjeru.remove();
                let rezultati = provjeriOdgovore(test.pitanja)
                for (let i = 0; i < test.pitanja.length; i++) {
                    if (rezultati[i]) {
                        ukupniBodovi += test.pitanja[i].bodovi;
                    }
                }
                let rezText = document.createElement("p");
                rezText.classList.add("resultText")
                rezText.innerText = "Osvojili ste " + ukupniBodovi + " bodova (" + Math.floor((ukupniBodovi * 100) / test.moguciBodovi()) + "%) od mogućih " + test.moguciBodovi();
                let rezText2 = document.createElement("p");
                rezText2.classList.add("resultText")
                if (ukupniBodovi >= (90 / 100) * test.moguciBodovi()) {
                    rezText2.innerText = "Položili ste ispit!";
                } else {
                    rezText2.innerText = "Pali ste ispit!";
                }

                pitanjaContainer.appendChild(rezText);
                pitanjaContainer.appendChild(rezText2);

            })

            console.log(test.toJSON())
        })
        .catch(error => console.error('Error:', error));
}

function testListRender() {
    glavniBox.innerHTML = ""
    fetch(`test_data/${kategorija}/index.json`)
        .then(response => response.json())
        .then(jsonData => {
            let testovi = jsonData.testovi
            for (let test of testovi) {
                let dugmeZaTest = document.createElement("button")
                dugmeZaTest.innerText = test.replace(".json", "")
                dugmeZaTest.addEventListener("click", (e) => {
                    glavniBox.innerHTML = ""
                    glavniBox.style.display = "none"
                    testRender(`test_data/${kategorija}/` + test)
                })
                glavniBox.appendChild(dugmeZaTest)
            }
        })
        .catch(error => console.error('Error:', error));
}

function promijeniKategoriju(novaKategorija) {
    kategorija = novaKategorija
    for (let element of document.getElementsByClassName("kategorija")) {
        element.classList.remove("selected")
    }
    let selected = document.getElementById(novaKategorija)
    selected.classList.add("selected")

    testListRender()
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


