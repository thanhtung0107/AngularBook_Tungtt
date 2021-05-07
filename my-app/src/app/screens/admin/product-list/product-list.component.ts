import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../services/book.service";
import {Book} from "../../../models/book";
import {AuthService} from "../../../services/auth.service";
import {CategoryService} from "../../../services/category.service";
//hiển thị ra danh sách
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: Book[] = [];
  auths: any = {};
  cates: any = {};

  constructor(private bookService: BookService,
              private authorService: AuthService,
              private categoryService: CategoryService
  ) {

  }

  ngOnInit(): void {
    this.getList();
    
    this.authorService.getAll().subscribe(data => {
      data.map(item => {
        this.auths[item.id] = item.name;
        return item;
      });
    });
    this.categoryService.getAll().subscribe(data => {
      data.map(item => {
        this.cates[item.id.toString()] = item.name;
        return item;
      });
    });
  }

  getList() {
    
    this.bookService.getAll().subscribe(data => {
      this.product = data;
    });
  }

  remove(id: any) {
    const confimDialog = confirm('Bạn có muốn xóa sách');
    if (confimDialog) {
      this.bookService.remove(id).subscribe(data => {
        this.getList();
      });
    }
  }

}
