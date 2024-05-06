import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Wallet {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@ObjectType()
export class Renzo {
  @Field(() => String, { description: 'wallet' })
  walletHash: string;
  @Field(() => Int, { description: 'renzoPoints' })
  renzoPoints: number;
  @Field(() => Int, { description: 'eigenLayerPoints' })
  eigenLayerPoints: number;
}

@ObjectType()
export class Zircuit {
  @Field(() => String, { description: 'wallet' })
  walletHash: string;
  @Field(() => Int, { description: 'Zircuit Points' })
  zircuitPoints: number;
}

@ObjectType()
export class Karak {
  @Field(() => String, { description: 'wallet' })
  walletHash: string;
  @Field(() => Int, { description: 'Zircuit Points' })
  points: number;
}

@ObjectType()
export class SwellEigenPoints {
  @Field(() => String, { description: 'wallet' })
  walletHash: string;
  @Field(() => Int, { description: 'EigenPoints Swell' })
  EigenPoints: number;
}

@ObjectType()
export class SwellPoints {
  @Field(() => String, { description: 'wallet' })
  walletHash: string;
  @Field(() => Int, { description: 'EigenPoints Swell' })
  Points: number;
  @Field(() => Int, { description: 'EigenPoints Swell' })
  EigenPoints: number;
}

@ObjectType()
export class EtherFi {
  @Field(() => String, { description: 'wallet' })
  walletHash: string;
  @Field(() => Int, { description: 'loyaltyPoints EtherFi' })
  loyaltyPoints: number;
  @Field(() => Int, { description: 'EigenPoints EtherFi' })
  eigenlayerPoints: number;
  @Field(() => Int, { description: 'loyaltyPoints EtherFi' })
  liquidLoyaltyPoints: number;
  @Field(() => Int, { description: 'EigenPoints EtherFi' })
  liquidEigenlayerPoints: number;
}
