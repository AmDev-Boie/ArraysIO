// Imports

import { Player } from '../Classes/Player.js';
import { Entities } from '../Handlers/EntityManager.js';

// Constants

const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

// real shit

const TestSquare = () => {
    context.fillStyle = "#FF0000";
    context.fillRect(0, 0, 150, 75);
}

const drawGrid = (cameraPosition, cameraZoom) => {
    var gridSize = 50 * cameraZoom;
    var width = 100000;
    var height = 100000;
    var x = -canvas.width - cameraPosition[0];
    var y = -canvas.height - cameraPosition[1];

    context.beginPath();
    for(var i = 0; i * gridSize < height; i++) {
        if(i%10 == 0) {
            context.lineWidth = 3;
        } else {
            context.lineWidth = 1;
        }

        context.moveTo(x, i * gridSize + y);
        context.lineTo(x + width, i * gridSize + y);
    }

    for(var i = 0; i * gridSize < width; i++) {
        context.moveTo(i * gridSize + x,  y);
        context.lineTo(i * gridSize + x, y + height);
    }
    context.stroke();
}

const DrawScreen = (cameraPosition, cameraZoom) => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(let i=0; i < Entities.length; i++) {
        let entity = Entities[i];

        if(entity instanceof Player) {

            var offsetX = (entity.position[0] + (canvas.getAttribute("width")/2) - cameraPosition[0]);
            var offsetY = (entity.position[1] + (canvas.getAttribute("height")/2) - cameraPosition[1]);

            // draw underlaying grid over everything else
            
            context.strokeStyle = "#a8a8a8";
            drawGrid(cameraPosition, cameraZoom);

            // Draw Barrel under body (duh)

            for(let i2=0; i2 < entity.barrels.length; i2++) {
                context.save();
                var barrel = entity.barrels[i2];
                var barrelOffsetX = (offsetX + (Math.sin(entity.rotation) * entity.size));
                var barrelOffsetY = (offsetY + (Math.cos(entity.rotation) * entity.size));

                context.translate(offsetX, offsetY);
                context.rotate(-entity.rotation);

                context.beginPath();
                context.rect(0 - (barrel.width*cameraZoom/2), 0, (barrel.width*cameraZoom), (barrel.length*cameraZoom));
                context.fillStyle = "#9e9e9e";
                context.fill();
                context.lineWidth = 5;
                context.strokeStyle = "#6b6b6b";
                context.stroke();
                context.restore();
            }

            // draw body

            switch(entity.bodyType) {
                case "circle":
                    context.beginPath();
                    context.arc(offsetX, offsetY, (entity.size*cameraZoom), 0, 2 * Math.PI, false);
                    context.fillStyle = '#46b1eb';
                    context.fill();
                    context.lineWidth = 5;
                    context.strokeStyle = '#315d75';
                    context.stroke();
                    break;
                default:
                    context.beginPath();
                    context.arc(offsetX, offsetY, (entity.size*cameraZoom), 0, 2 * Math.PI, false);
                    context.fillStyle = '#46b1eb';
                    context.fill();
                    context.lineWidth = 5;
                    context.strokeStyle = '#315d75';
                    context.stroke();
                    break;
            }
        }
    }
}

export { TestSquare, DrawScreen };