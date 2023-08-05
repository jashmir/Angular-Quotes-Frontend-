import { Component,ViewChild, AfterViewInit, Input, OnInit } from '@angular/core';
import { Quote } from '../quote';
import { QuoteServiceService } from '../quote-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddQuoteComponent } from '../add-quote/add-quote.component';
import { EditQuoteComponent } from '../edit-quote/edit-quote.component';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-quote-component',
  templateUrl: './quote-component.component.html',
  styleUrls: ['./quote-component.component.css']
})
export class QuoteComponentComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;  selectedQuote!: any;
  @ViewChild('paginator') paginator!: MatPaginator;
  quotes: Quote[] = [];
  quotess: any[] = [];
  SortedData: Quote[] = [];
  dataSource: MatTableDataSource<Quote> = new MatTableDataSource<Quote>();
  displayedColumns: string[] = ['quoteID', 'quoteType', 'description', 'dueDate', 'premium', 'sales','actions'];
  pageSizes: number[] = [5, 10, 15, 20];
  editQuotee: any;
  orderByField: string = 'QuoteID';
  orderByFields: string[] = ['QuoteID', 'QuoteType', 'Description', 'DueDate', 'Premium', 'Sales'];
  searchTerm = '';


  constructor(private quoteService: QuoteServiceService, public dialog: MatDialog, public router: Router) { 
    this.SortedData = this.quotess.slice();
  }

  ngAfterViewInit(): void {
    this.loadQuotes();
    this.dataSource.paginator = this.paginator;

  } 

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    console.log(a,b)
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    debugger;
    console.log("Insorting")
    console.log(this.SortedData)
    const data = this.quotess.slice();
    if (!sort.active || sort.direction === '') {
      this.SortedData = data;
      return;
    }
    this.SortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'QuoteID':
          return this.compare(a.QuoteID, b.QuoteID, isAsc);
        case 'QuoteType':
          return this.compare(a.QuoteType, b.QuoteType, isAsc);
        case 'Description':
          return this.compare(a.Description, b.Description, isAsc);
        case 'DueDate':
          return this.compare(a.DueDate, b.DueDate, isAsc);
        case 'Premium':
          return this.compare(a.Premium, b.Premium, isAsc);
        case 'Premium':
          return this.compare(a.Sales, b.Sales, isAsc);
        default:
          return 0;
      }
      
    });
    this.dataSource.data = this.SortedData
    console.log("Sorted Data",this.SortedData)
  }

  
  
  
  // passData(id: number): void {
  //   debugger;
  //   console.log("pass data",id)
  //   this.quoteService.getQuoteById(id).subscribe({
  //     next: (data) => {
  //       this.quotess = data;
  //       this.dataSource.data = this.quotess
  //       console.log('Quote data:', this.quotess);
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     },
  //     complete: () => {
  //       console.log('Observable complete');
  //     }
  //   });
  // }

  loadQuotes(): void{
    this.quoteService.getQuotesList().subscribe({
      next: (data) => {
        this.quotes = data;
        this.quotess = data;
        this.dataSource.data = this.quotes;
        
        // this.pagedQuotes = this.quotes.slice(0, this.pageSize);
        // this.dataSource.data = this.pagedQuotes;
        // this.currentPage = 0;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Observable complete');
        console.log(this.quotes)
      }
    });
  }

  viewQuote(id: number) {
    this.router.navigate(['quotes', id]);
  }

  onRecordSelect(quote: Quote) {
    this.selectedQuote = quote;
  }

  filterQuotes(searchTerm: string) {
    this.dataSource.filter = searchTerm.trim().toLocaleLowerCase();
    const filterValue = searchTerm;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // editQuote(quote: any){
  //   console.log("edit")
  // }
    
deleteQuote(quote: number): void {
  const confirmed = window.confirm("Are you sure you want to delete this quote?");

  if (confirmed) {
    this.quoteService.deleteQuote(quote).subscribe({
      next: () => {
        // Quote has been successfully deleted
        // Update the quotes list in your component
        this.quotes = this.quotes.filter(q => q.quoteID !== quote);
        this.ngAfterViewInit();
      },
      error: (error) => {
        // Handle error here
        console.log(error);
      }
    });
  }
}

openAddQuoteDialog() {
  const dialogRef = this.dialog.open(AddQuoteComponent, {
    width: '600px'
  });
  dialogRef.afterClosed().subscribe((result: Quote) => {
    // If a new quote was created, add it to the dataSource
    if (result) {
      this.dataSource.data.push(result);
      this.dataSource._updateChangeSubscription(); // Refresh the dataSource
    }
    this.loadQuotes();
  });
}

editQuote(quoteId: any): void {
  const selectedQuote = this.quotess.find(q => q.QuoteID === quoteId);
  const dialogRef = this.dialog.open(EditQuoteComponent, {
    width: '600px',
    data: {quote: selectedQuote}
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.dataSource.data.push(result);
      this.dataSource._updateChangeSubscription();
      }
      this.loadQuotes();
    });
    
  }
}
