// src/app/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { DashboardComponent } from './dashboard/dashboard.component';




import { ContactComponent } from './contact/contact.component';

import { DeliveriesComponent } from './deliveries/deliveries.component';
import { BtsImportsComponent } from './bts-imports/bts-imports.component';
import { BtsCraftsComponent } from './bts-crafts/bts-crafts.component';
import { ImportsComponent } from './imports/imports.component';

import { PaymentsComponent } from './payments/payments.component';
import { RefundsComponent } from './refunds/refunds.component';
import { TechComponent } from './tech/tech.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { ProductsComponent } from './products/products.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'deliveries', component: DeliveriesComponent },
        
          { path: 'b-import', component: BtsImportsComponent },
           { path: 'b-craft', component: BtsCraftsComponent },
            { path: 'Class', component: ImportsComponent},
        { path: 'adminOrder', component: AdminOrderComponent},
          
          { path: 'cont', component: ContactComponent},

            { path: 'Apay', component: PaymentsComponent },
             { path: 'refunds', component: RefundsComponent },
              { path: 'tech-students', component: TechComponent },
               { path: 'order', component: TrackOrderComponent},
                { path: 'product', component: ProductsComponent},
        
        ]
      }
];
