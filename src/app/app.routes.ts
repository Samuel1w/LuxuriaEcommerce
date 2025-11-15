import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LuxCraftComponent } from './lux-craft/lux-craft.component';
import { LuxTechComponent } from './lux-tech/lux-tech.component';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { TrackComponent } from './track/track.component';
import { LearnComponent } from './learn/learn.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { DigitalComponent } from './digital/digital.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
      {path: '', component:HomeComponent
    },
     
      {path: 'craft', component:LuxCraftComponent
    },
     {path: 'login', component:LoginModalComponent
    },
      {path: 'tech', component:LuxTechComponent
    },
      {path: 'order', component:OrderComponent
    },
      
      {path: 'about', component:AboutComponent
    },
      {path: 'contact', component:ContactComponent
    },
    { path: 'cart', component: CartComponent },

     {path: 'tracking', component:TrackComponent
    },
     {path: 'learn', component:LearnComponent
    },
    {path: 'acc', component:AccountComponent
    },
    {path: 'digital', component:DigitalComponent
    },
   
     {path: 'prodet/:id', component: ProductDetailsComponent
    },
      {
        path: 'admin',
        loadChildren: () =>
          import('./Admin/admin.routes').then(m => m.adminRoutes)
      }
    
];
