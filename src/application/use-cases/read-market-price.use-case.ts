import ReadMarketPriceService from "../services/read-market-price.service";

export default class ReadMarketPriceUseCase {
    async execute(): Promise<number> {
        const service = new ReadMarketPriceService();
        const price = await service.execute();
        return price;
    }
}