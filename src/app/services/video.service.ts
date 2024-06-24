import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private url = "/api/v1/videos"

  constructor(private http: HttpClient) { }
  getAllVideos(){
    return this.http.get(`${this.url}`);
  }
  getVideosById(id){
    return this.http.get(`${this.url}/${id}`);
  }

}
