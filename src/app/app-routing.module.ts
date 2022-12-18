import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCardsComponent } from './pages/all-cards/all-cards.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { CreateNftComponent } from './pages/create-nft/create-nft.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'create-nft', component: CreateNftComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'all-cards', component: AllCardsComponent },
  { path: 'card-detail', component: CardDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
