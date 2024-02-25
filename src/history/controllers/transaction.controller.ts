import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  HttpException,
  Req,
} from '@nestjs/common';
import { TransactionHistoryService } from '../services/history.service';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from 'src/shared/decorators/token.payload';
import { TokenPayloadDto } from 'src/shared/types/token';


@Controller('/user/history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getHistory(@TokenPayload() token: TokenPayloadDto) {
    try {
      const transactionHistory =
        await this.transactionHistoryService.getUserTransactionHistory(token.username);
      return { 'history': transactionHistory };
    } catch (err) {
      throw new HttpException('conversion failed', HttpStatus.BAD_REQUEST);
    }
  }
}
