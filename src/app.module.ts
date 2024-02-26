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
    MongooseModule.forRoot('mongodb+srv://mgouda:4DKTHBTCiTCKbzBy@cluster0.kiv0j4q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule,
    UserModule,
    CurrencyModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
