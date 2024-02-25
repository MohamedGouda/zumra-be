import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { transactionHistoryDto } from '../dto/history.dto';
import { Transaction } from '../db/history.transaction';
import { Model } from 'mongoose';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async addTransaction(
    transactionDto: transactionHistoryDto,
  ): Promise<Transaction> {
    try {
      const createdTransaction = new this.transactionModel(transactionDto);
      return createdTransaction.save();
    } catch (err) {
      throw new Error('Failed to save transaction');
    }
  }

  async getUserTransactionHistory(username: String) {
    try {
      const history = await this.transactionModel.find({username}).lean();
      return history;
    } catch (err) {
      throw new Error('can not get transaction history');
    }
  }
}
