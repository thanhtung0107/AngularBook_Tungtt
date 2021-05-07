import { Component, OnInit } from '@angular/core';
import { ORDER_DATA } from 'src/app/mock-data/ORDER_DATA';
import { BookService } from 'src/app/services/book.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private bookService: BookService, protected route: ActivatedRoute) { }
  books: any;
  orderData: any[] = ORDER_DATA;

  filterObject: any = {
    orderBy: "1",
    keyword: ""
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterObject.categoryId = params.categoryId;
      this.search();
    });
  }
  search(){
    this.bookService.getAll(this.filterObject).subscribe(data => {
      this.books = data;
    });
  }

}
