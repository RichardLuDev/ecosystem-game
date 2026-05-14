import { FoodType } from "../animal/FoodType";
import { SourceType } from "./SourceType";

export class SensorDataItem
{    
    type: SourceType = SourceType.None;
    eats: FoodType | null = null;
    direction: number = 0;
    distance: number = 0;
}