import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WalletService } from './wallet.service';
import {
  EtherFi,
  Karak,
  Renzo,
  SwellEigenPoints,
  SwellPoints,
  Wallet,
  Zircuit,
} from './entities/wallet.entity';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';

@Resolver(() => Wallet)
export class WalletResolver {
  constructor(private readonly walletService: WalletService) {}

  @Mutation(() => Wallet)
  createWallet(
    @Args('createWalletInput') createWalletInput: CreateWalletInput,
  ) {
    return this.walletService.create(createWalletInput);
  }

  @Query(() => [Wallet], { name: 'wallet' })
  findAll() {
    return this.walletService.findAll();
  }

  @Query(() => Renzo, { name: 'walletRenzo' })
  findRenzo(@Args('wallet', { type: () => String }) wallet: string) {
    return this.walletService.getRenzo(wallet);
  }

  @Query(() => Zircuit, { name: 'walletZircuit' })
  findZiruit(@Args('wallet', { type: () => String }) wallet: string) {
    return this.walletService.getZircuit(wallet);
  }

  @Query(() => Karak, { name: 'walletKarak' })
  findKarak(@Args('wallet', { type: () => String }) wallet: string) {
    return this.walletService.getKarakPoints(wallet);
  }

  @Query(() => EtherFi, { name: 'walletEtherFi' })
  findEtherFi(@Args('wallet', { type: () => String }) wallet: string) {
    return this.walletService.getEtherFiPoints(wallet);
  }

  @Query(() => SwellPoints, { name: 'walletSwellPoints' })
  findSwellPoints(@Args('wallet', { type: () => String }) wallet: string) {
    return this.walletService.getSwellPoints(wallet);
  }

  @Mutation(() => Wallet)
  updateWallet(
    @Args('updateWalletInput') updateWalletInput: UpdateWalletInput,
  ) {
    return this.walletService.update(updateWalletInput.id, updateWalletInput);
  }

  @Mutation(() => Wallet)
  removeWallet(@Args('id', { type: () => Int }) id: number) {
    return this.walletService.remove(id);
  }
}
