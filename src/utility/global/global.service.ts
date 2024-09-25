import { Injectable } from '@nestjs/common';
import { HeaderRequestInterface } from "./interface/header.request.interface";

@Injectable()
export class GlobalService {
  private _headerRequestInterface: any;
  constructor() {
  }



  get headerRequestInterface(): HeaderRequestInterface {
    return this._headerRequestInterface;
  }

  set headerRequestInterface(value: HeaderRequestInterface) {
    this._headerRequestInterface = value;
  }

}
