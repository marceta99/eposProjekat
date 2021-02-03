const btn = document.getElementById("btn") ;  
const result = document.getElementById("result") ; 

var audioo = new Audio("pesmarodj.mp3") ; 

function playy(){
    audioo.play() ; 
}
function stopp(){
    audioo.pause() ; 
}


/*prvo SpeechRecongition class*/ 
const SpeechRecognition = window.SpeechRecognition  ||  window.webkitSpeechRecognition;


/*drugo je objekat recogintion klase SpeechEcpgnition */
const recognition = new SpeechRecognition() ; 

recognition.onstart = function (){
    console.log("krenulo je ") ; 
}
 



//pokrece se kada se vrati neki rezultat to jest kada se ocita nesto sto je receno preko mikronfona
recognition.onresult = function (event) {

    console.log(event) ; 
var izgovorenTekst = event.results[0][0].transcript ;
console.log(izgovorenTekst) ; 
result.innerHTML = izgovorenTekst ;

citajTekst(izgovorenTekst) ; 

}


function citajTekst(nekitekst){
    var onoStoHocemoDaSeIzgovori= new SpeechSynthesisUtterance() ; 
    
    console.log(nekitekst) ; 
    

    if(nekitekst.includes("time")){
        let vreme= new Date() ; 
        onoStoHocemoDaSeIzgovori.text=` Now is the ${vreme.getHours()}  hours 
         and ${vreme.getMinutes()}  minutes` ;

         window.speechSynthesis.speak(onoStoHocemoDaSeIzgovori) ; 
    }

    else if(nekitekst.includes("birthday")){
        onoStoHocemoDaSeIzgovori.text="your birthday is       martch    twenty      third   1999" ; 
        window.speechSynthesis.speak(onoStoHocemoDaSeIzgovori) ; 
        playy();     
    }

    


    else if(nekitekst.includes("news")){
        window.open("https://sportklub.rs/") ; 
    }
    else if(nekitekst.includes("YouTube")){
        window.open("https://www.youtube.com/");  
    }else if(nekitekst.includes("master")){
        window.open("https://www.scmaster.rs/");  
    }


   
    else if(nekitekst.includes("stop")){
    stopp() ; 
    }
 
    
    else if(nekitekst.includes("today")){
       onoStoHocemoDaSeIzgovori.text="  O   it is today sory mejt i forgot " ;
       onoStoHocemoDaSeIzgovori.rate=0.5 ; 
       window.speechSynthesis.speak(onoStoHocemoDaSeIzgovori) ; 
       playy() ; 
    }

    
    //////////////MUZIKA////////////////////
    
    else if(nekitekst.includes("music")){
        document.querySelector(".player").style.visibility = "visible" ;
    }else if(nekitekst.includes("finish")){
     document.querySelector(".player").style.visibility = "hidden" ;
    }
    else if(nekitekst.includes("run")){
        togglePlayPause()  ;

    }else if(nekitekst.includes("next")){
        sledecaPesma()  ;

    }else if(nekitekst.includes("before")){
        proslaPesma()  ;

    }else if(nekitekst.includes("up")){
         povecajTon()  ;

    }else if(nekitekst.includes("lower")){
        smanjiTon() ; 
    }else if(nekitekst.includes("Andrea")){
        window.open("https://www.youtube.com/watch?v=J4gLFCIuYXw") ;

    }
     
    //////////GALERIJAAAAAAAAAAAAAAAAAAAa///////////////
    else if(nekitekst.includes("gallery")){
        document.querySelector("section").style.visibility = "visible" ;
    }else if(nekitekst.includes("go")){
     document.querySelector("section").style.visibility = "hidden" ;
    }


    //////////Alarmmmmmmmmmmmmmmmmmmmmmm///////////////
    else if(nekitekst.includes("alarm")){
        document.querySelector(".alarm").style.visibility = "visible" ;
    }else if(nekitekst.includes("not")){
     document.querySelector(".alarm").style.visibility = "hidden" ;
    }



    ///////VREME////////////////////////



    if(nekitekst.includes("weather")){
        document.querySelector(".vreme-container").style.visibility = "visible" ;
        document.querySelector("#gornji").style.visibility = "visible";
        
    }


    else if(nekitekst.includes("no")){
     document.querySelector(".vreme-container").style.visibility = "hidden" ;
     document.querySelector("#gornji").style.visibility = "hidden" ;

    }
    function govorVreme(nekitekstt){

        const pomocnilink = "https://cors-anywhere.herokuapp.com/" ;

        const api = `${pomocnilink}api.openweathermap.org/data/2.5/weather?q=${nekitekstt}&lang=sr&appid=c8eeb2e29ddf36af688562fcfdab6662&` ; 
       
        async function dohvatiAPii(){
            const odgovor = await fetch(api) ;
            const dataa = await odgovor.json() ; 
      
            const {name} = dataa ; 
            const {feels_like} = dataa.main ; 
            const {description,id} = dataa.weather[0] ; 
    
            lokacija.textContent= name ; 
            temperatura.textContent=Math.round(feels_like-273) ; 
            opisVremena.textContent = description ; 
    
            ikona.scr = `http://openweathermap.org/img/wn/${id}@2x.png` ; 
                        
           if(id<232){
            document.body.style.backgroundImage="url('slikeVreme/storm.jpg')"; 
           }else if(id<532){
            document.body.style.backgroundImage="url('slikeVreme/rain.jpg')"; 
           }else if(id<622){
            document.body.style.backgroundImage="url('slikeVreme/snow.jpg')"; 
           }else if(id===800){
            document.body.style.backgroundImage="url('slikeVreme/clear.jpg')"; 
           }else if(id>800){
            document.body.style.backgroundImage="url('slikeVreme/cloudly.jpg')"; 
           }
            console.log(dataa) ; 
       
       

           /* onoStoHocemoDaSeIzgovori.text=`today    weather   in   ${nekitekstt}  is     ${description} and now is         ${Math.round(feels_like-273)} ` ;
            onoStoHocemoDaSeIzgovori.rate=0.5 ; 
            window.speechSynthesis.speak(onoStoHocemoDaSeIzgovori) ;*/




        }dohvatiAPii() ; 
     


    }
    
    govorVreme(nekitekst) ;
    
   
    
    

}
 






///////////////////////////////////////////////////////////////////////////////////////////
/*odavde ide music player*/



let fillbar =document.querySelector(".fill") ; 

let audios = ["pesme/1.mp3","pesme/3.mp3","pesme/2.mp3"] ;
let slike = ["slike/slika1.jpg","slike/slika3.jpg","slike/slika2.jpg"] ; 
let imenaPesama=["I mean it","Evo stizem bebo","Psh Psh Psh"] ; 

let trenutnoVreme= document.querySelector(".time") ; 


//pravim  jedan audio objekat sto je u stvari
//samo html tag audio sa nekim src 

let audio = new Audio() ;  
let indexTrenutnePesme= 0 ; 

//kag god se ucita stranica treba da se pusti pesma automatski

/*window.onload = playSong() ; 

*/function playSong(){
    audio.src= audios[indexTrenutnePesme] ;
    audio.play() ;  
}

function togglePlayPause(){
    let playBtn= document.querySelector(".play-pause") ; 
    if(audio.paused){ //boolean
      
      audio.src= audios[indexTrenutnePesme] ;
      audio.play();

      playBtn.innerHTML=`<i class="fa fa-pause"></i>` ; 
      playBtn.style.paddingLeft= "30px" ;       
    }else  {
      audio.pause() ; 
     
      playBtn.innerHTML = `<i class="fa fa-play"></i>`
      playBtn.style.paddingLeft= "33px" ;
    }
}





//ovde sad fill bar ona linija 


//event timeupdate se opaljuje kada se promeni 
//playing position neke pesme ili snmika 
//ovaj event se obicno koristi sa currentTime property
//ona postavlja ili vraca trenutnu poziciju u sekundama
//od pesme ili snimka koji se pusta

//duration property vraca duzinu audija u sekundama

audio.addEventListener("timeupdate",() =>{
let pozicija=  audio.currentTime / audio.duration ; 
fillbar.style.width = `${pozicija*100}%` ; 


convertTime(Math.round(audio.currentTime)) ; 
//round zaokruzi na najblizi moguci broj jer da nam
//ne bi vracala 5.5 sekundi ili 10.01 ili tako nesto

ukupnoVreme(Math.round(audio.duration)) ; 

//ovo je da se automatski pusti sledeca pesma ako se zavrsila prethonda
if(audio.ended){
    sledecaPesma() ; 
}

}) ; 







function convertTime(seconds){
    //ako npr imamo 120 sekundi to kad podelimo sa 60
    //dobicemo minute i to je 2 minuta
    // a ako ima npr 124 sekunde onda ponovo treba 
    //da kad podelimo sa 60 bude 2 minuta ne 2 zarez
    //nesto i zato koritimo floor koji uvek zaokruzuje
    //na manje npr ako je 2.90 floor ce da zaokrzuzi na2
    //a to nama i treba jer kad ispisujemo minute pa sek
    //nama treba npr drugi minut i onda 50 sekundi 
    // i da ispise 3. minut tek kad predje 60 sek iz 2.
    let min = Math.floor(seconds/60) ; 
    
    //sekunde dobijamo tako sto od ukupnih sek
    //uradio mod od njih npr ako imamo 124 sekunde
    //ukupno nama 124%60 ce dati 4 sec sto nam i treba
    //jer trebamo da ispisemo gore prvo 2 minuta 
    //i onda dole jos 4 sekunde 

    let sec = seconds%60 ; 


    // da bi stavio da budu npr ako je 7 sekundi da ne
    //pise samo 7 nego 07 i sve tako 08 09 sve dok ne 
    //dodje do dvocifrenog 10 koristicu  : ? 
    // znaci ako je manje od 10 dodaj nulu ako je vece onda ostavi isto kako je 

    min = min<10 ? "0"+min: min ;  
    sec = sec<10 ? "0"+sec: sec ; 

    trenutnoVreme.textContent=`${min}:${sec}` ; 
}




//sad ukupno vreme koliko traje pesma pored 

function ukupnoVreme(seconds){

let min= Math.floor(seconds/60) ; 

let sec = seconds%60 ; 

min= min<10? "0"+ min: min ; 
sec= sec<10? "0"+ sec: sec ; 

//moram trenutno vreme plus trenutno vreme da bi 
//mi pisalo i ono vreme od pre to jesto ono vreme
//od trajanja pesme plus ovo ukupno koliko traje pesma

trenutnoVreme.textContent=
 trenutnoVreme.textContent+ " od " + min +":"+ sec ; 


}





 function sledecaPesma(){

    ++indexTrenutnePesme;  
    if(indexTrenutnePesme>2){
        indexTrenutnePesme=0 ; //vrati na prvu pesmu kad prodju 3 jer ih ukupno ima 3 i onda u krug
    }
    
    let slicice=document.querySelector("#slikee") ; 
    slicice.src= slike[indexTrenutnePesme] ;  
    
    let naslovi =document.querySelector(".title h1");  
    naslovi.textContent=imenaPesama[indexTrenutnePesme] ; 

    audio.src= audios[indexTrenutnePesme] ;
    audio.play() ;  
 }




 function proslaPesma(){
  --indexTrenutnePesme ;  
    if(indexTrenutnePesme<0){
      indexTrenutnePesme = 2 ; 
     }

   
  let slicice=document.querySelector("#slikee") ; 
  slicice.src= slike[indexTrenutnePesme] ;  

  let naslovi =document.querySelector(".title h1");  
  naslovi.textContent=imenaPesama[indexTrenutnePesme] ; 

  audio.src= audios[indexTrenutnePesme] ;
  audio.play() ;  


 }




 //sad smanjivanje i pojavavanje tona
// properti volume koja postavlja jacinu zvuka na audiu ili videu
// ili moze da vrati koliko je jak zvuk
//ide od 0.0 do 1.0 i 1 je najjace 
//1 je po defaultu i to je kao 100%
// 0.5 je 50% zvuka 0.4 40% zvuka itd

 function smanjiTon(){
audio.volume-=0.25 ;  //svaki put kad se klikne smanji se za 25%zvuk

 }


 function povecajTon(){
    audio.volume+=0.25
 }

 


 //kad se pritisne zvucnik ikonica da se mutuje zvuk i da se ona pretvori u mute ikonicu

 let mute = document.querySelector(".volume-up") ; 
 mute.addEventListener("click", () =>{

    if(audio.volume>0){ //ako ima nekog zvuka kad pritisnem onda se mutuje
     audio.volume=0 ; 
     document.querySelector(".volume-up i").className = "fa fa-volume-mute" ; // i promeni se ikonica na mute
    }
    else {
        audio.volume= 1 ; //ako nema zvuka onda ga postavlja na max tj 1 
        document.querySelector(".volume-up i").className = "fa fa-volume-up" ; //i promeni se ikonica na zvucnik
    }

 }); 










 /////////////////////////////////////////////////////////////////////////////////////
 //odavde IDE VREMEMEMEMEMEMEMEMME




 let lokacija=document.getElementById("lokacija") ; 
let temperatura = document.getElementById("vrednost-temperature") ; 
let opisVremena=document.getElementById("kako-je-napolju") ; 
let ikona = document.getElementById("ikona-temperature") ; 
let dugmeVreme = document.getElementById("dugme-vreme") ; 
let inputVreme = document.getElementById("jedini-input") ; 
/*
dugmeVreme.onclick = function pozoviVreme(){

    const pomocnilink = "https://cors-anywhere.herokuapp.com/" ;

    const api = `${pomocnilink}api.openweathermap.org/data/2.5/weather?q=${inputVreme.value}&appid=c8eeb2e29ddf36af688562fcfdab6662&lang=sr` ; 

    async function dohvatiAPi(){
        const odgovor = await fetch(api) ;
        const dataa = await odgovor.json() ; 
  
        const {name} = dataa ; 
        const {feels_like} = dataa.main ; 
        const {description,id} = dataa.weather[0] ; 

        lokacija.textContent= name ; 
        temperatura.textContent=Math.round(feels_like-273) ; 
        opisVremena.textContent = description ; 

        ikona.scr = `http://openweathermap.org/img/wn/${id}@2x.png` ; 
                    
       if(id<232){
        document.body.style.backgroundImage="url('slikeVreme/storm.jpg')"; 
       }else if(id<532){
        document.body.style.backgroundImage="url('slikeVreme/rain.jpg')"; 
       }else if(id<622){
        document.body.style.backgroundImage="url('slikeVreme/snow.jpg')"; 
       }else if(id===800){
        document.body.style.backgroundImage="url('slikeVreme/clear.jpg')"; 
       }else if(id>800){
        document.body.style.backgroundImage="url('slikeVreme/cloudly.jpg')"; 
       }
        console.log(dataa) ; 
   
   
    }
    dohvatiAPi(); 




}  */








//odavde GALERIJAAAAAAAAAAAAAAAAA


const apiKey = "563492ad6f917000010000019a6f60d34d8a4246934d3112f9363818" ;
let galleryDiv= document.querySelector(".gallery"); 
let inputNazivSlika = document.querySelector(".input-container input") ; 
let loadMore = document.querySelector(".load-more") ; 

 

 async function dohvatiSlikeIzApi(apiMe) {
   const respone = await fetch(apiMe,{
       //ovde smo morali da stavimo  nas api key  za autorizaciju 
    method: "GET", 
    headers: {
        Accept : "application/json" ,
        Authorization :  apiKey ,   
    } ,
  }) ;  
 
    const data  = await respone.json() ; 
    console.log(data) ; 
    
    ubaciUHtmlSlike(data.photos) ; //ubacujem mu kao parametar
                                   //niz slika koje dobijam
                                   //od pexel apia


}

 
    



function ubaciUHtmlSlike(slikesaapia) {
    slikesaapia.forEach(sliku =>{
        const item = document.createElement("div") ; 
        item.classList.add("item") ;
        item.innerHTML = `
        <a href="#">
                <img src="${sliku.src.medium}"> 
              </a>` ; 
  //svaka slika sa apia ima u src vise razlicitih
  //veliciina i ovde sam stavio da je medium a moze
  //svasta landscape small itd itd   
  

  galleryDiv.appendChild(item);
  
  //appendchild dodaje novo dete na kraj 

  
    }) ; 
        
 
    
}


let x = 1 ; 



let searchIkona = document.querySelector(".input-container i") ; 


searchIkona.onclick = function vratiUneto () {
   
    let onoStoSmoUneli = inputNazivSlika.value ; 
    console.log(onoStoSmoUneli) ; 
    

    
    const apiZaSlike =`https://api.pexels.com/v1/search?query=${onoStoSmoUneli}&page=${x}&per_page=6`;
    dohvatiSlikeIzApi(apiZaSlike) ;
    

}

loadMore.onclick=function kliknutoDaSeUcitaJosSlika() {
 
    x=x+1 ; 
    console.log(x);
    let onoStoSmoUneli = inputNazivSlika.value ; 
    console.log(onoStoSmoUneli) ; 
    

    
    const apiZaSlike =`https://api.pexels.com/v1/search?query=${onoStoSmoUneli}&page=${x}&per_page=6`;
    dohvatiSlikeIzApi(apiZaSlike) ;
    }












////////ODAVDE ALARM ///////////////





var zvukAlarma = new Audio() ; 
zvukAlarma.src = "pesme/4.mp3" ; 


function setAlarm(button){
    var ms = document.getElementById("alarm-time").valueAsNumber ;
   





/*getMilliseconds() */ 



 //ovo vraca u milisekundama ono sto se unese u inputu

if(isNaN(ms)){
    alert("pogresan unos aloooo") ;  
    return ;  
}

//inace java script cuva datume kao milisenunde prosle od januara 1970 godine 
//npr ovo var d = new Date(100000000000); je znaci januar 1970 plus 100000000000ms i to mu je oko 
//3 mart 1973 tako da d dobija tu vrednost kojoj se posle pristupa kao d.getYear ili getMonth ili sta vec 

var alarm = new Date(ms) ;  
var alarmVreme = new Date(alarm.getUTCFullYear(),alarm.getUTCMonth(),alarm.getUTCDate(),alarm.getUTCHours(),alarm.getUTCMinutes(),alarm.getUTCSeconds()) ; 

//sada cu naci razliku u ms izmedju trenutnog vremena I vremena koji smo uneli alarmu u inputu
var razlikaUMs = alarmVreme.getTime() - (new Date()).getTime() ;  

//ako je vreme koje smo uneli  u alarmu manje od trenutnog znaci da je to vreme vec proslo i 
//u tom slucaju nema smisla postavljati alaram i treba izbaciti aler   

if(razlikaUMs<0){
    alert("vreme koji si uneo je vec proslo debilu "); 
    return ;  
}

// znaci pokreni funkciju zvoniAlarm kada prodje vreme koje je razlikaMS  

setTimeout(zvoniAlarm,razlikaUMs) ;  


}



function zvoniAlarm(){
zvukAlarma.play() ; 

//kada se pusti zvuk alarma treba da se pojave opcija stop i odlozi 

document.getElementById("opcijeAlarma").style.visibility = "visible" ; 

}

function stopAlarm(){

 //posto nema funckija koja stopira audio ima samo pause 
//ali mozemo pause pa da vratimo vreme pesme na 0 i to je isto kao stop


   zvukAlarma.pause();
   zvukAlarma.currentTime = 0 ;  
   
   //i kada se pritisne stop treba da nestane stop dugme i odlozi
document.getElementById("opcijeAlarma").style.visibility = "hidden" ; 
   


}

function odlozi(){
//znaci kad se pritisne odlozi treba da se prekine zvukAlarma i treba da 
//da odlozi na 5 minuta
stopAlarm() ;  

setTimeout(zvoniAlarm,36000);   //36000ms je 5 minuta      



}