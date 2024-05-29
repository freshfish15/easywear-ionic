import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

defineCustomElements(window);

/* API Types Definitions */

// Token
export type TokenResponse = {
  code: string,
  codeDesc: string,
  msg: string,
  data: TokenResponseData,
};

export type TokenResponseData = {
  token?: string,
  expirationMin?: string,
};


// Process
export type ProcessResponse = {
  code: string,
  codeDesc: string,
  msg: string,
  data: {
    ticket?: string,
    timeCostMillis?: number,
    errorInfo?: Array<{ id: number, position: string; }>,
    warnInfo?: Array<{ id: number, position: string; }>,
  },
};

export type ProcessResponseData = {
  ticket?: string,
  timeCostMillis?: number,
  errorInfo?: Array<{ id: number, position: string; }>,
  warnInfo?: Array<{ id: number, position: string; }>,
};


// Measure Data
export type MeasureDataResponse = {
  code: string,
  codeDesc: string,
  msg: string,
  data: MeasureDataResponseData,
};

export type MeasureDataResponseData = {
  measureId?: string,
  sizes?: Array<{
    sizeCode: string,
    sizeCmVal: number,
    sizeName: string,
    sizeDesc: string,
    iconUrl: string
  }>,
  intlSize?: Array<{
    BottomSz: string,
    TopSz: string,
    Country: string,
    TopSzTight: string,
    ChartVersion: string,
    BottomSzTight: string,
    SizeTight: string,
    Size: string
  }>
  frontProfileBody?: MeasureDataResponseProfileBody,
  sideProfileBody?: MeasureDataResponseProfileBody,
  frontImgSrc: string,
  sideImgSrc: string,
  sr?: Array<{
    chartName: string,
    sizeRecmd: string,
  }>,
};

export type MeasureDataResponseProfileBody = {
  callPx?: Array<Point>,
  caddInfo?: string,
  clooseIdx?: Array<{
    loosePartStart: number,
    loosePartEnd: number,
  }>,
  cpaintLines?: Array<{
    lineName: string,
    imgDir: 'f' | 's' | 'b',
    lineType: 'L' | 'R' | 'free',
    startPt: Point,
    endPt: Point,
    location?: number,
    dnRange?: number,
    upRange?: number,
  }>,
  csizeLines?: Array<{
    lineSizeID: string,
    lineName: string,
    lineSizeVal: number,
    startPt: Point,
    endPt: Point,
  }>,
  cmovPxIdx?: Array<{
    pxName: string,
    pxIndex: number,
  }>,
};

export type getMeasurementResponse = {
  code: string,
  codeDesc: string,
  msg: string,
  data: Array<getMeasurementResponseData>,
}

export type getMeasurementResponseData = {
  frontpic?: string,
  weight?: number,
  sidepic?: string,
  date?: string,
  measureName: string,
  mid: number,
  height?: number,
  user_email: string,
  sizes?: string,
  measureType: number
}

// Point
export type Point = {
  x: number,
  y: number,
}




