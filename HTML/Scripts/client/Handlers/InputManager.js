var state = {
    mousePosition:[0,0],

    pressedKeys: {
      left: false,
      right: false,
      up: false,
      down: false
    }
}

var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down'
}

const initiateListeners = () => {
    function keydown(event) {
        var key = keyMap[event.keyCode];
        state.pressedKeys[key] = true;
    }
      
    function keyup(event) {
        var key = keyMap[event.keyCode];
        state.pressedKeys[key] = false;
    }
        
    window.addEventListener("keydown", keydown, false)
    window.addEventListener("keyup", keyup, false)

    onmousemove = function(e) {
        state.mousePosition[0] = e.x;
        state.mousePosition[1] = e.y;
    }
}

export { state, initiateListeners };