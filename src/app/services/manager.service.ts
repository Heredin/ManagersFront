import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Manager } from '../interfaces/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/managers/'
  }

  getListManagers(): Observable<Manager[]> {
   return this.http.get<Manager[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteManager(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveManager(manager: Manager): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,manager)
  }

  getManager(id: number): Observable<Manager> {
    return this.http.get<Manager>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateManager(id: number, manager: Manager): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, manager);
  }
}
