import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletResolver } from './wallet.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [WalletResolver, WalletService],
  imports: [HttpModule],
})
export class WalletModule {}
