import { UserStoriesService } from './../services/user-stories.service';
import { UserStory } from './../models/user-story';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  @ViewChild('create') create!: NgForm;
  userstory = this.data

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string,
    private storyServ: UserStoriesService,
    private toast: HotToastService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

  closeModal($event: any){
    $event.preventDefault()
    this.dialog.closeAll()
  }

  listAllStories(){
    this.storyServ.listStories()
  }

  createStory(){
    const { storyId, description } = this.create.value;
    const userstory: UserStory = { storyId, description }

    this.storyServ.createStory(userstory)
    .subscribe({
      next: (i) => {
        this.router.navigate([this.router.url]);
        this.toast.success(i.message);
        this.dialog.closeAll();
        this.refreshPage()
        this.listAllStories()
      },
      error: (err) => {
        this.toast.error(err.error.message)
      },
      complete: () => {}
    })
  }

  getStory(storyId: string){
    this.storyServ.getStory(storyId)
    .subscribe({
      next: () => {
        this.toast.success('Mostrar história');
        this.router.navigate([this.router.url])
      },
      error: (i: any) => this.toast.error(i.message)
    })

  }

  refreshPage(): void{
    window.location.reload()
  }

 
}
