import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, connect, connectable, filter, fromEvent, interval, map, Observable, ReplaySubject, scan, share, Subject, tap } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { ajax } from "rxjs/ajax";
import { ApiService } from 'src/app/core/services/api.service';



interface UserResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}
@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.scss']
})

export class CreateNftComponent implements OnInit {
  imageFile: File = <File>{};


  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }


  onFileSelected(event: any) {
    const file: File = event?.target?.files[0];
    if (file) {
      this.imageFile = file;


      //const formData = new FormData();
      //formData.append("thumbnail", file);
      //const upload$ = this.http.post("/api/thumbnail-upload", formData);
      //upload$.subscribe();
    }
  }
  uploadCard() {
    this.apiService.loadCardToIPFS(this.imageFile);

  }

}
