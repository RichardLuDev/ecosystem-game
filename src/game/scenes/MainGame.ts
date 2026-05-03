import * as Phaser from 'phaser';

import Scene = Phaser.Scene
import Grid = Phaser.GameObjects.Grid;
import Rectangle = Phaser.GameObjects.Rectangle;

export class MainGame extends Scene
{
    static readonly CAMERA_ZOOM : number = 10;
    static readonly ANIMAL_SIZE : number = 1;

    static readonly CARNIVORE_LINEAR_SPEED : number = 5;
    static readonly CARNIVORE_ANGULAR_SPEED : number = 1;

    static readonly HERBIVORE_LINEAR_SPEED : number = 4;
    static readonly HERBIVORE_ANGULAR_SPEED : number = 10;

    grid : Grid;

    carnivore : Rectangle;

    herbivore : Rectangle;
    herbivoreZigZag : number;

    constructor()
    {
        super('MainGame');
    }

    create()
    {
        this.cameras.main.setZoom(MainGame.CAMERA_ZOOM, MainGame.CAMERA_ZOOM)
        this.cameras.main.centerOn(0, 0);
        this.cameras.main.setBackgroundColor(0x136d15);

        this.grid = this.add.grid(0, 0, 10000, 10000, 10, 10);
        this.grid.setStrokeStyle(0.05);

        this.carnivore = this.add.rectangle(
            0,
            -10,
            MainGame.ANIMAL_SIZE * 2,
            MainGame.ANIMAL_SIZE,
            0xDECC9C);

        this.carnivore.setRotation(this.toRadians(90));

        this.herbivore = this.add.rectangle(
            0,
            10,
            MainGame.ANIMAL_SIZE * 2,
            MainGame.ANIMAL_SIZE,
            0xBA8759);
        
        this.herbivore.setRotation(this.toRadians(90));
        this.herbivoreZigZag = 0;

        this.cameras.main.startFollow(this.carnivore);
    };

    update(_time: number, deltaTimeMs: number)
    {
        let carnToHerbRelativeDirection = Phaser.Math.Angle.BetweenPoints(
            this.carnivore.getCenter(),
            this.herbivore.getCenter());

        this.herbivoreZigZag += this.getIncrement(this.toRadians(45), deltaTimeMs);
        let herbDesiredDirection = carnToHerbRelativeDirection + Math.sin(this.herbivoreZigZag);

        this.changeDirection(
            this.herbivore,
            herbDesiredDirection,
            MainGame.HERBIVORE_ANGULAR_SPEED,
            deltaTimeMs);

        this.move(
            this.herbivore,
            MainGame.HERBIVORE_LINEAR_SPEED,
            deltaTimeMs);
        
        this.changeDirection(
            this.carnivore,
            carnToHerbRelativeDirection,
            MainGame.CARNIVORE_ANGULAR_SPEED,
            deltaTimeMs);

        this.move(
            this.carnivore,
            MainGame.CARNIVORE_LINEAR_SPEED,
            deltaTimeMs);
    }

    changeDirection(
        animal: Rectangle,
        desiredDirection: number,
        angularSpeed: number,
        deltaTimeMs: number)
    {
        let deltaAngle = desiredDirection - animal.rotation;
        let maxRotation = this.getIncrement(angularSpeed, deltaTimeMs);

        if (Math.abs(deltaAngle) <= maxRotation)
        {
            animal.setRotation(desiredDirection);
        }
        else
        {
            animal.setRotation(animal.rotation + Math.sign(deltaAngle) * maxRotation);
        }
    }

    move(
        animal: Rectangle,
        speed: number,
        deltaTimeMs: number)
    {
        let increment = this.getIncrement(speed, deltaTimeMs)

        console.log(`movement increment: ${increment}`);

        animal.setPosition(
            animal.x += Math.cos(animal.rotation) * increment,
            animal.y += Math.sin(animal.rotation) * increment);
    }

    getIncrement(velocity: number, deltaTimeMs: number) : number
    {
        return velocity * deltaTimeMs / 1000;
    }

    toRadians(degrees: number) : number
    {
        return degrees * Math.PI / 180;
    }
}