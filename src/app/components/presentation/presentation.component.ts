import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolveModelService } from 'src/app/services/solve-model.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  constructor(private router: Router, private modelService: SolveModelService) { }

  ngOnInit(): void {
    this.modelService.updateModelName({} as any);
    this.modelService.updateNumericSolveModel({} as any);
    this.modelService.updateEstimation(false);
    this.modelService.updateBounds(false);
    this.modelService.updateMinMax({} as any);
    this.modelService.updateAll(false);
    this.modelService.updateResultsNumeric({} as any);
    this.modelService.updateResultsParameter({} as any);
    this.modelService.updateGetValid(false);
    this.modelService.updateValid(false);

  }

  start(){
    this.router.navigate(['/model']);
  }

}
