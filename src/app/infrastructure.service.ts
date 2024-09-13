import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  async processCommand(command: string): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.http.post<{ result: string }>(`${this.apiUrl}/command`, { command })
          .pipe(
            map(response => response.result),
            catchError(this.handleError)
          )
      );
      if (typeof response === 'string') {
        return response;
      }
      return 'No response received';
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  }

  private handleError(error: HttpErrorResponse): never {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = error.error.message;
    } else {
      // Backend error
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}