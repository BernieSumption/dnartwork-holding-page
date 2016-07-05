if ("ontouchstart" in document) {
    document.getElementById("interaction-method").textContent = "touch";
}
var photo = document.getElementById("product-photo");
var magnifier = document.getElementById("product-photo-magnifier");
photo.addEventListener("mouseover", function (e) { return showMagnifier(e, e); });
document.body.addEventListener("mousemove", function (e) { return moveMagnifier(e, e); });
photo.addEventListener("mouseout", function (e) { return hideMagnifier(e); });
photo.addEventListener("touchstart", function (e) { return showMagnifier(e.changedTouches[0], e, e.changedTouches[0].identifier); });
document.body.addEventListener("touchmove", function (e) {
    for (var i = 0; i < e.changedTouches.length; i++) {
        moveMagnifier(e.changedTouches[i], e, e.changedTouches[i].identifier);
    }
});
document.body.addEventListener("touchend", function (e) {
    for (var i = 0; i < e.changedTouches.length; i++) {
        hideMagnifier(e, e.changedTouches[i].identifier);
    }
});
var BIG_HEIGHT = 1333;
var BIG_WIDTH = 2000;
var currentId = null;
var prevId = null;
var prevIdTime;
function showMagnifier(coords, e, id) {
    if (id === void 0) { id = -1; }
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
function moveMagnifier(coords, e, id) {
    if (id === void 0) { id = -1; }
    if (currentId !== null) {
        if (currentId !== id)
            return;
    }
    else {
        if (prevId !== id || Date.now() - prevIdTime > 250)
            return;
    }
    e.preventDefault();
    if (currentId === id || (currentId === null && prevId === id)) {
        var photoPos = photo.getBoundingClientRect();
        var magCentreX = 150 - ((coords.clientX - photoPos.left) / photoPos.width * BIG_WIDTH);
        var magCentreY = 150 - ((coords.clientY - photoPos.top) / photoPos.height * BIG_HEIGHT);
        magnifier.style.left = coords.clientX + "px";
        magnifier.style.top = coords.clientY + "px";
        magnifier.style.backgroundPositionX = magCentreX + "px";
        magnifier.style.backgroundPositionY = magCentreY + "px";
    }
}
function hideMagnifier(e, id) {
    if (id === void 0) { id = -1; }
    if (currentId === id) {
        e.preventDefault();
        prevId = currentId;
        prevIdTime = Date.now();
        currentId = null;
        magnifier.className = "";
    }
}
