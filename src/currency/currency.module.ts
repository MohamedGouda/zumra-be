import { Module } from '@nestjs/common';
import { currencyController } from './controller/currency.controller';
import { CurrencyService } from './services/currency.service';
import { TransactionHistoryService } from 'src/history/services/history.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'src/history/db/history.transaction';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
      ],
    controllers: [currencyController],
    providers: [CurrencyService, TransactionHistoryService],
})
export class CurrencyModule {}
