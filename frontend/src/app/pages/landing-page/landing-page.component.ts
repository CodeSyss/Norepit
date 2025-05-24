import { AfterViewInit, Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { ProcessComponent } from '../../components/process/process.component';
// import { SubjectsComponent } from '../../components/subjects/subjects.component';
import { TutorsComponent } from '../../components/tutors/tutors.component';
import { CommentsComponent } from '../../components/comments/comments.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    BannerComponent,
    ProcessComponent,
    TutorsComponent,
    CommentsComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})


export class LandingPageComponent implements AfterViewInit {
  private headerHeight: number = 0; // Altura del header + 2px (ajusta según tu caso)

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit() {
    this.handleFragmentScroll();
    this.calculateHeaderHeight();
  }

  private handleFragmentScroll() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        tap(() => {
          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            setTimeout(() => this.scrollToAdjustedPosition(fragment), 100);
          }
        })
      )
      .subscribe();
  }

  private calculateHeaderHeight() {
    const header = document.querySelector('header');
    if (header) {
      this.headerHeight = header.clientHeight; // +2px de ajuste fino
    }
  }

  private scrollToAdjustedPosition(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - this.headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}