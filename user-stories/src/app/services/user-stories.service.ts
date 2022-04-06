import { ResponseStories } from './../models/ResponseStories';
import { UserStory } from './../models/user-story';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserStoriesService {

  private readonly url = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  listStories(){
    return this.http.get<UserStory>(`${this.url}`)
  }
   
  getStory(storyId: string){
    return this.http.post<ResponseStories>(`${this.url}get`, { storyId } )
  }

  createStory(userstory: UserStory){
    return this.http.post<ResponseStories>(`${this.url}create`, userstory)
  }

  updateStory(userstory: UserStory){
    return this.http.post<UserStory>(`${this.url}update`, userstory )
  }

  deleteStory(storyId: string){  
    return this.http.post<void>(`${this.url}delete`, { storyId })
  }

}
