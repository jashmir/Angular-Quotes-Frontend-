import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'id', 'title','completed'];
  dataSource: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://jsonplaceholder.typicode.com/todos').subscribe(data => {
      this.dataSource = data;
    });
  }

}
