import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {
  cates = [];
  constructor(private categoryService: CategoryService,
              protected router: Router) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.cates = data;
    });
  }

  routeTo(cateId) {
    this.router.navigate(['/'], { queryParams: { categoryId: cateId } });
  }

}
