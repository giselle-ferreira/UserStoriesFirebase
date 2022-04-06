import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { ListStoriesComponent } from './list-stories/list-stories.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditStoryComponent } from './edit-story/edit-story.component';
import { CreateStoryComponent } from './create-story/create-story.component';

@NgModule({
  declarations: [		
    AppComponent,
    ListStoriesComponent,
    NavbarComponent,
      EditStoryComponent,
      CreateStoryComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    HttpClientModule,
    HotToastModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatDividerModule,
    MatInputModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
