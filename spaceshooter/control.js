function initControls(ship){
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 37: //Left
                ship.pressLeft();
                break;
            case 38: //Up
                ship.pressUp();
                break;
            case 39: //Right
                ship.pressRight();
                break;
            case 40: //Down
                ship.pressDown();
                break;
        }
    };

    document.onkeyup = function (event) {
        switch (event.keyCode){
            case 37: //Left
                ship.releaseLeft();
                break;
            case 38: //Up
                ship.releaseUp();
                break;
            case 39: //Right
                ship.releaseRight();
                break;
            case 40: //Down
                ship.releaseDown();
                break;
        }
    }
}

function initMouse(draw){
    canvas.onmousemove = function (event) {
        draw.mouseMove(Math.floor((event.clientX - topLeftX)/scale), Math.floor((event.clientY - topLeftY)/scale));
    }

    canvas.onclick = function (event) {
        draw.mouseClick(Math.floor((event.clientX - topLeftX)/scale), Math.floor((event.clientY - topLeftY)/scale));
    }
}

