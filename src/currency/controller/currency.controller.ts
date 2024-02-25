import { Controller, Post, UseGuards ,  Body, HttpStatus, HttpException } from '@nestjs/common';
import { CurrencyService } from '../services/currency.service';
import { currencyConverterDto } from '../dto/currency.dto';
import { TokenPayload } from 'src/shared/decorators/token.payload';
import { TokenPayloadDto } from 'src/shared/types/token';
import { AuthGuard } from 'src/auth/gards/auth.gard';

@Controller('convert')
export class currencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async convert(@TokenPayload() tokenPayload: TokenPayloadDto, @Body() currencyConverterDto: currencyConverterDto) {
    try{
      const convertedValue = await this.currencyService.convert(currencyConverterDto , tokenPayload.username)
      return { "converted value": convertedValue  };
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);  
    }
  }
}
