import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService, Job } from './services/job';

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

  userId = 1;

  jobs = signal<Job[]>([]);

  loading = signal(false);

  error = signal('');

  constructor(private jobService: JobService) {}

  findJobs(): void {

    console.log('Find Jobs clicked');

    const id = Number(this.userId);

    console.log('User ID:', id);

    if (!id || id <= 0) {
      this.error.set('Please enter a valid User ID.');
      return;
    }

    // Start loading
    this.loading.set(true);

    // Clear old error
    this.error.set('');

    this.jobService.getRecommendedJobs(id).subscribe({

      next: (response: Job[]) => {

        console.log('Backend Response:', response);

        // Store jobs
        this.jobs.set(response);

        // IMPORTANT: stop loading
        this.loading.set(false);

        console.log('Jobs:', this.jobs());
        console.log('Loading:', this.loading());

      },

      error: (err) => {

        console.error('API Error:', err);

        this.jobs.set([]);

        this.loading.set(false);

        this.error.set(
          'Unable to load recommended jobs.'
        );

      }

    });
  }
}