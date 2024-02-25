import { Module } from '@nestjs/common';
import { TransactionHistoryService } from './services/history.service';
import { TransactionHistoryController } from './controllers/transaction.controller'
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './db/history.transaction';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '.env') });

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
      ],
    controllers: [TransactionHistoryController],
    providers: [TransactionHistoryService]
})
export class HistoryModule {}
