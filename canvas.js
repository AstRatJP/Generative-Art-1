const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let x1 = 10;
let y1 = canvas.height / 2 - 500;
let x2 = 10;
let y2 = canvas.height / 2 + 500;
let phase = 0;
let width1 = undefined;
let height1 = undefined;
let width2 = undefined;
let height2 = undefined;

const UPDATE_LOAD_COEFF = 0.5;
let targetInterval = 1000 / 180;
let prevTime = Date.now() - targetInterval;

let now = undefined;


function update() {
    phase += 1;

    // width1 = 70 + Math.sin(phase / 253) * 800;
    // height1 = 40 + Math.cos(phase / 624) * 500;
    // x1 = centerX + Math.sin(phase / 843 * now) * width1;
    // y1 = centerY + Math.cos(phase / 224) * height1;

    // x2 = centerX + Math.sin(phase / 448) * width1;
    // y2 = centerY + Math.cos(phase / 342*now) * height1;


    // width2 = 50 + Math.cos(phase / 542) * 800;
    // height2 = 30 + Math.sin(phase / 732) * 500;
    // x3 = centerX + Math.cos(phase / 251) * width2;
    // y3 = centerY + Math.sin(phase / 362*now) * height2;

    // x4 = centerX + Math.cos(phase / 665*now) * width2;
    // y4 = centerY + Math.sin(phase / 552) * height2;

    width1 = 50 + Math.sin(phase / 487) * 800;
    height1 = 30 + Math.cos(phase / 341) * 500;
    x1 = centerX + Math.sin(phase / 493 * now) * width1;
    y1 = centerY + Math.cos(phase / 651) * height1;

    x2 = centerX + Math.sin(phase / 415) * width1;
    y2 = centerY + Math.cos(phase / 447 * now) * height1;


    // width2 = 50 + Math.sin(phase / 487) * 800;
    // height2 = 30 + Math.cos(phase / 341) * 500;
    // x3 = centerX + Math.sin(phase / 487 * now) * width2;
    // y3 = centerY + Math.cos(phase / 641) * height2;

    // x4 = centerX + Math.sin(phase / 405) * width2;
    // y4 = centerY + Math.cos(phase / 437 * now) * height2;
}

function draw() {
    ctx.globalAlpha = 0.1;
    ctx.globalCompositeOperation = "lighter";

    let lineargradient = ctx.createLinearGradient(x1, y1, x2, y2);
    lineargradient.addColorStop(0, "#326325");
    lineargradient.addColorStop(1, "#672245");

    ctx.lineWidth = 1;

    ctx.strokeStyle = lineargradient;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX * 2 - x1, centerY * 2 - y1);
    ctx.lineTo(centerX * 2 - x2, centerY * 2 - y2);
    ctx.stroke();
}


window.onresize = function () {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}


function mainloop() {
    let currentTime = Date.now();
    while (currentTime - prevTime > targetInterval * 0.5) {

        now = Math.sin((Date.now()) / 20000);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x1 = 10;
        y1 = canvas.height / 2 - 500;
        x2 = 10;
        y2 = canvas.height / 2 + 500;
        phase = 0;
        width1 = undefined;
        height1 = undefined;
        width2 = undefined;
        height2 = undefined;
        for (let i = 0; i < 5000; i++) {
            update();
            draw();
        }

        prevTime += targetInterval;
        now = Date.now();
        const updateTime = now - currentTime;
        if (updateTime > targetInterval * UPDATE_LOAD_COEFF) {
            if (prevTime < now - targetInterval) {
                prevTime = now - targetInterval;
            }
            break;
        }
    }
    requestAnimationFrame(mainloop);
}

mainloop();