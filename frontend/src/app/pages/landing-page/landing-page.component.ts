import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { ProcessComponent } from '../../components/process/process.component';
import { SubjectsComponent } from '../../components/subjects/subjects.component';
import { TutorsComponent } from '../../components/tutors/tutors.component';
import { CommentsComponent } from '../../components/comments/comments.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    BannerComponent,
    ProcessComponent,
    SubjectsComponent,
    TutorsComponent,
    CommentsComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}
