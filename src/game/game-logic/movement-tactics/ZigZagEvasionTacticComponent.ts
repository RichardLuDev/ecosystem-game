import { MathUtils } from "../../math/MathUtils";
import { IEvasionTacticComponent } from "./IEvasionTacticComponent";

export class ZigZagEvasionTacticComponent implements IEvasionTacticComponent
{
    readonly changeDirectionIntervalMs: number;
    readonly maxDirectionOffset: number;
    
    currentDirectionOffset: number;
    currentDirectionElaspedMs: number;

    constructor(changeDirectionIntervalMs: number, maxDirectionOffset: number)
    {
        this.changeDirectionIntervalMs = changeDirectionIntervalMs;
        this.maxDirectionOffset = maxDirectionOffset;
        this.currentDirectionOffset = 0;
        this.currentDirectionElaspedMs = 0;
    }

    evasionDirection(threatDirection: number, deltaTimeMs: number): number
    {
        this.currentDirectionElaspedMs += deltaTimeMs;

        if (this.currentDirectionElaspedMs >= this.changeDirectionIntervalMs)
        {
            this.currentDirectionOffset = this.getRandomDirection(this.maxDirectionOffset);
            this.currentDirectionElaspedMs = 0;
        }

        return MathUtils.normalizeRadians(threatDirection + Math.PI + this.currentDirectionOffset);
    }
    
    private getRandomDirection(maxDirectionOffset: number ): number
    {
        let minDirectionOffset = -maxDirectionOffset;
        return Math.random() * (maxDirectionOffset - minDirectionOffset) + minDirectionOffset;
    }
}