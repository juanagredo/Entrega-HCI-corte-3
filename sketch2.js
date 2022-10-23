let bolas = [];
let puntaje = 0;
let letras = ["I", "E", "N", "S", "T", "F", "J", "P"];
let vidElement;
let playBtn;
let itsStop;
let screen = 1;
let placeholder;
let dragging = false;
let elVideo;

let buttonImg = [];
let buttonStatus = 0;
let personalidadImagenes = [];
let personalidadesList = [];


//POSICION SILUETA
let ghostX, ghostY, ghostWidth, ghostHeight

//PARAR MOVIMIENTO
let stopMovement = 0;


let tipados = [{
    puntaje: 400,
    personalidad: "INTJ",
  },
  {
    puntaje: 200,
    personalidad: "INTP"
  },
  {
    puntaje: 0,
    personalidad: "ENTJ"
  },
  {
    puntaje: 0,
    personalidad: "ENTP"
  },
  {
    puntaje: 0,
    personalidad: "INFJ"
  },
  {
    puntaje: 0,
    personalidad: "INFP"
  },
  {
    puntaje: 0,
    personalidad: "ENFJ"
  },
  {
    puntaje: 0,
    personalidad: "ENFP"
  },
  {
    puntaje: 0,
    personalidad: "ISTJ"
  },
  {
    puntaje: 0,
    personalidad: "ISFJ"
  },
  {
    puntaje: 0,
    personalidad: "ESTJ"
  },
  {
    puntaje: 0,
    personalidad: "ESFJ"
  },
  {
    puntaje: 0,
    personalidad: "ISTP"
  },
  {
    puntaje: 0,
    personalidad: "ISFP"
  },
  {
    puntaje: 0,
    personalidad: "ESTP"
  },
  {
    puntaje: 0,
    personalidad: "ESFP"
  }
];



function preload() {
  /*

  // para las personalidades

   for (let index = 0; index < 16; index++) {
     personalidadImagenes.push(loadImage('./public/images/imagenaconcretar.jpg'))
  }
  */
  placeholder = loadImage('./public/images/elplaceholder.jpg');
  buttonImg = [loadImage('./public/images/botonplay_1.png'), loadImage('./public/images/botonplay_2.png')]

}



function setup() {
  createCanvas(1920, 1080);

  setupForScreen();

  for (let i = 0; i < 2; i++) {

    personalidadesList.push(new personalidad(undefined, "any", 1600, 300))
  }

  itsStop = true;
//Espacio de colisión: Camilo---------------------------------------------------------
  ghostX = 262;

  ghostY = 922;
  ghostWidth =50;
  ghostHeight = 100;
//------------------------------------------------------------------------------------
}



function draw() {
  background(220);



  switch (screen) {
    case 1:
      image(placeholder, 0, 0);
      image(buttonImg[buttonStatus], (1920 / 2) - 220, 596);
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);


      break;

    case 2:
      
      fill(0);
      text("presiona en el boton para empezar/pausar el video", (1920 / 2) - 125, 790);
      noFill()
      square(ghostX,ghostY,ghostWidth)
      elVideo = vidElement.get();
      image(elVideo, 50, 50);
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
      // console.log(vidElement)

      if(mbtiIsinside(ghostX,ghostY,ghostWidth,ghostWidth)){
        fill(255,0,0)
        square(ghostX,ghostY,ghostWidth)
      }else{
        //noFill()
        //rect(ghostX,ghostY,ghostX,ghostY)
      }



      break;

    case 3:
      fill(0);
      text("presiona en el boton para empezar/pausar el video", (1920 / 2) - 125, 790);
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
      elVideo = vidElement.get();
      image(elVideo, 300, 300);

      // console.log(vidElement)
      break;

  }


  if (screen > 1) {
    for (let i = 0; i < personalidadesList.length; i++) {
      personalidadesList[i].display();


      if (dragging) {

        personalidadesList[i].setPositions(mouseX, mouseY);

      };
    }
  }


  checButton();
}
//---------------Camilo: verificar la colisión----------------------------------------------------------------------------------
function mbtiIsinside(x, y, w, h){
 if(mouseX > 235 && mouseX < 284 && mouseY > 898 && mouseY < 944){
  for (let i = 0; i < personalidadesList.length; i++) {
    /* if (dist(personalidadesList[i].getPosX(), personalidadesList[i].getPosY(), mouseX, mouseY) < 50) {
      dragging = true;
    }
  } */

  
dragging = false;
for (let i = 0; i < tipados.length; i++) {
 puntaje = tipados[0].puntaje
 puntaje = tipados[1].puntaje
console.log(tipados[0].puntaje+tipados[1].puntaje) 
}
console.log(puntaje)





}
  return true; 
 } else {
  return false; 
 }
}
//----------------------------------------------------------------------------------------------------------------------------
function checButton() {

  if (mouseX > (1920 / 2) - 220 && mouseX < (1920 / 2) + 220 && mouseY > 596 && mouseY < 752) {
    buttonStatus = 1;
  } else {
    buttonStatus = 0;
  }


}

function playVideo() {


  if (!itsStop) {
    vidElement.pause();
    itsStop = !itsStop;
    return
  }

  vidElement.play();
  itsStop = !itsStop;
  return
}



function setupForScreen() {


  switch (screen) {
    case 1:

      break;

    case 2:
      square(500,)

      vidElement = createVideo("./public/video/16 personalities as funny out of context movie scenes (MBTI memes) (2).mp4");

      break;

    case 3:
      vidElement.pause();
      //checkNewScreen();
      vidElement = createVideo("./public/video/bigchungus.mp4");

      break;
  }

 
    if (screen > 1) {
     /*  vidElement.position((1920 / 2) - 500, 50);
      vidElement.size(1000);
*/
      playBtn = createButton("reproducir / pausar");
      playBtn.position((1920 / 2) - 50, 720);

      playBtn.mouseClicked(playVideo);
      playBtn.style("border-style", "none");
      playBtn.style("padding", "10px");
      playBtn.style("border-radius", "25px");

    }
}



function checkNewScreen() {

  if (vidElement != undefined) {
    //playBtn.hide();
    itsStop = true;

    vidElement.noLoop();

    vidElement.hide();
    vidElement.loop();




  }
}


function mousePressed() {
  // esto se borra despues de hacer los cambios de pantalla correctamente
 // if (dist(mouseX, mouseY, 0, 0) < 500) {
    if (mouseX > (1920 / 2) - 220 && mouseX < (1920 / 2) + 220 && mouseY > 596 && mouseY < 752) {
    console.log("cambio de pantalla")
    screen += 1;
    if (screen === 4) {
      screen = 1
    }

    //
    setupForScreen();
    checkNewScreen();
    console.log(screen);
  }

  for (let i = 0; i < personalidadesList.length; i++) {
    if (dist(personalidadesList[i].getPosX(), personalidadesList[i].getPosY(), mouseX, mouseY) < 50) {
      dragging = true;
    }
  }
}


function mouseReleased() {
  dragging = false;
}