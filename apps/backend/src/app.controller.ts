import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WalletService } from './wallet/wallet.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    private readonly walletService: WalletService,
  ) {}

  @Get()
  getHello(): any {
    return this.walletService.getEtherFiPoints(
      '0xe7ded75f45A6c52775b4E1BF881004D7dd8b4dEf',
    );
  }
}
