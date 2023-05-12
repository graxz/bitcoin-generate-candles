import Candle from "../../domain/Candle";
import Period from "../../domain/value-object/Period";
import ChannelService from "../../shared/queue/channel";
import ReadMarketPriceUseCase from "./read-market-price.use-case";

export default class GenerateCandlesUseCase {
    constructor(
        private readMarketPriceUseCase: ReadMarketPriceUseCase,
        private messageChannel: ChannelService
    ) { }

    async execute() {
        const channel = await this.messageChannel.createChannel();

        if (channel) {
            while (true) {
                const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS
                const candle = new Candle("BTC");

                console.log("-------------------------------------------------------");
                console.log("Generating candles...");

                for (let i = 0; i < loopTimes; i++) {
                    const price = await this.readMarketPriceUseCase.execute();
                    candle.addValue(price);
                    console.log(`Candle ${i + 1} of ${loopTimes} generated with price ${price}`);
                    await new Promise(resolve => setTimeout(resolve, Period.FIVE_SECONDS));
                }

                candle.closeCandle();
                console.log("Candle closed!");
                const candleObject = candle.toSimpleObject();
                console.log(candleObject);
                const candleString = JSON.stringify(candleObject);
                channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleString));
                console.log("Candle sent to queue!");
                console.log("-------------------------------------------------------")
            }
        }
    }
}