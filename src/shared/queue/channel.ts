import { config } from "dotenv";
import { Channel, connect, Connection } from "amqplib";

config();

export default class ChannelService {
    private connection: Connection;
    private channel: Channel;

    async createChannel(): Promise<Channel> {
        try {
            this.connection = await connect(process.env.AMQP_SERVER);
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(process.env.QUEUE_NAME, { durable: true });
            console.log('Connected to RabbitMQ')

            return this.channel;
        } catch (err) {
            console.log('Error while trying to connect to RabbitMQ')
            console.log(err);
            return null
        }
    }
}