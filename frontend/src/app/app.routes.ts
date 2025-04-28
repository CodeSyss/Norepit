import {  Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TutorsearchComponent } from './components/tutorsearch/tutorsearch.component';
import { TutorprofileComponent } from './components/tutorprofile/tutorprofile.component';
import { TutorclassComponent } from './components/tutorclass/tutorclass.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'tutorSearch', component: TutorsearchComponent },
  { path: 'tutorProfile', component: TutorprofileComponent },
  { path: 'tutorClass', component: TutorclassComponent },
];

