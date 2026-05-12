import * as Phaser from 'phaser';

import GameObjectFactory = Phaser.GameObjects.GameObjectFactory;
import { GameEntity } from '../game-logic/GameEntity';
import { FrontEndGameObject } from './FrontEndGameObject';

class SpriteInfo
{
    constructor(
        public width: number,
        public height: number,
        public fillColor: number)
    {  
    }
}

export class FrontEndGameObjectFactory
{
    private static readonly SPRITES: Record<string, SpriteInfo> =
    {
        carnivore: new SpriteInfo(
            2, 1, 0xDECC9C),
        herbivore: new SpriteInfo(
            2, 1, 0xBA8759),
    }

    constructor(private gameObjectFactory: GameObjectFactory)
    {
    }

    create(gameEntity: GameEntity, scene: Phaser.Scene) : void
    {
        let sprite = FrontEndGameObjectFactory.SPRITES[gameEntity.label];

        let gameObject = new FrontEndGameObject(
            gameEntity,
            scene,
            sprite.width,
            sprite.height,
            sprite.fillColor);

        this.gameObjectFactory.existing(gameObject);
    }
}