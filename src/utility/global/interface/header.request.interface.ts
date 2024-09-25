export interface HeaderRequestInterface {
  ip?: string;
  url?: string;
  lang?: string;
  method?: string;
  http_version?: string;
  header?: {
    host: string;
    connection: string;
    'sec-ch-ua': string;
    'sec-ch-ua-mobile': string;
    platform: string;
    cookie: string;
    user_agent: string;
  };
  body?: Object;
  query?: Object;
}
