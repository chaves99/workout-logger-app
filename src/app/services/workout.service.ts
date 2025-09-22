import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Page, WorkoutRequest, WorkoutResponse } from "../core";

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private http = inject(HttpClient);
  private readonly url = environment.serviceUrl + '/workout';

  public getByUser(id: number): Observable<WorkoutResponse[]> {
    return this.http.get<WorkoutResponse[]>(this.url);
  }

  public getPagedByUser(page: number, size: number): Observable<Page<WorkoutResponse>> {
    return this.http.get<Page<WorkoutResponse>>(`${this.url}?page=${page}&size=${size}`);
  }

  public create(workout: WorkoutRequest): Observable<WorkoutResponse> {
    return this.http.post<WorkoutResponse>(this.url, workout);
  }
}
