// auth/services/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { currencyConverterDto } from '../dto/currency.dto';
import axios from 'axios';
import { TransactionHistoryService } from 'src/history/services/history.service';
import { transactionHistoryDto } from 'src/history/dto/history.dto';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  async convert(currencyDto: currencyConverterDto, user: any) {
    try {
      const response = await axios.get(
        `${process.env.APP_Converter_URL}${currencyDto.value}/${currencyDto.from}/${currencyDto.to}`,
        {
          params: {
            app_id: process.env.API_APP_KEY, 
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  addConversionTransactionHistory(
    transactionData: currencyConverterDto,
    conversionResult: string,
  ) {
    let transactionDto: transactionHistoryDto = {
      from: transactionData.from,
      to: transactionData.to,
      value: transactionData.value,
      username: conversionResult,
      result: 'conversionResult',
    };
    this.transactionHistoryService.addTransaction(transactionDto);
  }
}
