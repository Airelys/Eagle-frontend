import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelName } from 'src/app/models/model_name';
import { SolveModelService } from 'src/app/services/solve-model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  form:FormGroup;
  models = [{name:'SI'},{name:'SIR'},{name:'SIRS'},{name:'SEIR'}]

  constructor(private fb: FormBuilder, private router: Router, private modelService: SolveModelService) {
    this.form = this.fb.group({
      model_name: ['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onSubmit():void{
    const model_name: ModelName = new ModelName()
    model_name.model_name = this.form.get('model_name')?.value;
    this.modelService.updateModelName(model_name);
    this.router.navigate(['/solve_model']);
  }

}
