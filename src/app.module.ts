import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CurrencyModule } from './currency/currency.module';
import { join } from 'path';
import { HistoryModule } from './history/history.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/zumraDB'),
    AuthModule,
    UserModule,
    CurrencyModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
