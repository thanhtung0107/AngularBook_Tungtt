import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Author} from "../../../models/author";
import {AuthService} from "../../../services/auth.service";
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/category.service";
import {BookService} from "../../../services/book.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  rfForm: FormGroup;
  auths: Author[] = [];
  categories: Category[] = [];

  constructor(
    protected fb: FormBuilder,
    private authorService: AuthService,
    private categoryService: CategoryService,
    private bookService: BookService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rfForm = this.fb.group({
      title: this.fb.control(null, Validators.required),
      price: this.fb.control(null, Validators.required),
      categoryId: this.fb.control(null, Validators.required),
      authorId: this.fb.control(null, Validators.required),
      image: this.fb.control(null, Validators.required),
    }); 
    this.authorService.getAll().subscribe(data => {
      this.auths = data;
    });
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  
  submitForm() {
    if (this.rfForm.invalid) {
      return;
    }
    this.bookService.store(this.rfForm.value).subscribe(res => {
      this.router.navigate(['/admin/sach']).then();
    });
  }
}
