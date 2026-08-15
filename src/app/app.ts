import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  JobService,
  Job,
  RecommendationResponse
} from './services/job';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  userId = 1;

  userName = '';

  userSkills: string[] = [];

  jobs: Job[] = [];

  loading = false;

  error = '';

  constructor(
    private jobService: JobService
  ) {
  }

  findJobs(): void {

    console.log('Find Jobs clicked');

    console.log('User ID:', this.userId);

    this.loading = true;
    this.error = '';

    this.jobs = [];
    this.userName = '';
    this.userSkills = [];

    this.jobService
      .getRecommendations(this.userId)
      .subscribe({

        next: (response: RecommendationResponse) => {

          console.log('Backend Response:', response);

          this.userName = response.userName;

          this.userSkills = response.userSkills;

          this.jobs = response.jobs;

          console.log('User Name:', this.userName);

          console.log('User Skills:', this.userSkills);

          console.log('Jobs:', this.jobs);

          this.loading = false;
        },

        error: (error) => {

          console.error('Backend Error:', error);

          this.error =
            'Unable to load job recommendations.';

          this.loading = false;
        }
      });
  }
}