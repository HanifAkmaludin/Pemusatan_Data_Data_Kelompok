const angka = document.querySelector(".inputNumber");
const kolom2 = document.querySelector('.frekuensi');
const check1 = document.querySelector('.jenis1');
const check2 = document.querySelector('.jenis2');
const q1 = document.querySelector(".hasilQ1");
const q2 = document.querySelector(".hasilQ2");
const q3 = document.querySelector(".hasilQ3");
const reset = document.querySelector(".reset");
const tombolHasil = document.querySelector(".tombolHasil");
let cariAngka = /\d+\-\d+|\d+ \- \d+|\d+/g;
const reg = /\d+/g;
let ar;
let number = [];
let tepiBawahTepiAtas = [];
let tepiBawah = [];
let tepiAtas = [];
let frekuensi = [];

function menambahkanArray() {
  while ((ar = cariAngka.exec(angka.value)) != null) {
    number.push((ar[0]));
    console.log(ar[0]);
  }
}

function jenisSoal1(){
  while((ar = reg.exec(angka.value)) != null){
    number.push(parseFloat(ar[0]));
  }
}

function bagiTepibawahTepiAtas(){
  for(let i = 0; i < number.length; i++){
    while((ar = reg.exec(number[i])) != null){
      tepiBawahTepiAtas.push(parseFloat(ar[0]));
    }
  }
}

function bagiTepi(){
  for(let i = 0; i < tepiBawahTepiAtas.length; i++){
    if(i % 2 === 0){
      tepiBawah.push(tepiBawahTepiAtas[i]);
    }else{
      tepiAtas.push(tepiBawahTepiAtas[i]);
    }
  }
}

function mencariFrekuensi(){
  while((ar = reg.exec(kolom2.value)) != null){
    frekuensi.push(parseFloat(ar[0]));
  }
}

function mean1(){
  let xi = [];
  let xifi = [];
  for(let i = 0; i < tepiBawah.length; i++){
    xi.push((tepiBawah[i] + tepiAtas[i]) / 2);
  }
  for(let i = 0; i < frekuensi.length; i++){
    xifi.push(frekuensi[i] * xi[i]);
  }
  let mean = (xifi.reduce((a,b) => a + b)) / (frekuensi.reduce((a,b) => a + b));
  q1.innerHTML = mean;
}

function mean2(){
  let jumlahData = [];
  let mean;
  for(let i = 0; i < frekuensi.length; i++){
    jumlahData.push(number[i] * frekuensi[i]);
  }
  mean = jumlahData.reduce((a,b) => a + b) / frekuensi.reduce((a,b) => a + b);
  q1.innerHTML = mean;
}

function modus1(){
  let mencariLetakModus = [];
  let tb;
  let d1;
  let d2;
  for(let i = 0; i < frekuensi.length; i++){
    mencariLetakModus.push(frekuensi[i]);
  }
  urutan(mencariLetakModus);
  for(let i = 0; i < frekuensi.length; i++){
    if(mencariLetakModus[mencariLetakModus.length - 1] === frekuensi[i]){
      tb = tepiBawah[i] - 0.5;
      d1 = frekuensi[i] - frekuensi[i - 1];
      d2 = frekuensi[i] - frekuensi[i + 1];
    }
  }
  let modus = tb + (d1 / (d1 + d2)) * (tepiBawah[1] - tepiBawah[0]);
  q3.innerHTML = modus;
}

function modus2(){
  urutan(frekuensi);
  let modus = frekuensi[frekuensi.length - 1];
  q3.innerHTML = modus;
}

function check(){
  if(check1.checked === true){
    menambahkanArray();
    bagiTepibawahTepiAtas();
    bagiTepi();
    mencariFrekuensi();
    mean1();
    modus1();
  }else if(check2.checked === true){
    jenisSoal1();
    mencariFrekuensi();
    mean2();
    modus2();
  }
}

function urutan(number) {
  number.sort((a, b) => {
    return a - b;
  });
}


tombolHasil.addEventListener("click", () => {
  check();
});

reset.addEventListener("click", () => {
  number = [];
  tepiBawahTepiAtas = [];
  tepiBawah = [];
  tepiAtas = [];
  frekuensi = [];
  angka.value = "";
  kolom2.value = "";
  q1.innerHTML = "";
  q3.innerHTML = "";
});
