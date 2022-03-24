let category='Kategoria: warzywo';
let word='ogórek zielony';
word=word.toUpperCase();

let alpha='AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ';

let imgIndex=0;
let guessedCharacters=0;



$(document).ready(function(){
    convertWordToBlankSpace();
    setAlpha();
    checkIfGuessedAll();
});


function convertWordToBlankSpace(){
    let output = word.replace(/\S/g, "_");
    $('#word').html(output);
    $('#category').html(category);

    for (let char of word) 
        if(char===' ') guessedCharacters++;//count blank spaces
}

function setAlpha(){
    let temp='';
    for(let i=0;i<alpha.length;i++){
        temp+="<div id=\"char"+i+"\" class=\"letter\">"+alpha.charAt(i)+"</div>";
        if((i+1)%7===0) temp+="<div style=\"clear: both;\"></div>";//7 characters in a row
    }
    $("#alphabet").html(temp);

    for(let i=0;i<alpha.length;i++)
        $('#char'+i).click(function(){getValue(i);});
    

}

function checkIfGuessedAll(){
    if(guessedCharacters===word.length) {
        let victoryMessage="<div class=\"message\">Gratulacje! &#128512</br> <a class=\"playAgain\" href=\"javascript:window.location.reload(true)\">Zagrać jeszcze raz? </a></div>";
        $("#alphabet").html(victoryMessage);
    }

    setTimeout("checkIfGuessedAll()",100);
}

function changeImage(){
    imgIndex++;
    if(imgIndex>9) {
    imgIndex=10;
    let lossMessage="<div class=\"message\"> <div id=\"loss\"> Przegrana &#128531</br> </div>  Prawidłowe hasło to:</br> "+word+"</br> <a class=\"playAgain\" href=\"javascript:window.location.reload(true)\"> Zagrać jeszcze raz?</div>";
    $('#alphabet').html(lossMessage);
    }

    $('#drawing').css('background-image','url(img/hangman'+imgIndex+'.png)');
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
        if(word.charAt(j)===alpha.charAt(i)){
            let temp=$('#word').html();
            $('#word').html(temp.replaceAt(j,alpha.charAt(i)));
            contains=true;
            guessedCharacters++;
            $('#char'+i).css('color','green');
        }
        
    }
    if(!contains){
     changeImage();
     $('#char'+i).css('color','red');
    }
}

