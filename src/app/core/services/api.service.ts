import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, concat, concatMap, from, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';
import { PinataService } from './pinata.service';
import { SnackBarService } from './snack-bar.service';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private snackBarService: SnackBarService, private spinner: NgxSpinnerService, private http: HttpClient, private pinataService: PinataService, public walletService: WalletService) { }




  loadCardToIPFS(newCard: Card, price: number) {
    this.spinner.show();
    this.pinataService.uploadFileToIPFS(newCard.image as File).pipe(
      switchMap(response1 => {
        newCard.image = response1.pinataURL;
        return this.pinataService.uploadJSONToIPFS(newCard);
      }),
      switchMap(response2 => of(this.walletService.mintNFT(response2.pinataURL, price)))
    ).subscribe({
      error: (error: any) => {
        this.snackBarService.openSnackBar(error, "OK", true);
        this.spinner.hide();
        console.log("error uploading the card:", error);
      },
      complete: () => {
        console.log("Completed");
      },
    });

  }


}
