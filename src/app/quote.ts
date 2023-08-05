export class Quote {
    quoteID: number;
    quoteType: string;
    description: string;
    dueDate: Date;
    premium: number;
    sales: string;
  
    constructor(
      quoteID: number,
      quoteType: string,
      description: string,
      dueDate: Date,
      premium: number,
      sales: string
    ) {
      this.quoteID = quoteID;
      this.quoteType = quoteType;
      this.description = description;
      this.dueDate = dueDate;
      this.premium = premium;
      this.sales = sales;
    }
  }
  