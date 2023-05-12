import CandleColor from "./value-object/CandleColor";

export default class Candle {
    low: number;
    high: number;
    open: number;
    close: number;
    color: CandleColor;
    finalDateTime: Date;
    values: number[];
    currency: string;

    constructor(currency: string) {
        this.low = Infinity;
        this.high = 0;
        this.open = 0;
        this.close = 0;
        this.color = CandleColor.UNDETERMINED;
        this.values = [];
        this.currency = currency;
    }

    addValue(value: number) {
        this.values.push(value);

        if (this.values.length === 1) {
            this.open = value;
        }

        if (value > this.high) {
            this.high = value;
        }

        if (value < this.low) {
            this.low = value;
        }
    }

    closeCandle() {
        if (this.values.length > 0) {
            this.close = this.values[this.values.length - 1];
            this.finalDateTime = new Date();
            this.color = this.close > this.open ? CandleColor.GREEN : CandleColor.RED;
        }
    }

    toSimpleObject() {
        const { values, ...rest } = this;

        return rest;
    }
}