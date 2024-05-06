import { Injectable } from '@nestjs/common';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';
import puppeteer from 'puppeteer-core';
import { ConfigService } from '@nestjs/config';

const PCR = require('puppeteer-chromium-resolver');
const options = {};

@Injectable()
export class WalletService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  create(createWalletInput: CreateWalletInput) {
    return 'This action adds a new wallet';
  }

  findAll() {
    return `This action returns all wallet`;
  }

  async getEtherFiPoints(id: string): Promise<any> {
    return this.httpService
      .get(`https://app.ether.fi/api/portfolio/v3/${id}`)
      .pipe(
        map((totals) => {
          return {
            walletHash: id,
            loyaltyPoints: parseInt(totals.data.totalIntegrationLoyaltyPoints),
            eigenlayerPoints: parseInt(
              totals.data.totalIntegrationEigenLayerPoints,
            ),
            liquidLoyaltyPoints: parseInt(totals.data.liquid.loyaltyPoints),
            liquidEigenlayerPoints: parseInt(
              totals.data.liquid.eigenlayerPoints,
            ),
          };
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async getKarakPoints(id: string): Promise<any> {
    return this.httpService
      .get(
        `https://restaking-backend.karak.network/getXP?batch=1&input=%7B%220%22%3A%7B%22wallet%22%3A%22${id}%22%7D%7D`,
      )
      .pipe(
        map((totals) => {
          return {
            walletHash: id,
            points: parseInt(totals.data[0].result.data),
          };
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async getSwellPoints(id: string): Promise<any> {
    const stats = await PCR(options);
    const browser = await stats.puppeteer
      .launch({
        headless: !false,
        args: ['--no-sandbox'],
        executablePath: stats.executablePath,
      })
      .catch(function (error) {
        console.log(error);
      });
    const page = await browser.newPage();

    try {
      await page.setExtraHTTPHeaders({
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8',
      });

      const response = await page.goto(
        `https://v3-lst.svc.swellnetwork.io/swell.v3.VoyageService/VoyageUser?connect=v1&encoding=json&message=%7B%22address%22%3A%22${id}%22%7D`,
      );

      await page.content();

      const innerText = await page.evaluate(() => {
        return JSON.parse(document.querySelector('body').innerText);
      });

      const response2 = await page.goto(
        `https://v3-lst.svc.swellnetwork.io/swell.v3.EigenPointsService/EigenPointsUser?connect=v1&encoding=json&message=%7B%22address%22%3A%22${id}%22%7D`,
      );

      await page.content();

      const innerText2 = await page.evaluate(() => {
        return JSON.parse(document.querySelector('body').innerText);
      });

      return {
        walletHash: id,
        Points: parseInt(innerText.points),
        EigenPoints: parseInt(innerText2.points),
      };
    } finally {
      await browser.close();
    }
  }

  getZircuit(id: string) {
    return this.httpService
      .get(`https://stake.zircuit.com/api/points/${id}`)
      .pipe(
        map((res) => res.data),
        map((totals) => {
          return {
            walletHash: id,
            zircuitPoints: parseInt(totals.totalPoints),
          };
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  getRenzo(id: string) {
    return this.httpService
      .get(`https://app.renzoprotocol.com/api/points/${id}?chainId=1`)
      .pipe(
        map((res) => res.data?.data),
        map((bpi) => bpi?.totals),
        map((totals) => {
          return {
            walletHash: id,
            renzoPoints: parseInt(totals.renzoPoints),
            eigenLayerPoints: parseInt(totals.eigenLayerPoints),
          };
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  update(id: number, updateWalletInput: UpdateWalletInput) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
