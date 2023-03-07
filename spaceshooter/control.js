function initControls(ship){
    document.onkeydown = function (event) {
        switch (event.key) {
            case "A":
            case "a":
            case "ArrowLeft": //Left
                ship.pressLeft();
                break;
            case "W":    
            case "w":
            case "ArrowUp": //Up
                ship.pressUp();
                break;
            case "D":    
            case "d":
            case "ArrowRight": //Right
                ship.pressRight();
                break;
            case "S":
            case "s":
            case "ArrowDown": //Down
                ship.pressDown();
                break;
            default:
                console.log(event.key)
        }
    };

    document.onkeyup = function (event) {
        switch (event.key){
            case "A":
            case "a":
            case "ArrowLeft": //Left
                ship.releaseLeft();
                break;
            case "W":
            case "w":
            case "ArrowUp": //Up
                ship.releaseUp();
                break;
            case "D":
            case "d":
            case "ArrowRight": //Right
                ship.releaseRight();
                break;
            case "S":    
            case "s":
            case "ArrowDown": //Down
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

    scanvas.onmousemove = function (event) {
        draw.scoreMouseMove(Math.floor((event.clientX - topLeftXs)/scale), Math.floor((event.clientY - topLeftYs)/scale));
    }

    scanvas.onclick = function (event) {
        draw.scoreMouseClick(Math.floor((event.clientX - topLeftXs)/scale), Math.floor((event.clientY - topLeftYs)/scale));
    }
}

function initFocus(draw){
    window.onblur = function (event){
        draw.tabOut();
    }

    window.onfocus = function (event){
        draw.tabIn();
    }
}

