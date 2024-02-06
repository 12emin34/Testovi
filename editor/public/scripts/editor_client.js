let brojPitanja = 1
let glavniBox = document.getElementById("box")
let test = {}
let counterZaNoviOdgovor = 1

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

    set pitanja(value) {
        this.#pitanja = value;
    }

    static fromJSON(json) {
        const test = new Test(json.ime);
        test.#pitanja = json.pitanja.map(Pitanje.fromJSON);
        return test;
    }

    toJSON() {
        return {
            ime: this.#ime,
            pitanja: this.#pitanja.map(pitanje => pitanje.toJSON())
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

    static fromJSON(json) {
        const pitanje = new Pitanje(json.pitanje, json.odgovori);
        pitanje.#slika = json.slika;
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
            slika: this.#slika
        };
    }
}

function noviOdgovor(checked, pitanje, keyOdgovora, divOdgovori) {
    let odabraniOdgovor = document.createElement("input")
    odabraniOdgovor.type = "checkbox"
    odabraniOdgovor.checked = checked
    odabraniOdgovor.onclick = function () {
        pitanje.odgovori.set(keyOdgovora, !checked)
    }

    let odgovor = document.createElement("label")
    odgovor.appendChild(odabraniOdgovor)
    let span = document.createElement("span")
    span.innerText = " " + keyOdgovora
    odgovor.appendChild(span)
    // odgovor.insertAdjacentText("beforeend", " " + keyOdgovora)

    let brOdgovori = document.createElement("br")

    span.onclick = function (ev) {
        ev.preventDefault()
        let noviSadrzaj = window.prompt("Unesi novi tekst za odgovor", span.innerText.trim())
        if (noviSadrzaj.trim().length === 0) {
            span.innerText = keyOdgovora
        } else {
            pitanje.odgovori.delete(keyOdgovora)
            pitanje.odgovori.set(noviSadrzaj.trim(), odabraniOdgovor.checked)
            span.innerText = " " + noviSadrzaj.trim()
        }
    }

    let odgDelButton = document.createElement("button")
    odgDelButton.innerText = "-"
    odgovor.appendChild(odgDelButton)

    odgDelButton.onclick = function (ev) {
        pitanje.odgovori.delete(keyOdgovora)
        odgovor.nextElementSibling.remove()
        odgovor.remove()
    }

    divOdgovori.appendChild(odgovor)
    divOdgovori.appendChild(brOdgovori)
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
    pPitanje.addEventListener("click", function () {
        let noviSadrzaj = window.prompt("Unesi novo ime pitanja", pitanje.pitanje)
        if (noviSadrzaj.trim().length === 0) {
            pPitanje.innerText = pitanje.pitanje
        } else {
            pitanje.pitanje = noviSadrzaj.trim()
            pPitanje.innerText = noviSadrzaj.trim()
        }
    });

    if (pitanje.slika !== "") {
        let divSlika = document.createElement("div")
        divSlika.className = "slika"
        let imgSlika = document.createElement("img")
        imgSlika.src = pitanje.slika
        divSlika.appendChild(imgSlika)
        divPitanjeIOdg.appendChild(divSlika)
        imgSlika.addEventListener("click", function () {
            let noviSadrzaj = window.prompt("Unesi novu sliku", pitanje.slika)
            if (noviSadrzaj.trim().length === 0) {
                imgSlika.innerText = pitanje.slika
            } else {
                pitanje.slika = noviSadrzaj
                imgSlika.src = noviSadrzaj
            }
        });
        divPitanjeIOdg.classList.add("grid-slika")
    } else {
        divPitanjeIOdg.classList.add("grid-obicno")
    }

    let divOdgovori = document.createElement("div")
    divOdgovori.className = "odgovor"
    divPitanjeIOdg.appendChild(divOdgovori)

    for (const [key, value] of pitanje.odgovori) {
        noviOdgovor(value, pitanje, key, divOdgovori);
    }


    let deleteButtonPitanjeDiv = document.createElement("div")
    let deleteButtonPitanje = document.createElement("button")

    deleteButtonPitanjeDiv.appendChild(deleteButtonPitanje)
    deleteButtonPitanje.classList.add("obrisiPitanje")
    deleteButtonPitanje.innerText = "X"

    deleteButtonPitanje.addEventListener("click", function (ev) {
        test.pitanja = test.pitanja.filter((p) => p.pitanje !== pitanje.pitanje)
        divPitanjeIOdg.remove()
        brojPitanja--
    })

    let addOdgovorButton = document.createElement("button")
    addOdgovorButton.innerText = "+"
    addOdgovorButton.classList.add("dodajOdgovor")
    divPitanjeIOdg.appendChild(addOdgovorButton)
    addOdgovorButton.onclick = function(ev){
        let noviOdg = "novi odgovor" + counterZaNoviOdgovor
        let noviValue = false

        pitanje.odgovori.set(noviOdg, noviValue)
        counterZaNoviOdgovor++

        noviOdgovor(noviValue, pitanje, noviOdg, divOdgovori)
    }

    divPitanjeIOdg.appendChild(deleteButtonPitanjeDiv)
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

async function postJsonData(endpoint, jsonObject) {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonObject)
    });

    const actualResponse = await response.json();
}

function testRender(url) {
    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            test = Test.fromJSON(jsonData)

            for (let pitanje of test.pitanja) {
                novoPitanje(pitanje)
            }

            let dodajPitanje = document.getElementById("dodajPitanje")
            dodajPitanje.addEventListener("click", (e) => {
                let pitanje = new Pitanje("Novo pitanje", [["odgovor 1", false], ["odgovor 2", false]])
                test.pitanja.push(pitanje)
                novoPitanje(pitanje)
            })

            let spremi = document.getElementById("spremi")
            spremi.addEventListener("click", (e) => {
                test.ime = prompt("Unesi ime testa", test.ime)
                if (test.ime === null) {
                    return
                }
                console.log(JSON.stringify(test.toJSON()))
                postJsonData("/spremi", test.toJSON())
                    .then(r => r.json())
                    .then(data => console.log(data))
            })

            let obrisi = document.getElementById("brisanjeTesta")
            obrisi.addEventListener("click", (e) => {
                let shouldDelete = confirm("Jeste li sigurni da želite obrisati ovaj test?")
                if (shouldDelete) {
                    postJsonData("/obrisi", JSON.stringify({
                        ime: test.ime + ".json"
                    })).then(r => r.json())
                        .then(data => console.log(data))
                }
            })

            let navbarOpcije = document.getElementsByClassName("opcije")[0]
            navbarOpcije.classList.remove("hide")
        })
        .catch(error => console.error('Error:', error));
}

function testListRender() {
    let text = document.createElement("h1")
    text.innerText = "Izaberi koji test želiš urediti"
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

// window.onbeforeunload = function (ev) {
//     confirm("Da li želite spremiti test?")
//     ev.preventDefault();
//     ev.returnValue = '';
// }


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