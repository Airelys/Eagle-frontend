import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelComponent } from './components/model/model.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ResultsNumericSolveComponent } from './components/results-numeric-solve/results-numeric-solve.component';
import { ResultsParameterComponent } from './components/results-parameter/results-parameter.component';
import { SolveModelComponent } from './components/solve-model/solve-model.component';

const routes: Routes = [
  {path:'', redirectTo:'routeTitlePage', pathMatch: 'full'},
  {path: 'routeTitlePage', component: PresentationComponent},
  {path:'model', component: ModelComponent},
  {path:'solve_model', component: SolveModelComponent},
  {path:'results_numeric', component: ResultsNumericSolveComponent},
  {path:'results_parameter', component: ResultsParameterComponent},
  {path:'**', redirectTo:'/routeTitlePage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
