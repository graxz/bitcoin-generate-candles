import axios from "axios";

export default class ReadMarketPriceService {
    async execute(): Promise<number> {
        try {
            const result = await axios.get(process.env.PRICES_API!);
            const data = result.data;

            if (data.status) {
                throw new Error(data.status);
            }

            const price = data.bitcoin.usd;
            return price;
        } catch (err) {
            console.error(err);
            throw new Error("Error reading market price");
        }
    }
}
