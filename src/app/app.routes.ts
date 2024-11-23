import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
// Componentes
import { ListManagersComponent } from './components/list-managers/list-managers.component'
import { AddEditManagerComponent } from './components/add-edit-manager/add-edit-manager.component';

export const routes: Routes = [
    { path: '', component: ListManagersComponent },
  { path: 'add', component: AddEditManagerComponent },
  { path: 'edit/:id', component: AddEditManagerComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }