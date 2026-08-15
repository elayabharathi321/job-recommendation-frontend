import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  job: string;
  company: string;
  location: string;
  salary: number;
}

export interface RecommendationResponse {
  userId: number;
  userName: string;
  userSkills: string[];
  jobs: Job[];
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl =
    'https://job-recommendation-backend-6nfw.onrender.com/api/jobs';

  constructor(private http: HttpClient) {
  }

  getRecommendations(
    userId: number
  ): Observable<RecommendationResponse> {

    return this.http.get<RecommendationResponse>(
      `${this.apiUrl}/recommendations/${userId}`
    );
  }
}