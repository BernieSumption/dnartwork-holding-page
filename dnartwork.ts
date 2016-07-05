
if ("ontouchstart" in document) {
  document.getElementById("interaction-method").textContent = "touch";
}

let photo = document.getElementById("product-photo") as HTMLImageElement;
let magnifier = document.getElementById("product-photo-magnifier");

photo.addEventListener("mouseover", e => showMagnifier(e, e));
document.body.addEventListener("mousemove", e => moveMagnifier(e, e));
photo.addEventListener("mouseout", e => hideMagnifier(e));

photo.addEventListener("touchstart", e => showMagnifier(e.changedTouches[0], e, e.changedTouches[0].identifier));
document.body.addEventListener("touchmove", e => {
  for (let i = 0; i < e.changedTouches.length; i++) {
    moveMagnifier(e.changedTouches[i], e, e.changedTouches[i].identifier);
  }
});
document.body.addEventListener("touchend", e => {
  for (let i = 0; i < e.changedTouches.length; i++) {
    hideMagnifier(e, e.changedTouches[i].identifier);
  }
});

const BIG_HEIGHT = 1333;
const BIG_WIDTH = 2000;
let currentId: number = null;
let prevId: number = null;
let prevIdTime: number;

function showMagnifier(coords: ClientCoords, e: Event, id: number = -1) {
  if (currentId === null) {
    e.preventDefault();
    currentId = id;
    magnifier.className = "is-visible";
    moveMagnifier(coords, e, id);
  }
  if (document.location.search === "?testErrorReporting") {
    throw new Error("Testing error reporting");
  }
}

function moveMagnifier(coords: ClientCoords, e: Event, id: number = -1) {
  if (currentId !== null) {
    if (currentId !== id) return;
  } else {
    if (prevId !== id || Date.now() - prevIdTime > 250) return;
  }
  e.preventDefault();
  if (currentId === id || (currentId === null && prevId === id)) {
    let photoPos = photo.getBoundingClientRect();

    let magCentreX = 150 - ((coords.clientX - photoPos.left) / photoPos.width * BIG_WIDTH);
    let magCentreY = 150 - ((coords.clientY - photoPos.top) / photoPos.height * BIG_HEIGHT);

    magnifier.style.left = `${coords.clientX}px`;
    magnifier.style.top = `${coords.clientY}px`;
    magnifier.style.backgroundPositionX = `${magCentreX}px`;
    magnifier.style.backgroundPositionY = `${magCentreY}px`;
  }
}

function hideMagnifier(e: Event, id: number = -1) {
  if (currentId === id) {
    e.preventDefault();
    prevId = currentId;
    prevIdTime = Date.now();
    currentId = null;
    magnifier.className = "";
  }
}

interface ClientCoords {
  clientX: number;
  clientY: number;
}