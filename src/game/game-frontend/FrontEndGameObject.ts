import * as Phaser from 'phaser';
import { GameEntity } from '../game-logic/GameEntity';

export class FrontEndGameObject extends Phaser.GameObjects.Rectangle
{
    private gameEntity : GameEntity;
    
    constructor(
        gameEntity: GameEntity,
        frontEndScene: Phaser.Scene,
        width: number,
        height: number,
        fillColor: number)
    {
        super(
            frontEndScene,
            gameEntity.position?.x ?? 0,
            gameEntity.position?.y ?? 0,
            width,
            height,
            fillColor,
            1);

        this.gameEntity = gameEntity;
    }

    update()
    {
        this.setPosition(
            this.gameEntity.position?.x,
            this.gameEntity.position?.y);
        
        this.setRotation(
            this.gameEntity.position?.rotation);

        if (this.gameEntity.isDestroyed)
            this.destroy();
    }
}