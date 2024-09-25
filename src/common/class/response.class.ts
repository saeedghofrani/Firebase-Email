import { ResponseHeader } from './response-header.class';

export class Response<T> {
  header: ResponseHeader = new ResponseHeader();
  body: T = null;

  public Get(): Response<T> {
    return this;
  }
}
