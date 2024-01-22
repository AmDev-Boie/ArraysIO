import { Entities } from '../Handlers/EntityManager.js';
import { TankData } from '../Data/TankData.js';

class Player {
    constructor(Name, Position, Type) {
        this.name = Name;

        this.position = Position;
        this.rotation = 0;

        // Unwrap the JSON data :)

        this.health = TankData[Type].health;
        this.size = TankData[Type].size;
        this.barrels = TankData[Type].barrels;

        this.bodyType = TankData[Type].bodyType;
        this.movementSpeed = TankData[Type].movementSpeed;

        Entities.push(this);
    }
}

export { Player };