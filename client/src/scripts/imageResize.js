//var canvas = document.getElementById("canvas");
export function resize(canvas, src, onDone) {
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
        // set size proportional to image
        canvas.height = canvas.width * (img.height / img.width);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        onDone(canvas.toDataURL("image/jpeg",0.6));
    }

    img.src = src;
}