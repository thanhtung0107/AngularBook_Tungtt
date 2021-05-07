import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { CateEditComponent } from './screens/admin/cate-edit/cate-edit.component';
import { CateListComponent } from './screens/admin/cate-list/cate-list.component';
import { CateNewComponent } from './screens/admin/cate-new/cate-new.component';
import { DashboardComponent } from './screens/admin/dashboard/dashboard.component';
import { ProductEditComponent } from './screens/admin/product-edit/product-edit.component';
import { ProductListComponent } from './screens/admin/product-list/product-list.component';
import { ProductNewComponent } from './screens/admin/product-new/product-new.component';
import { BookDetailComponent } from './screens/book-detail/book-detail.component';
import { BookListComponent } from './screens/book-list/book-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: "",
        component: BookListComponent
      },
      {
        path: "chi-tiet/:bookId",
        component: BookDetailComponent
      }
    ]
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "danh-muc",
        component: CateListComponent,
      },
      {
        path: "danh-muc/new",
        component: CateNewComponent
      },
      {
        path: "danh-muc/edit/:id",
        component: CateEditComponent
      },
      {
        
        path: "sach",
        component: ProductListComponent
      },
      {
        
        path: "sach/new",
        component: ProductNewComponent
      },
      {
        
        path: "sach/edit/:id",
        component: ProductEditComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
