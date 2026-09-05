// =====================================================
// TP #1 - ANIMACIÓN DE SPRITES
// FRANCISCO IDILI 
// 119056/0
// VARIABLES 
// -----------------------------------------------------

let gatoSheet;

// posición del gato
let gatoX = 180;
let gatoY = 350;

// Tamaño del sprite
let spriteW = 90;
let spriteH = 100;

// frame actual del gato
let frameGato = 0;

// estado actual de la animación
let estado = "IDLE";

// tiempo en el que comenzó el estado
let tiempoEstado = 0;

// posición de la luciérnaga
let luzX = 600;
let luzY = 250;

// indice de la trayectoria de la luciérnaga
let puntoLuz = 0;


// -----------------------------------------------------
// ARRAY DE ESTRELLAS
// -----------------------------------------------------

let estrellas = [
  { x: 70,  y: 80,  tam: 3 },
  { x: 150, y: 130, tam: 2 },
  { x: 250, y: 60,  tam: 3 },
  { x: 340, y: 110, tam: 2 },
  { x: 450, y: 70,  tam: 3 },
  { x: 540, y: 130, tam: 2 },
  { x: 650, y: 80,  tam: 3 },
  { x: 740, y: 150, tam: 2 },
  { x: 100, y: 210, tam: 2 },
  { x: 400, y: 180, tam: 3 },
  { x: 700, y: 230, tam: 2 }
];


// -----------------------------------------------------
// ARRAY DE POSICIONES DE LA LUCIÉRNAGA
// -----------------------------------------------------

let recorridoLuz = [
  { x: 600, y: 250 },
  { x: 650, y: 220 },
  { x: 700, y: 270 },
  { x: 630, y: 310 },
  { x: 550, y: 280 },
  { x: 500, y: 240 }
];


// -----------------------------------------------------
// SETUP
// -----------------------------------------------------

function setup() {

  createCanvas(800, 500);

  //  nuestro propio SPRITESHEET
  crearSpriteSheet();

  //contar el tiempo
  tiempoEstado = millis();
}


// -----------------------------------------------------
// DRAW
// -----------------------------------------------------

function draw() {

  dibujarFondo();

  dibujarEstrellas();

  dibujarLuna();

  dibujarSuelo();

  actualizarEstado();

  dibujarLuciernaga();

  dibujarGato();
}


// =====================================================
// FONDO
// =====================================================

function dibujarFondo() {

  background(18, 22, 55);

  // degradado sencillo de cielo
  noStroke();

  fill(25, 30, 70);
  rect(0, 0, width, 300);

  fill(30, 35, 75);
  rect(0, 300, width, 200);
}


// =====================================================
// ESTRELLAS
// =====================================================

function dibujarEstrellas() {

  fill(255, 245, 190);
  noStroke();

  for (let estrella of estrellas) {

    circle(
      estrella.x,
      estrella.y,
      estrella.tam
    );
  }
}


// =====================================================
// LUNA
// =====================================================

function dibujarLuna() {

  fill(255, 240, 180);
  noStroke();

  circle(100, 100, 70);

  // Parte oscura para generar una luna creciente
  fill(18, 22, 55);
  circle(120, 85, 70);
}


// =====================================================
// SUELO
// =====================================================

function dibujarSuelo() {

  noStroke();

  fill(20, 35, 30);
  rect(0, 390, width, 110);

  // Pastitos
  stroke(30, 60, 40);

  for (let x = 0; x < width; x += 15) {

    line(x, 400, x + 4, 390);
    line(x + 5, 400, x + 9, 392);
  }

  noStroke();
}


// =====================================================
// CREAR SPRITESHEET
// =====================================================
//
//construimos un pequeño spritesheet de 4 frames.
// cada frame representa una posición del gato.
//
// Frame 0 = quieto
// Frame 1 = caminando
// Frame 2 = caminando
// Frame 3 = caminando
//
// =====================================================

function crearSpriteSheet() {

  gatoSheet = createGraphics(
    spriteW * 4,
    spriteH
  );

  gatoSheet.noStroke();

  for (let i = 0; i < 4; i++) {

    dibujarSpriteGato(
      gatoSheet,
      i * spriteW,
      0,
      i
    );
  }
}


// =====================================================
// DIBUJAR UN FRAME DEL GATO
// =====================================================

function dibujarSpriteGato(g, x, y, frame) {

  // Color del gato
 g.fill(20, 18, 25);

  // Cuerpo
  g.ellipse(
    x + 40,
    y + 50,
    45,
    35
  );

  // Cabeza
g.fill(25, 22, 30);

  g.ellipse(
    x + 40,
    y + 30,
    42,
    38
  );

  // Orejas
  g.fill(20, 18, 25);
  g.triangle(
    x + 20,
    y + 20,
    x + 25,
    y + 5,
    x + 32,
    y + 22
  );

  g.triangle(
    x + 48,
    y + 22,
    x + 57,
    y + 5,
    x + 60,
    y + 25
  );

  // Ojos
 g.fill(245, 235, 170);

  g.circle(
    x + 33,
    y + 30,
    6
  );

  g.circle(
    x + 48,
    y + 30,
    6
  );

  // Pupilas
  g.fill(0);

  g.circle(
    x + 33,
    y + 30,
    2
  );

  g.circle(
    x + 48,
    y + 30,
    2
  );

// Nariz
g.fill(230, 150, 170);
g.noStroke();

g.triangle(
  x + 37, y + 47,
  x + 43, y + 47,
  x + 40, y + 52
);

// Bigotes
g.stroke(255);
g.strokeWeight(1.5);

// Lado izquierdo
g.line(x + 36, y + 50, x + 15, y + 46);
g.line(x + 36, y + 52, x + 14, y + 52);
g.line(x + 36, y + 54, x + 15, y + 59);

// Lado derecho
g.line(x + 44, y + 50, x + 65, y + 46);
g.line(x + 44, y + 52, x + 66, y + 52);
g.line(x + 44, y + 54, x + 65, y + 59);

g.noStroke();


  // Cola
  g.noFill();
g.stroke(20, 18, 25);
  g.strokeWeight(7);

 g.arc(
  x + 65,
  y + 45,
  35,
  40,
  -HALF_PI,
  HALF_PI
);

g.noStroke();

  // Patas
 g.fill(18, 16, 22);

  if (frame == 0) {

    // Gato quieto
    g.rect(x + 25, y + 60, 10, 15);
    g.rect(x + 50, y + 60, 10, 15);

  } else if (frame == 1) {

    // Paso 1
    g.rect(x + 20, y + 60, 10, 18);
    g.rect(x + 52, y + 57, 10, 18);

  } else if (frame == 2) {

    // Paso 2
    g.rect(x + 25, y + 57, 10, 20);
    g.rect(x + 48, y + 62, 10, 15);

  } else {

    // Paso 3
    g.rect(x + 20, y + 58, 10, 17);
    g.rect(x + 53, y + 60, 10, 18);
  }
}


// =====================================================
// DIBUJAR GATO DESDE EL SPRITESHEET
// =====================================================

function dibujarGato() {

  // Cambiamos de frame cada 150 milisegundos
  if (estado == "WALK") {

    frameGato = floor(
      millis() / 150
    ) % 4;

  } else {

    frameGato = 0;
  }


  // Dibujamos solamente un frame del spritesheet
  image(
    gatoSheet,

    gatoX - spriteW / 2,
    gatoY - spriteH / 2,

    spriteW,
    spriteH,

    frameGato * spriteW,
    0,
    spriteW,
    spriteH
  );
}


// =====================================================
// LUCIÉRNAGA
// =====================================================

function dibujarLuciernaga() {

  // No aparece durante el primer estado
  if (estado == "IDLE") {
    return;
  }

  // Brillo
  noStroke();

  fill(
    255,
    240,
    100,
    20
  );

  circle(luzX, luzY, 25);

  fill(
    255,
    240,
    120
  );

  circle(luzX, luzY, 8);

  // Pequeñas partículas
  fill(255, 245, 160);

  circle(luzX + 12, luzY - 10, 3);
  circle(luzX - 10, luzY + 12, 2);
}


// =====================================================
// ACTUALIZAR ESTADOS
// =====================================================

function actualizarEstado() {

  let tiempoTranscurrido =
    millis() - tiempoEstado;


  // ---------------------------------------------
  // ESTADO 1: GATO QUIETO
  // ---------------------------------------------

  if (estado == "IDLE") {

    // Después de 3 segundos aparece la luz
    if (tiempoTranscurrido > 3000) {

      cambiarEstado("FIREFLY");
    }
  }


  // ---------------------------------------------
  // ESTADO 2: APARECE LA LUCIÉRNAGA
  // ---------------------------------------------

  else if (estado == "FIREFLY") {

    // Movemos la luciérnaga
    moverLuciernaga();

    // Después de 2 segundos empieza a caminar
    if (tiempoTranscurrido > 2000) {

      cambiarEstado("WALK");
    }
  }


  // ---------------------------------------------
  // ESTADO 3: EL GATO CAMINA
  // ---------------------------------------------

  else if (estado == "WALK") {

    moverGato();

    moverLuciernaga();

    // Cuando el gato llega cerca
    if (dist(gatoX, gatoY, luzX, luzY) < 70) {

      cambiarEstado("MEET");
    }
  }


  // ---------------------------------------------
  // ESTADO 4: ENCUENTRO
  // ---------------------------------------------

  else if (estado == "MEET") {

    // El gato queda quieto
    // mirando la luz

    if (tiempoTranscurrido > 2500) {

      cambiarEstado("IDLE");
    }
  }
}


// =====================================================
// CAMBIAR DE ESTADO
// =====================================================

function cambiarEstado(nuevoEstado) {

  estado = nuevoEstado;

  // Reiniciamos el contador de tiempo
  tiempoEstado = millis();
}


// =====================================================
// MOVER GATO
// =====================================================

function moverGato() {

  // El gato se acerca lentamente
  if (gatoX < luzX - 50) {

    gatoX += 1.5;
  }
}


// =====================================================
// MOVER LUCIÉRNAGA
// =====================================================

function moverLuciernaga() {

  // Tomamos el punto actual del array
  let objetivo =
    recorridoLuz[puntoLuz];

  // Movemos X
  luzX = lerp(
    luzX,
    objetivo.x,
    0.02
  );

  // Movemos Y
  luzY = lerp(
    luzY,
    objetivo.y,
    0.02
  );


  // Si llegamos cerca del objetivo,
  // pasamos al siguiente punto

  if (
    dist(
      luzX,
      luzY,
      objetivo.x,
      objetivo.y
    ) < 5
  ) {

    puntoLuz++;

    if (
      puntoLuz >= recorridoLuz.length
    ) {

      puntoLuz = 0;
    }
  }
}
