import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { PokemonComponent } from './page/pokemon/pokemon.component';
import { DBZComponent } from './page/dbz/dbz.component';
import { CoctelesComponent } from './page/cocteles/cocteles.component';
import { MiapiComponent } from './page/miapi/miapi.component';
import { ErrorComponent } from './page/error/error.component';
import { MiapiRoutingModule } from './page/miapi/miapi-routing.module';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'pokemon', component: PokemonComponent },
    { path: 'DBZ', component: DBZComponent },
    { path: 'cocteles', component: CoctelesComponent },
    { path: 'Miapi', loadChildren: () => import('./page/miapi/miapi-routing.module').then(m => m.MiapiRoutingModule)},

    { path: '**', component: ErrorComponent }

];
