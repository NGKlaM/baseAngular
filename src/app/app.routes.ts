import { Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/ProductAmin/products/products.component';
import { CreateComponent } from './pages/ProductAmin/create/create.component';
import { EditComponent } from './pages/ProductAmin/edit/edit.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    {path: 'admin', component: AdminComponent,
    children: [
        {path: 'admin', component: ProductsComponent},
        { path: 'products', component: ProductsComponent }, 
        { path: 'create', component: CreateComponent }, 
        { path: 'products/:id', component: EditComponent},
    ]
},
];
