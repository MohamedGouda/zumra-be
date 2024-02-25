import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CurrencyModule } from './currency/currency.module';
import { config } from 'dotenv';
import { join } from 'path';
import { HistoryModule } from './history/history.module';

config({ path: join(__dirname, '..', '.env') });


@Module({
  imports: [
    MongooseModule.forRoot(process.env.connection_string),
    AuthModule,
    UserModule,
    CurrencyModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
