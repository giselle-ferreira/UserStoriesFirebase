import { NavbarComponent } from './navbar/navbar.component';
import { ListStoriesComponent } from './list-stories/list-stories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: 'userstories',
    component: ListStoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
