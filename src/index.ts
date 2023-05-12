import { config } from 'dotenv';
import generateCandlesUseCase from './infra/factory/factory-candles';

config();

class Main {
    async execute() {
        await generateCandlesUseCase.execute();
    }
}

const main = new Main();
main.execute();