import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorComponent} from "./component/author/author.component";
import {CreateEditComponent} from "./component/author/create-edit/create-edit.component";
import {AuthorListarComponent} from "./component/author/author-listar/author-listar.component";

const routes: Routes = [
  {
    path:'authors', component: AuthorComponent, children:[
      {
        path:'nuevo', component: CreateEditComponent
      },
      {
        path:'listar', component:AuthorListarComponent
      },
      {
        path:'edicion/:id', component:CreateEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
