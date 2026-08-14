import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  job: string;
  company: string;
  location: string;
  salary: number;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl =
    'https://job-recommendation-backend-6nfw.onrender.com/api/jobs/recommendations/1';

  constructor(private http: HttpClient) {}

  getJobs(userId: number): Observable<Job[]> {
    return this.http.get<Job[]>(
      `${this.apiUrl}/${userId}`
    );
  }
}