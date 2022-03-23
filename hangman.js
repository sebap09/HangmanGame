let category='Kategoria: warzywo';
let word='ogórek zielony';
word=word.toUpperCase();

let alpha=new Array(35);
alpha[0]='A';alpha[1]='Ą';alpha[2]='B';alpha[3]='C';alpha[4]='Ć';alpha[5]='D';alpha[6]='E';
alpha[7]='Ę';alpha[8]='F';alpha[9]='G';alpha[10]='H';alpha[11]='I';alpha[12]='J';alpha[13]='K';
alpha[14]='L';alpha[15]='Ł';alpha[16]='M';alpha[17]='N';alpha[18]='Ń';alpha[19]='O';alpha[20]='Ó';
alpha[21]='P';alpha[22]='Q';alpha[23]='R';alpha[24]='S';alpha[25]='Ś';alpha[26]='T';alpha[27]='U';
alpha[28]='V';alpha[29]='W';alpha[30]='X';alpha[31]='Y';alpha[32]='Z';alpha[33]='Ż';alpha[34]='Ź';

let imgIndex=0;
let guessedCharacters=0;

window.onload=onloadFunctions;

function onloadFunctions(){
    convertWordToBlankSpace();
    loadImage();
    setAlpha();
    checkIfGuessedAll();
}

function convertWordToBlankSpace(){
    let output = word.replace(/\S/g, "_");
    document.getElementById("word").innerHTML=output;
    document.getElementById("category").innerHTML=category;

    for (let char of word) 
        if(char===' ') guessedCharacters++;//count blank spaces
}

function loadImage(){
    document.getElementById("drawing").innerHTML="<img src=\"img/hangman0.png\" alt=\"\" width=\"640\" height=\"600\">";
}

function setAlpha(){
    let temp='';
    for(let i=0;i<alpha.length;i++){
        temp+="<div id=\"char"+i+"\" class=\"letter\"onclick=\"getValue("+i+")\" tabindex=\"1\">"+alpha[i]+"</div>";
        if((i+1)%7===0) temp+="<div style=\"clear: both;\"></div>";//7 characters in a row
    }
    document.getElementById("alphabet").innerHTML=temp;
}

function checkIfGuessedAll(){
    if(guessedCharacters===word.length) {
        let victoryMessage="<div class=\"message\">Gratulacje! &#128512</br> <a class=\"playAgain\" href=\"javascript:window.location.reload(true)\">Zagrać jeszcze raz? </a></div>";
        document.getElementById("alphabet").innerHTML=victoryMessage;
    }

    setTimeout("checkIfGuessedAll()",100);
}

function changeImage(){
    imgIndex++;
    if(imgIndex>9) {
    imgIndex=10;
    let lossMessage="<div class=\"message\"> <div id=\"loss\"> Przegrana &#128531</br> </div>  Prawidłowe hasło to:</br> "+word+"</br> <a class=\"playAgain\" href=\"javascript:window.location.reload(true)\"> Zagrać jeszcze raz?</div>";
    document.getElementById("alphabet").innerHTML=lossMessage;
    }

    let filePath="<img src=\"img/hangman"+imgIndex+".png\" alt=\"\" width=\"640\" height=\"600\">";
    document.getElementById("drawing").innerHTML=filePath;
}


String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length||index===-1) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement + this.substring(index + 1);
}

function getValue(i){
    let contains=false;
    for(let j=0;j<word.length;j++){
        if(word.charAt(j)===alpha[i]){
            let temp=document.getElementById("word").innerHTML;
            document.getElementById("word").innerHTML=temp.replaceAt(j,alpha[i]);
            contains=true;
            guessedCharacters++;
            document.getElementById("char"+i).style.color="green";
        }
        
    }
    if(!contains){
     changeImage();
     document.getElementById("char"+i).style.color="red";
    }
}

