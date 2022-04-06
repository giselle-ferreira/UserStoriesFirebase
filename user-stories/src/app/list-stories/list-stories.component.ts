import { CreateStoryComponent } from './../create-story/create-story.component';
import { EditStoryComponent } from './../edit-story/edit-story.component';
import { UserStoriesService } from './../services/user-stories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserStory } from '../models/user-story';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-stories',
  templateUrl: './list-stories.component.html',
  styleUrls: ['./list-stories.component.css']
})
export class ListStoriesComponent implements OnInit {

  stories!: UserStory[] | null;

  @ViewChild('saveName') saveName!: NgForm;
  Projeto: any = '';

  storyId!: string;
  description!: string;

  constructor(
    private storiesServ: UserStoriesService,
    private router: Router,
    private toast: HotToastService,
    private dialog: MatDialog
  ) {  }


  listAllStories(){
    this.storiesServ.listStories()
    .subscribe({
      next: (i: any) => {
        this.stories = i.stories
        console.log(i.stories)
      },
      error: (err) => {
        this.stories = null
        this.toast.error(err.error.message)
      },
      complete: () => {}
    })
  }


  ngOnInit(): void {
    this.listAllStories()
    const projectName = localStorage.getItem('Projeto')

    if(projectName){
      this.Projeto = projectName.replace(/["{}]/g, ' ')               
    }
  }

  saveProjName(){
    const projectName = this.saveName.value;
    localStorage.setItem('Projeto', JSON.stringify(projectName))
  }

  resetStorage(){
    localStorage.removeItem('Projeto')
    this.refreshPage()
  }
 

  createStory(storyId: string, description: string){
    this.dialog.open(CreateStoryComponent, { data: { storyId, description }})
  }

  deleteStory(storyId: string){  
    this.storiesServ.deleteStory(storyId)
    .subscribe({
      next: () => {
        this.toast.success('História Deletada');
        this.router.navigate([this.router.url]);
        this.refreshPage()
        this.listAllStories()
      },
      error: (i: any) => this.toast.error(i.message)
    })
  }

  getStory(storyId: string){
    this.storiesServ.getStory(storyId)
  }

  updateStory(storyId: string ){
    this.dialog.open(EditStoryComponent, { data: { storyId }})
  }

  refreshPage(): void{
    window.location.reload()
  }
 
}
