import ReadMarketPriceService from "../../application/services/read-market-price.service";
import GenerateCandlesUseCase from "../../application/use-cases/generate-candles.use-case";
import ChannelService from "../../shared/queue/channel";

const readMarketPriceService = new ReadMarketPriceService();
const messageChannel = new ChannelService();
const generateCandlesUseCase = new GenerateCandlesUseCase(readMarketPriceService, messageChannel)

export default generateCandlesUseCase;