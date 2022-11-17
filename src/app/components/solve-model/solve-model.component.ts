import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ModelName } from 'src/app/models/model_name';
import { SolveModelService } from 'src/app/services/solve-model.service';
import { InitializeModelComponent } from './initialize-model/initialize-model.component';

@Component({
  selector: 'app-solve-model',
  templateUrl: './solve-model.component.html',
  styleUrls: ['./solve-model.component.css']
})
export class SolveModelComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  model_name: ModelName = new ModelName();
  estimation: boolean = false

  constructor(private modelService:SolveModelService) {
    this.subscription=this.modelService.obtModelName().subscribe(data => {
      this.model_name = data
    })
    this.subscription=this.modelService.obtEstimation().subscribe(data => {
      this.estimation = data
      console.log(this.estimation)
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
