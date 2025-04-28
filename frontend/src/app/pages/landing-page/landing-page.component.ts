import { AfterViewInit, Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { ProcessComponent } from '../../components/process/process.component';
import { SubjectsComponent } from '../../components/subjects/subjects.component';
import { TutorsComponent } from '../../components/tutors/tutors.component';
import { CommentsComponent } from '../../components/comments/comments.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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
export class LandingPageComponent implements AfterViewInit{
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          // Espera al siguiente ciclo de render
          setTimeout(() => {
            const element = document.getElementById(fragment);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 0);
        }
      });
  }
}
