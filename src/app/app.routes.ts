import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LuxImportsComponent } from './lux-imports/lux-imports.component';
import { LuxCraftComponent } from './lux-craft/lux-craft.component';
import { LuxTechComponent } from './lux-tech/lux-tech.component';
import { LuxMusicComponent } from './lux-music/lux-music.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { BlogdetComponent } from './blogdet/blogdet.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
      {path: '', component:HomeComponent
    },
      {path: 'import', component:LuxImportsComponent
    },
      {path: 'craft', component:LuxCraftComponent
    },
      {path: 'tech', component:LuxTechComponent
    },
      {path: 'music', component:LuxMusicComponent
    },
      {path: 'about', component:AboutComponent
    },
      {path: 'contact', component:ContactComponent
    },
      {path: 'blog', component:BlogComponent
    },
     {path: 'blogdet/:id', component:BlogdetComponent
    },
     {path: 'details', component: ProductDetailsComponent
    },
      {
        path: 'admin',
        loadChildren: () =>
          import('./Admin/admin.routes').then(m => m.adminRoutes)
      }
    
];
