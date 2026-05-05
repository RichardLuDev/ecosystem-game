import { IGameObject } from "./IGameObject";

export class Animal
{
    readonly gameObject: IGameObject;
    readonly runSpeed: number;
    readonly turnSpeed: number;

    constructor(
        gameObject: IGameObject,
        runSpeed: number,
        turnSpeed: number)
    {
        this.gameObject = gameObject;
        this.runSpeed = runSpeed;
        this.turnSpeed = turnSpeed;
    }

    turn(desiredDirection: number, deltaTimeMs: number)
    {
        let deltaAngle = desiredDirection - this.gameObject.rotation;
        let maxRotation = Animal.getIncrement(this.turnSpeed, deltaTimeMs);

        if (Math.abs(deltaAngle) <= maxRotation)
        {
            this.gameObject.setRotation(desiredDirection);
        }
        else
        {
            this.gameObject.setRotation(this.gameObject.rotation + Math.sign(deltaAngle) * maxRotation);
        }
    }
    
    run(deltaTimeMs: number)
    {
        let increment = Animal.getIncrement(this.runSpeed, deltaTimeMs);

        this.gameObject.setPosition(
            this.gameObject.x += Math.cos(this.gameObject.rotation) * increment,
            this.gameObject.y += Math.sin(this.gameObject.rotation) * increment);
    }

    private static getIncrement(velocity: number, deltaTimeMs: number) : number
    {
        return velocity * deltaTimeMs / 1000;
    }
}