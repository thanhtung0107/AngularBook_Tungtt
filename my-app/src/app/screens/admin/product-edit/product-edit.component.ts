import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Author} from "../../../models/author";
import {Category} from "../../../models/category";
import {AuthService} from "../../../services/auth.service";
import {CategoryService} from "../../../services/category.service";
import {BookService} from "../../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  rfForm: FormGroup;
  auths: Author[] = [];
  categories: Category[] = [];

  id: number;

  constructor(
    protected fb: FormBuilder,
    private authorService: AuthService,
    private categoryService: CategoryService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    this.id = params.id;
    this.bookService.findById(params.id).subscribe((data) => {
      this.rfForm = this.fb.group({
        title: this.fb.control(data.title, Validators.required),
        price: this.fb.control(data.price, Validators.required),
        categoryId: this.fb.control(data.categoryId, Validators.required),
        authorId: this.fb.control(data.authorId, Validators.required),
        image: this.fb.control(data.image, Validators.required),
      });
    
      this.authorService.getAll().subscribe(data => {
        this.auths = data;
      });
      this.categoryService.getAll().subscribe(data => {
        this.categories = data;
      });
    });
  });
  }

  submitForm() {
    if (this.rfForm.invalid) {
      return;
    }
    this.bookService.update({...this.rfForm.value, id: this.id}).subscribe(res => {
      this.router.navigate(['/admin/sach']).then();
    });
  }

}
