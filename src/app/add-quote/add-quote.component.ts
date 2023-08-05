import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Quote } from '../quote';
import { QuoteServiceService } from '../quote-service.service';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit{
  quoteForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    // Inject MatDialogRef in the constructor
    private dialogRef: MatDialogRef<AddQuoteComponent>,
    private quoteService: QuoteServiceService,
    private router: Router,
    // Inject MAT_DIALOG_DATA to get any data passed to the dialog
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.quoteForm = this.formBuilder.group({
      quoteId:[''],
      quoteType: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      premium: ['', Validators.required],
      sales: ['', Validators.required]
    });
  }
  onSubmit() {
    // Create a new quote object with the form data
    const newQuote: Omit<Quote, 'quoteID'> = {
      quoteType: this.quoteForm.value.quoteType,
      description: this.quoteForm.value.description,
      dueDate: this.quoteForm.value.dueDate,
      premium: this.quoteForm.value.premium,
      sales: this.quoteForm.value.sales,
    };

    this.quoteService.createQuote(newQuote).subscribe({
      next: (response) => {
        console.log('New quote added successfully', response);
        // Pass the new quote object to the parent component using MatDialogRef
        this.dialogRef.close(newQuote);
      },
      error: (error) => {
        console.log('Error adding new quote', error);
        // Handle the error here
      }
    });
  }
  // onClose() {
  //   this.dialogRef.close();
  // }

  get quoteTypeControl() {
    return this.quoteForm.get('quoteType');
  }

  get descriptionControl() {
    return this.quoteForm.get('description');
  }

  get dueDateControl() {
    return this.quoteForm.get('dueDate');
  }

  get premiumControl() {
    return this.quoteForm.get('premium');
  }

  get salesControl() {
    return this.quoteForm.get('sales');
  }

}
