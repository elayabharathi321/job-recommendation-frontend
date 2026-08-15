import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  JobService,
  Job
} from './services/job';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  userId: number = 1;

  userName: string = '';

  userSkills: string[] = [];

  jobs: Job[] = [];

  loading: boolean = false;

  error: string = '';

  searched: boolean = false;

  constructor(
    private jobService: JobService,
    private cdr: ChangeDetectorRef
  ) {}

  findJobs(): void {

    console.log('Find Jobs clicked');
    console.log('User ID:', this.userId);

    this.loading = true;
    this.error = '';
    this.searched = true;

    this.userName = '';
    this.userSkills = [];
    this.jobs = [];

    this.cdr.detectChanges();

    this.jobService
      .getRecommendations(this.userId)
      .subscribe({

        next: (response) => {

          console.log('Backend Response:', response);

          this.userName = response.userName;
          this.userSkills = response.userSkills;
          this.jobs = response.jobs;

          console.log('User Name:', this.userName);
          console.log('User Skills:', this.userSkills);
          console.log('Jobs:', this.jobs);

          this.loading = false;

          // IMPORTANT
          this.cdr.detectChanges();

          console.log('UI updated');
        },

        error: (error) => {

          console.error('API Error:', error);

          this.loading = false;

          this.error =
            'Unable to load user details. Please check the User ID.';

          // IMPORTANT
          this.cdr.detectChanges();
        },

        complete: () => {

          console.log('API request completed');

          this.loading = false;

          // IMPORTANT
          this.cdr.detectChanges();
        }

      });
  }
}