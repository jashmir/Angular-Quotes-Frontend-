import { AfterViewInit, Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { Quote } from '../quote';
import { QuoteServiceService } from '../quote-service.service';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.css']
})
// export class EditQuoteComponent implements AfterViewInit{
  // @Input() quoteData!: Quote;
  // editQuoteForm!: FormGroup;
  // constructor(
  //   private formBuilder: FormBuilder,
  //   private dialogRef: MatDialogRef<EditQuoteComponent>,
  //   private quoteService: QuoteServiceService,
  //   @Inject(MAT_DIALOG_DATA) public data: {quoteData: Quote}
  // ) {}
  
  // ngOnInit(): void {
  //   this.editQuoteForm = this.formBuilder.group({
  //     quoteID: [{value: this.quoteData.quoteID, disabled: true}],
  //     quoteType: [this.quoteData.quoteType],
  //     description: [this.quoteData.description],
  //     dueDate: [this.quoteData.dueDate],
  //     premium: [this.quoteData.premium],
  //     sales: [this.quoteData.sales]
  //   });
  // }
  export class EditQuoteComponent{
    editQuoteForm!: FormGroup;
    quote!: any;
  
    constructor(
      public dialogRef: MatDialogRef<EditQuoteComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
      private quoteService: QuoteServiceService,
      private formBuilder: FormBuilder
    ) { }
  
  //   ngOnInit(): void {
  //     this.quote = this.data.selectedQuote;
  //     this.editQuoteForm = this.formBuilder.group({
  //       QuoteType: [this.quote.quoteType, Validators.required],
  //       Description: [this.quote.description, Validators.required],
  //       DueDate: [this.quote.dueDate, Validators.required],
  //       Premium: [this.quote.premium, Validators.required],
  //       Sales: [this.quote.sales, Validators.required],
  //     });
  //   }

  onSubmit(){
    this.quoteService.updateQuote(this.data.quote.QuoteID,this.data.quote).subscribe(() => {
            this.dialogRef.close(this.quote);
    });
  }
  
  //   onSubmit() {
  //     this.editQuoteForm.value.quoteType,
  //     this.quote.quoteType = this.editQuoteForm.get('quoteType')!.value;
  //     this.quote.description = this.editQuoteForm.get('description')!.value;
  //     this.quote.dueDate = this.editQuoteForm.get('dueDate')!.value;
  //     this.quote.premium = this.editQuoteForm.get('premium')!.value;
  //     this.quote.sales = this.editQuoteForm.get('sales')!.value;
  
  //     this.quoteService.updateQuote(this.editQuoteForm.get('quoteType')!.value,this.quote).pipe(first()).subscribe(() => {
  //       this.dialogRef.close(this.quote);
  //     });
  //   }
  
    onCancelClick(): void {
      this.dialogRef.close();
    }
  }