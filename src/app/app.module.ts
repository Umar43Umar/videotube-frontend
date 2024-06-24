import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './components/videos/videos.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LikedVideosComponent } from './components/liked-videos/liked-videos.component';
import { HistoryComponent } from './components/history/history.component';
import { RelativeTimePipe } from './pipe/relative-time.pipe';
import { MyVideosComponent } from './components/my-videos/my-videos.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { IconsSidebarComponent } from './components/icons-sidebar/icons-sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    VideosComponent,
    SidebarComponent,
    LikedVideosComponent,
    HistoryComponent,
    RelativeTimePipe,
    MyVideosComponent,
    VideoPlayerComponent,
    IconsSidebarComponent
  ],
  imports: [
    BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'liked-videos', component: LikedVideosComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'my-videos', component: MyVideosComponent },
      { path: 'video-player/:id', component: VideoPlayerComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
