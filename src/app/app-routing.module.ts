import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyserpwdComponent } from './analyserpwd/analyserpwd.component';

const routes: Routes = [
  {path:"pwd", component:AnalyserpwdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
