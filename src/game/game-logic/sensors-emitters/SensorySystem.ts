import * as Phaser from 'phaser';

import { Animal } from "../Animal";
import { AnimalType } from "../AnimalType";

export class SensorySystem
{
    update(animals: Animal[], _deltaTimeMs: number)
    {
        animals.forEach((animal: Animal) =>
        {
            this.senseNearestFood(animal, animals);
            this.senseNearestThreat(animal, animals);
        });
    }

    private senseNearestFood(animal: Animal, others: Animal[])
    {
        if (animal.animalType === AnimalType.Carnivore)
        {
            let nearestDistance : number | null = null;
            let nearestDirection : number | null = null;

            others.forEach((other: Animal) =>
            {
                if (other.animalType != AnimalType.Herbivore)
                    return;

                let distance = this.distance(animal, other);
                let direction = this.direction(animal, other);

                if (nearestDistance == null || distance < nearestDistance)
                {
                    nearestDistance = distance;
                    nearestDirection = direction;
                }
            });

            animal.setFoodDirection(nearestDirection);
        }
    }

    private senseNearestThreat(animal: Animal, others: Animal[])
    {
        if (animal.animalType === AnimalType.Herbivore)
        {
            let nearestDistance : number | null = null;
            let nearestDirection : number | null = null;

            others.forEach((other: Animal) =>
            {
                if (other.animalType != AnimalType.Carnivore)
                    return;

                let distance = this.distance(animal, other);
                let direction = this.direction(animal, other);

                if (nearestDistance == null || distance < nearestDistance)
                {
                    nearestDistance = distance;
                    nearestDirection = direction;
                }
            });

            animal.setThreatDirection(nearestDirection);
        }
    }

    private distance(from: Animal, to: Animal) : number
    {
        return Phaser.Math.Distance.Between(
            from.gameObject.x,
            from.gameObject.y,
            to.gameObject.x,
            to.gameObject.y);
    }

    private direction(from: Animal, to: Animal) : number
    {
        return Phaser.Math.Angle.Between(
            from.gameObject.x,
            from.gameObject.y,
            to.gameObject.x,
            to.gameObject.y);
    }
}