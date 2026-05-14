import { SensorDataItem } from "./SensorDataItem";

export class SensedDataComponent
{
    private data: Readonly<SensorDataItem | null>[];

    constructor(dataSize: number)
    {
        this.data = new Array(dataSize);
    }
}