import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getNftInfo(url: string): Observable<any> {
    return this.http
      .get(url).pipe(map((response: any) => {
        // modify the response  data
        if (response.image) {
          response.image = response.image.replace('ipfs://', environment.ipfsBaseUrl + 'ipfs/');
        }
        // return the modified data
        return response;
      })
        ,);
  }

}
