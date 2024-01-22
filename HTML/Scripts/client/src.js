// Imports

import { TestSquare, DrawScreen } from './Modules/Draw2D.js';
import { Player } from './Classes/Player.js';
import { state, initiateListeners } from './Handlers/InputManager.js';
import { Bullet } from './Classes/Bullet.js';
import { Entities } from '../Handlers/EntityManager.js';

// constants

const canvas = document.getElementById("game-canvas");

var CameraPosition = [0,0];

// Actual shit

const LocalPlayer = new Player("Player", [0,0], "Basic");

function update(deltatime) {
    // LocalPlayer.position[0] += 100 * deltatime

    if(state.pressedKeys.right) {
        LocalPlayer.position[0] += LocalPlayer.movementSpeed * deltatime;
        CameraPosition[0] += LocalPlayer.movementSpeed * deltatime;
    }

    if(state.pressedKeys.left) {
        LocalPlayer.position[0] -= LocalPlayer.movementSpeed * deltatime;
        CameraPosition[0] -= LocalPlayer.movementSpeed * deltatime;
    }

    if(state.pressedKeys.up) {
        LocalPlayer.position[1] -= LocalPlayer.movementSpeed * deltatime;
        CameraPosition[1] -= LocalPlayer.movementSpeed * deltatime;
    }

    if(state.pressedKeys.down) {
        LocalPlayer.position[1] += LocalPlayer.movementSpeed * deltatime;
        CameraPosition[1] += LocalPlayer.movementSpeed * deltatime;
    }

    LocalPlayer.rotation = Math.atan2((state.mousePosition[0] - (canvas.getAttribute("width")/2)), (state.mousePosition[1] - (canvas.getAttribute("height")/2)));

    for(let i=0; i < Entities.length; i++) {
        if(Entities[i] instanceof Bullet) {
            const bullet = Entities[i];

            
        }
    }
}

function loop(timestamp) {
    var timeBetweenFrames = (timestamp - lastRender)
    var deltatime = timeBetweenFrames/1000

    if(timeBetweenFrames >= 1) {
        update(deltatime)
        DrawScreen(CameraPosition, 0.5);
  
        lastRender = timestamp
        window.requestAnimationFrame(loop)
    }

    window.requestAnimationFrame(loop)
}

var lastRender = 0

window.addEventListener("click", function(event) {
    new Bullet([LocalPlayer.position[0],LocalPlayer.position[1]], [5 * Math.sin(LocalPlayer.rotation * 180/Math.PI),5 * Math.cos(LocalPlayer.rotation * 180/Math.PI)], "Standard", LocalPlayer);
});

initiateListeners();
window.requestAnimationFrame(loop)