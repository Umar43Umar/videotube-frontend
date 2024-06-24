import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LikeService } from 'src/app/services/like.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.css']
})
export class LikedVideosComponent implements OnInit {
  data;
  likedVideos: any;
  videos: any[] = [];
  videoIds: string[] = [];
  videosData;

  constructor(private likeService: LikeService, private videoService: VideoService, private router: Router) { }

  ngOnInit() {
    this.likeService.getLikedVideos().subscribe(response => {
      this.data = response || [];
      this.likedVideos = this.data.data // Assuming response is an array of objects
      this.videoIds = this.likedVideos.map(video => video._id);
      console.log(this.videoIds);

      // Fetch videos by ID
      this.videoIds.forEach(id => {
        this.videoService.getVideosById(id).subscribe(res => {
          this.videosData = res; // Assuming res.data contains the video data
          if (Array.isArray(this.videosData.data)) {
            this.videos.push(...this.videosData.data);
          } else {
            this.videos.push(this.videosData.data);
          }
        });
      });
      // console.log(this.videos);
    });
  }
  onVideoClick(videoId: string): void {
    this.router.navigate(['/video-player', videoId]);
  }
}
