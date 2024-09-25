export class ValidationErrorObject {
    key: string;
    properties: string[];
    constraints: string[];
    message: string;

    public constructor(init?:Partial<ValidationErrorObject>) {
      Object.assign(this, init);
    }    
  }