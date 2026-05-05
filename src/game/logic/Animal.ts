import { IEvasionTactic } from "./evasionTactics/IEvasionTactic";
import { IGameObject } from "./IGameObject";

export class Animal
{
    readonly gameObject: IGameObject;
    readonly evasionTactic: IEvasionTactic
    readonly runSpeed: number;
    readonly turnSpeed: number;

    threatDirection: number | null;
    foodDirection: number | null;

    constructor(
        gameObject: IGameObject,
        evasionTactic: IEvasionTactic,
        runSpeed: number,
        turnSpeed: number)
    {
        this.gameObject = gameObject;
        this.evasionTactic = evasionTactic;
        this.runSpeed = runSpeed;
        this.turnSpeed = turnSpeed;

        this.threatDirection = null;
        this.foodDirection = null;
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
        let runDirection = this.determineRunDirection(deltaTimeMs);
        this.turn(runDirection, deltaTimeMs);
        this.run(deltaTimeMs);
    }

    private determineRunDirection(deltaTimeMs: number): number | null
    {
        let targetDirection: number | null = null;
        if (this.threatDirection != null)
        {
            targetDirection = this.evasionTactic.evasionDirection(this.threatDirection, deltaTimeMs);
        }
        else if (this.foodDirection != null)
        {
            targetDirection = this.foodDirection;
        }

        return targetDirection;
    }

    private turn(desiredDirection: number | null, deltaTimeMs: number)
    {
        if (desiredDirection == null)
            return;

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
}