"use strict";

class Element {
  constructor(period, group, name, atomicWeight, electronegativity, type, block) {
    this.period = period;
    this.group = group;
    this.name = name;
    this.atomicWeight = atomicWeight;
    this.electronegativity = electronegativity;
    this.type = type;
    this.block = block;
  }
}

let elements = [
  new Element(1, 1, "hydrogen", 1, 2.1, "nonmetal", "s"),
  new Element(1, 18, "helium",   4, 0,   "noble gas", "s"),
  new Element(2, 1, "lithium", 7, 1.0, "metal", "s"),
  new Element(2, 2, "beryllium", 9, 1.5, "metal", "s"),
  new Element(2, 13, "boron", 11, 2.0, "nonmetal", "p"),
  new Element(2, 14, "carbon", 12, 2.5, "nonmetal", "p"),
  new Element(2, 15, "nitrogen", 14, 3.0, "nonmetal", "p"),
  new Element(2, 16, "oxygen", 16, 3.5, "nonmetal", "p"),
  new Element(2, 17, "fluorine", 19, 4.0, "nonmetal", "p"),
  new Element(2, 18, "neon", 20, 0, "noble gas", "p"),
  new Element(3, 1, "sodium", 23, 0.9, "metal", "s"),
  new Element(3, 2, "magnesium", 24, 1.2, "metal", "s"),
  new Element(3, 13, "aluminum", 27, 1.5, "metal", "p"),
  new Element(3, 14, "silicon", 28, 1.8, "nonmetal", "p"),
  new Element(3, 15, "phosphorus", 31, 2.1, "nonmetal", "p"),
  new Element(3, 16, "sulfur", 32, 2.5, "nonmetal", "p"),
  new Element(3, 17, "chlorine", 35, 3.0, "nonmetal", "p"),
  new Element(3, 18, "argon", 40, 0, "noble gas", "p"),
  new Element(4, 1, "potassium", 39, 0.9, "metal", "s"),
  new Element(4, 2, "calcium", 40, 1.0, "metal", "s"),
  new Element(4, 3, "scandium", 45, 1.3, "metal", "d"),
  new Element(4, 4, "titanium", 48, 1.5, "metal", "d"),
  new Element(4, 5, "vanadium", 51, 1.7, "metal", "d"),
  new Element(4, 6, "chromium", 52, 1.9, "metal", "d"),
  new Element(4, 7, "manganese", 55, 1.7, "metal", "d"),
  new Element(4, 8, "iron", 56, 1.9, "metal", "d"),
  new Element(4, 9, "cobalt", 59, 2.0, "metal", "d"),
  new Element(4, 10, "nickel", 59, 2.0, "metal", "d"),
  new Element(4, 11, "copper", 64, 1.9, "metal", "d"),
  new Element(4, 12, "zinc", 65, 1.6, "metal", "d"),
  new Element(4, 13, "gallium", 70, 1.6, "metal", "p"),
  new Element(4, 14, "germanium", 73, 1.8, "metal", "p"),
  new Element(4, 15, "arsenic", 75, 2.0, "nonmetal", "p"),
  new Element(4, 16, "selenium", 79, 2.4, "nonmetal", "p"),
  new Element(4, 17, "bromine", 80, 2.8, "nonmetal", "p"),
  new Element(4, 18, "krypton", 84, 0, "noble gas", "p"),
  new Element(5, 1, "rubidium", 85, 0.8, "metal", "s"),
  new Element(5, 2, "strontium", 88, 1.0, "metal", "s"),
  new Element(5, 3, "yttrium", 89, 1.3, "metal", "d"),
  new Element(5, 4, "zirconium", 91, 1.4, "metal", "d"),
  new Element(5, 5, "niobium", 93, 1.6, "metal", "d"),
  new Element(5, 6, "molybdenum", 96, 2.0, "metal", "d"),
  new Element(5, 7, "technetium", 98, 1.9, "metal", "d"),
  new Element(5, 8, "ruthenium", 101, 2.2, "metal", "d"),
  new Element(5, 9, "rhodium", 103, 2.2, "metal", "d"),
  new Element(5, 10, "palladium", 106, 2.2, "metal", "d"),
  new Element(5, 11, "silver", 108, 1.9, "metal", "d"),
  new Element(5, 12, "cadmium", 112, 1.7, "metal", "d"),
  new Element(5, 13, "indium", 115, 1.7, "metal", "p"),
  new Element(5, 14, "tin", 119, 1.7, "metal", "p"),
  new Element(5, 15, "antimony", 122, 1.9, "metal", "p"),
  new Element(5, 16, "tellurium", 128, 2.1, "nonmetal", "p"),
  new Element(5, 17, "iodine", 127, 2.5, "nonmetal", "p"),
  new Element(5, 18, "xenon", 131, 0, "noble gas", "p"),
  new Element(6, 1, "cesium", 133, 0.7, "metal", "s"),
  new Element(6, 2, "barium", 137, 0.9, "metal", "s"),
  new Element(6, 3, "lanthanum", 139, 1.1, "metal", "d"),
  new Element(6, 0, "cerium", 140, 1.1, "metal", "f"),
  new Element(6, 0, "praseodymium", 141, 1.1, "metal", "f"),
  new Element(6, 0, "neodymium", 144, 1.2, "metal", "f"),
  new Element(6, 0, "promethium", 145, 1.2, "metal", "f"),
  new Element(6, 0, "samarium", 150, 1.2, "metal", "f"),
  new Element(6, 0, "europium", 152, 1.0, "metal", "f"),
  new Element(6, 0, "gadolinium", 157, 1.1, "metal", "f"),
  new Element(6, 0, "terbium", 159, 1.2, "metal", "f"),
  new Element(6, 0, "dysprosium", 163, 1.2, "metal", "f"),
  new Element(6, 0, "holmium", 165, 1.2, "metal", "f"),
  new Element(6, 0, "erbium", 167, 1.2, "metal", "f"),
  new Element(6, 0, "thulium", 169, 1.2, "metal", "f"),
  new Element(6, 0, "ytterbium", 173, 1.1, "metal", "f"),
  new Element(6, 0, "lutetium", 175, 1.2, "metal", "f"),
  new Element(6, 4, "hafnium", 178, 1.3, "metal", "d"),
  new Element(6, 5, "tantalum", 181, 1.5, "metal", "d"),
  new Element(6, 6, "tungsten", 184, 2.0, "metal", "d"),
  new Element(6, 7, "rhenium", 186, 1.9, "metal", "d"),
  new Element(6, 8, "osmium", 190, 2.2, "metal", "d"),
  new Element(6, 9, "iridium", 192, 2.2, "metal", "d"),
  new Element(6, 10, "platinium", 195, 2.2, "metal", "d"),
  new Element(6, 11, "gold", 197, 2.4, "metal", "d"),
  new Element(6, 12, "mercury", 201, 1.9, "metal", "d"),
  new Element(6, 13, "thallium", 204, 1.8, "metal", "p"),
  new Element(6, 14, "lead", 207, 1.8, "metal", "p"),
  new Element(6, 15, "bismuth", 209, 1.9, "metal", "p"),
  new Element(6, 16, "polonium", 209, 2.0, "metal", "p"),
  new Element(6, 17, "astatine", 210, 2.2, "nonmetal", "p"),
  new Element(6, 18, "radon", 222, 0, "noble gas", "p"),
  new Element(7, 1, "francium", 223, 0.7, "metal", "s"),
  new Element(7, 2, "radium", 226, 0.9, "metal", "s"),
  new Element(7, 3, "actinium", 227, 1.1, "metal", "d"),
  new Element(7, 0, "thorium", 232, 1.3, "metal", "f"),
  new Element(7, 0, "proactinium", 231, 1.5, "metal", "f"),
  new Element(7, 0, "uranium", 283, 1.7, "metal", "f"),
  new Element(7, 0, "neptunium", 237, 1.7, "metal", "f"),
  new Element(7, 0, "plutonium", 244, 1.7, "metal", "f"),
  new Element(7, 0, "americium", 243, 0, "metal", "f"),
  new Element(7, 0, "curium", 247, 1.7, "metal", "f"),
  new Element(7, 0, "berkelium", 247, 0, "metal", "f"),
  new Element(7, 0, "californium", 251, 0, "metal", "f"),
  new Element(7, 0, "einsteinium", 252, 0, "metal", "f"),
  new Element(7, 0, "fermium", 257, 0, "metal", "f"),
  new Element(7, 0, "mendelevium", 258, 0, "metal", "f"),
  new Element(7, 0, "nobelium", 259, 0, "metal", "f"),
  new Element(7, 0, "lawrencium", 262, 0, "metal", "f"),
  new Element(7, 4, "rutherfordium", 267, 0, "metal", "d"),
  new Element(7, 5, "dubnium", 268, 0, "metal", "d"),
  new Element(7, 6, "seaborgium", 271, 0, "metal", "d"),
  new Element(7, 7, "bohrium", 270, 0, "metal", "d"),
  new Element(7, 8, "hassium", 269, 0, "metal", "d"),
  new Element(7, 9, "meitnerium", 276, 0, "metal", "d"),
  new Element(7, 10, "darmstadtium", 281, 0, "metal", "d"),
  new Element(7, 11, "roentgenium", 281, 0, "metal", "d"),
  new Element(7, 12, "copernicium", 285, 0, "metal", "d"),
  new Element(7, 13, "nihonium", 286, 0, "metal", "p"),
  new Element(7, 14, "flerovium", 289, 0, "metal", "p"),
  new Element(7, 15, "moscovium", 289, 0, "metal", "p"),
  new Element(7, 16, "livermorium", 293, 0, "metal", "p"),
  new Element(7, 17, "tennessine", 294, 0, "metal", "p"),
  new Element(7, 18, "oganesson", 294, 0, "noble gas", "p")
];

function showType() {
  for(let iii = 1; iii <= elements.length; iii++) {
    if(elements[iii - 1].type == "metal") {
      document.querySelector("#z" + iii).style.backgroundColor = "#5395ed";
    } else if(elements[iii - 1].type == "nonmetal") {
      document.querySelector("#z" + iii).style.backgroundColor = "#86ed53";
    } else {
      document.querySelector("#z" + iii).style.backgroundColor = "#abe88d";
    }
  }

  document.querySelector("#legend").innerHTML = `<p class="legendentry" style="background-color: #5395ed;">Metals</p>
                                                 <p class="legendentry" style="background-color: #86ed53;">Nonmetals</p>
                                                 <p class="legendentry" style="background-color: #abe88d;">Noble gases</p>`;
}

function showElect() {
  for(let iii = 1; iii <= elements.length; iii++) {
    document.querySelector("#z" + iii).style.backgroundColor = "rgb(255, "
                          + (255 - (elements[iii - 1].electronegativity * 63)) + ", "
                          + (255 - (elements[iii - 1].electronegativity * 63))+ ")";
  }

  document.querySelector("#legend").innerHTML = `<p class="legendentry" style="background-color: #FF0000;">More electronegativity</p>
                                                 <p class="legendentry" style="background-color: #FFFFFF; border: 1px solid #000000;">
                                                  Less electronegativity</p>`;
}

function showBlock() {
  for(let iii = 1; iii <= elements.length; iii++) {
    if(elements[iii - 1].block == "s") {
      document.querySelector("#z" + iii).style.backgroundColor = "#15ff00";
    } else if(elements[iii - 1].block == "p") {
      document.querySelector("#z" + iii).style.backgroundColor = "#0094ff";
    } else if(elements[iii - 1].block == "d") {
      document.querySelector("#z" + iii).style.backgroundColor = "#c8ce14";
    } else {
      document.querySelector("#z" + iii).style.backgroundColor = "#d204f7";
    }
  }

  document.querySelector("#legend").innerHTML = `<p class="legendentry" style="background-color: #15ff00;">s block</p>
                                                 <p class="legendentry" style="background-color: #0094ff;">p block</p>
                                                 <p class="legendentry" style="background-color: #c8ce14;">d block</p>
                                                 <p class="legendentry" style="background-color: #d204f7;">f block</p>`;
}

function showElement(atomicNumber) {
  if(document.querySelector("#info").style.visibility != "visible") {
    document.querySelector("#info").style.visibility = "visible";
  }

  document.querySelector("#period").innerHTML = elements[atomicNumber - 1].period;
  if(elements[atomicNumber - 1].group == 0) {
    document.querySelector("#group").innerHTML = "n/a";
  } else {
    document.querySelector("#group").innerHTML = elements[atomicNumber - 1].group;
  }
  document.querySelector("#weight").innerHTML = elements[atomicNumber - 1].atomicWeight;
  document.querySelector("#number").innerHTML = atomicNumber;
  document.querySelector("#symbol").innerHTML = document.querySelector("#z" + atomicNumber).innerHTML;

  document.querySelector("#name").innerHTML = elements[atomicNumber - 1].name.charAt(0).toUpperCase()
                                            + elements[atomicNumber - 1].name.slice(1);
  document.querySelector("#type").innerHTML = "Type: " + elements[atomicNumber - 1].type;
  document.querySelector("#block").innerHTML = "Block: " + elements[atomicNumber - 1].block;
  document.querySelector("#noElectrons").innerHTML = "Number of electrons: " + atomicNumber;
  document.querySelector("#noProtons").innerHTML = "Number of protons: " + atomicNumber;
  document.querySelector("#noNeutrons").innerHTML = "Number of neutrons: " + (elements[atomicNumber - 1].atomicWeight - atomicNumber);
  if(elements[atomicNumber - 1].electronegativity != 0) {
    document.querySelector("#elecneg").innerHTML = "Electronegativity: " + elements[atomicNumber - 1].electronegativity;
  } else {
    document.querySelector("#elecneg").innerHTML = "Electronegativity: n/a";
  }

  document.querySelector("#shell").innerHTML = "Shell: ";
  let orbitals = {
    "1s": 0,
    "2s": 0,
    "2p": 0,
    "3s": 0,
    "3p": 0,
    "3d": 0,
    "4s": 0,
    "4p": 0,
    "4d": 0,
    "4f": 0,
    "5s": 0,
    "5p": 0,
    "5d": 0,
    "5f": 0,
    "6s": 0,
    "6p": 0,
    "6d": 0,
    "7s": 0,
    "7p": 0
  };

  for(let iii = atomicNumber; iii > 0; iii--) {
    if(elements[iii - 1].block == "s") {
      orbitals[elements[iii - 1].period + "s"] += 1;
    } else if(elements[iii - 1].block == "d") {
      orbitals[(elements[iii - 1].period - 1) + "d"] += 1;
    } else if(elements[iii - 1].block == "p") {
      orbitals[elements[iii - 1].period + "p"] += 1;
    } else {
      orbitals[(elements[iii - 1].period - 2) + "f"] += 1;
    }

    if(iii == 24) {         //Chromium
      orbitals["3d"] += 1;
      orbitals["4s"] -= 1;
    } else if(iii == 25) {  //Manganese
      orbitals["3d"] -= 1;
      orbitals["4s"] += 1;
    } else if(iii == 29) {  //Copper
      orbitals["3d"] += 1;
      orbitals["4s"] -= 1;
    } else if(iii == 30) {  //Zinc
      orbitals["3d"] -= 1;
      orbitals["4s"] += 1;
    } else if(iii == 41) {  //Niobium
      orbitals["4d"] += 1;
      orbitals["5s"] -= 1;
    } else if(iii == 46) {  //Palladium
      orbitals["4d"] += 1;
      orbitals["5s"] -= 1;
    } else if(iii == 47) {  //Silver
      orbitals["4d"] -= 1;
      orbitals["5s"] += 1;
    } else if(iii == 48) {  //Cadmium
      orbitals["4d"] -= 1;
      orbitals["5s"] += 1;
    } else if(iii == 59) {  //Praseodymium
      orbitals["5d"] -= 1;
      orbitals["4f"] += 1;
    } else if(iii == 64) {  //Gadolinium
      orbitals["5d"] += 1;
      orbitals["4f"] -= 1;
    } else if(iii == 65) {  //Terbium
      orbitals["5d"] -= 1;
      orbitals["4f"] += 1;
    } else if(iii == 71) {  //Lutetium
      orbitals["5d"] += 1;
      orbitals["4f"] -= 1;
    } else if(iii == 78) {  //Platinium
      orbitals["5d"] += 1;
      orbitals["6s"] -= 1;
    } else if(iii == 80) {  //Mercury
      orbitals["5d"] -= 1;
      orbitals["6s"] += 1;
    } else if(iii == 90) {  //Thorium
      orbitals["6d"] += 1;
      orbitals["5f"] -= 1;
    } else if(iii == 91) {  //Proactinium
      orbitals["6d"] -= 1;
      orbitals["5f"] += 1;
    } else if(iii == 94) {  //Plutonium
      orbitals["6d"] -= 1;
      orbitals["5f"] += 1;
    } else if(iii == 96) {  //Curium
      orbitals["6d"] += 1;
      orbitals["5f"] -= 1;
    } else if(iii == 97) {  //Berkelium
      orbitals["6d"] -= 1;
      orbitals["5f"] += 1;
    } else if(iii == 103) {  //Lawrencium
      orbitals["6d"] += 1;
      orbitals["5f"] -= 1;
    }
  }

  document.querySelector("#orbital").innerHTML = "Orbitals: ";
  for (let orbital in orbitals) {
    if(orbitals[orbital] != 0) {
      document.querySelector("#orbital").innerHTML += orbital + "<sup>" + orbitals[orbital] + "</sup>";
    }
  }

  document.querySelector("#shell").innerHTML = "Shell: ";
  let shells = [ 0, 0, 0, 0, 0, 0, 0 ];
  for(let iii = 1; iii <= elements[atomicNumber - 1].period; iii++) {
    for (let orbital in orbitals) {
      if(orbital == iii + "s"
      || orbital == iii + "p"
      || orbital == iii + "d"
      || orbital == iii + "f") {
        shells[iii - 1] += orbitals[orbital];
      }
    }
    document.querySelector("#shell").innerHTML += String.fromCharCode("J".charCodeAt(0) + iii) + "<sup>" + shells[iii - 1] + "</sup>";
  }

  document.querySelector("#orbital_short").innerHTML = "Orbitals shortened:";
  if(elements[atomicNumber - 1].type == "noble gas") {
    document.querySelector("#orbital_short").innerHTML += " [" + document.querySelector("#z" + atomicNumber).innerHTML + "]";
  } else
  if(atomicNumber == 1) {
    document.querySelector("#orbital_short").innerHTML += " 1s<sup>1</sup>";
  } else {
    for(let iii = atomicNumber; iii > 0; iii--) {
      if(elements[iii - 1].type == "noble gas") {
        document.querySelector("#orbital_short").innerHTML += " [" + document.querySelector("#z" + iii).innerHTML + "]";
        for (let orbital in orbitals) {
          if((orbital == elements[atomicNumber - 1].period + "s" && orbitals[orbital] != 0)
          || (orbital == elements[atomicNumber - 1].period + "p" && orbitals[orbital] != 0)
          || (orbital == (elements[atomicNumber - 1].period - 1) + "d" && orbitals[orbital] != 0)
          || (orbital == (elements[atomicNumber - 1].period - 2) + "f" && orbitals[orbital] != 0)) {
            document.querySelector("#orbital_short").innerHTML += orbital + "<sup>" + orbitals[orbital] + "</sup>";
          }
        }
        break;
      }
    }
  }
}
