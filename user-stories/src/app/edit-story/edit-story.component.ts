import { UserStory } from './../models/user-story';
import { UserStoriesService } from './../services/user-stories.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

type getStory = {
  storyId: string;
}

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.css']
})
export class EditStoryComponent implements OnInit {

  @ViewChild('update') update!: NgForm;
  userstory!: UserStory;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: getStory,
    private storyServ: UserStoriesService,
    private toast: HotToastService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.storyServ.getStory(this.data.storyId)
    .subscribe({
      next: (i: any) => {
        this.userstory = i.userstory
        console.log(i.story)
      },
      complete: () => {}
    })
  }

  listAllStories(){
    this.storyServ.listStories()
  }

  updateStory(){
    const { storyId, description } = this.update.value;
    const userstory: UserStory = { storyId, description }

    this.storyServ.updateStory(userstory)
    .subscribe({
      next: (i) => {
        this.router.navigate([this.router.url]);
        this.toast.success('História Atualizada');
        this.dialog.closeAll();
        this.refreshPage()
        this.listAllStories()
      }
    })
  }

  closeModal($event: any){
    $event.preventDefault()
    this.dialog.closeAll()
  }

  refreshPage(): void{
    window.location.reload()
  }

}
