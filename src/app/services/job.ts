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
    'https://job-recommendation-backend-production-5fc8.up.railway.app/api/jobs/';

  constructor(private http: HttpClient) {}

  getRecommendedJobs(
    userId: number
  ): Observable<Job[]> {

    return this.http.get<Job[]>(
      `${this.apiUrl}/recommendations/${userId}`
    );

  }
}