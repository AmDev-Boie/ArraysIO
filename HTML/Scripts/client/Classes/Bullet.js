import { Entities } from '../Handlers/EntityManager.js';
import { TankData } from '../Data/TankData.js';

class Bullet {
    constructor(Position, Velocity, Type, WhoShot) {
        this.Position = Position;

        this.Velocity = Velocity;

        this.Type = Type;

        this.WhoShot = WhoShot;

        Entities.push(this);
    }
}

export { Bullet };