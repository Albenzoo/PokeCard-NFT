import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './layout/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CreateNftComponent } from './pages/create-nft/create-nft.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from './shared/card/card.component';
import { EnergyChooserComponent } from './shared/energy-chooser/energy-chooser.component'
import { MatChipsModule } from '@angular/material/chips';
import { MatChipList } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { AllCardsComponent } from './pages/all-cards/all-cards.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    CreateNftComponent,
    CardComponent,
    EnergyChooserComponent,
    MyProfileComponent,
    AllCardsComponent,
    CardDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatChipsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatExpansionModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
