import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '../quote';
import { QuoteServiceService } from '../quote-service.service';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.css']
})
export class ViewQuoteComponent implements OnInit{
  quote!: any;
  dataSource: MatTableDataSource<Quote> = new MatTableDataSource<Quote>();

  constructor(private route: ActivatedRoute, private quoteService: QuoteServiceService) { }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit() {
    debugger
    var id = +this.route.snapshot.paramMap.get('id')!;
    this.loadQuotes(id);
}

loadQuotes(id: number): void {
  this.quoteService.getQuoteById(id).subscribe({
    next: (data) => {
      this.quote = data;
      this.dataSource.data = this.quote
      console.log('Quote data:', this.quote);
    },
    error: (error) => {
      console.error(error);
    },
    complete: () => {
      console.log('Observable complete');
    }
  });
}
}
