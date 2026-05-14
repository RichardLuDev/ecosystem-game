import { MathUtils } from "../utils/MathUtils";
import { AnimalType } from "./AnimalType";
import { IEvasionTacticComponent } from "./movement-tactics/IEvasionTacticComponent";
import { IGameObject } from "./engine-abstractions/IGameObject";

export class Animal
{
    readonly animalType: AnimalType;
    readonly gameObject: IGameObject;
    readonly evasionTactic: IEvasionTacticComponent
    readonly runSpeed: number;
    readonly turnSpeed: number;

    threatDirection: number | null;
    foodDirection: number | null;

    constructor(
        animalType: AnimalType,
        gameObject: IGameObject,
        evasionTactic: IEvasionTacticComponent,
        runSpeed: number,
        turnSpeed: number)
    {
        this.animalType = animalType;
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
        let maxRotation = MathUtils.integrate(this.turnSpeed, deltaTimeMs);

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
        let increment = MathUtils.integrate(this.runSpeed, deltaTimeMs);

        this.gameObject.setPosition(
            this.gameObject.x += Math.cos(this.gameObject.rotation) * increment,
            this.gameObject.y += Math.sin(this.gameObject.rotation) * increment);
    }
}