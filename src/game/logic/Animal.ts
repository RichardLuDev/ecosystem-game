import { IGameObject } from "./IGameObject";

export class Animal
{
    readonly gameObject: IGameObject;
    readonly runSpeed: number;
    readonly turnSpeed: number;

    threatDirection: number | null;
    foodDirection: number | null;

    evationDirectionOffset: number;

    constructor(
        gameObject: IGameObject,
        runSpeed: number,
        turnSpeed: number)
    {
        this.gameObject = gameObject;
        this.runSpeed = runSpeed;
        this.turnSpeed = turnSpeed;

        this.threatDirection = null;
        this.foodDirection = null;

        this.evationDirectionOffset = 0;
    }

    setThreatDirection(threatDirection: number | null)
    {
        this.threatDirection = threatDirection;
    }

    setFoodDirection(foodDirection: number | null)
    {
        this.foodDirection = foodDirection;
    }

    update(deltaTimeMs: number)
    {
        let targetDirection: number | null = null;
        if (this.threatDirection != null)
        {
            this.evationDirectionOffset += Animal.getIncrement(Animal.toRadians(45), deltaTimeMs);
            targetDirection = Animal.capRadians(this.threatDirection + Math.PI + this.evationDirectionOffset);
        }
        else if (this.foodDirection != null)
        {
            targetDirection = this.foodDirection;
        }

        if (targetDirection != null)
        {
            this.turn(targetDirection, deltaTimeMs);
            this.run(deltaTimeMs);
        }
    }

    private turn(desiredDirection: number, deltaTimeMs: number)
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
    
    private run(deltaTimeMs: number)
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

    private static toRadians(degrees: number) : number
    {
        return degrees * Math.PI / 180;
    }

    private static capRadians(radians: number): number
    {
        const PI = Math.PI;
        return ((radians + PI) % (2 * PI) + 2 * PI) % (2 * PI) - PI;
    }
}