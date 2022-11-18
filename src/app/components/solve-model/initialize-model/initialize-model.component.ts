import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolveModelService } from 'src/app/services/solve-model.service';
import { Subscription} from 'rxjs'
import { ModelName } from 'src/app/models/model_name';
import { NumericSolveModels } from 'src/app/models/numeric_solve_model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinMax } from 'src/app/models/min_max';
import { ResultsNumericSolve } from 'src/app/models/results_numeric_solve';

@Component({
  selector: 'app-initialize-model',
  templateUrl: './initialize-model.component.html',
  styleUrls: ['./initialize-model.component.css']
})
export class InitializeModelComponent implements OnInit, OnDestroy {

  form:FormGroup;
  subscription: Subscription = new Subscription();
  model_name: ModelName = new ModelName();
  vars_initials = [{},{},{},{}];
  params_initials = [{},{},{},{},{},{},{}];
  params_est = [false,false,false,false,false,false,false];
  params_max = [1,1,1,1,1,1,1];
  params_min = [0,0,0,0,0,0,0];
  methods = [{name:'RK45'},{name:'RK23'},{name:'DOP853'},{name:'Radau'},{name:'BDF'},{name:'LSODA'}];
  estimation = false;
  bounds = false;
  update = false;
  validation = false;

  constructor( private router: Router, private modelService:SolveModelService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      beta:[Number,Validators.required], gamma:[Number,Validators.required],
      delta:[Number,Validators.required], e:[Number,Validators.required],
      lambda:[Number,Validators.required], mu:[Number,Validators.required],
      m:[Number,Validators.required],
      beta_min:['0',Validators.required], gamma_min:['0',Validators.required],
      delta_min:['0',Validators.required], e_min:['0',Validators.required],
      lambda_min:['0',Validators.required], mu_min:['0',Validators.required],
      m_min:['0',Validators.required],
      beta_max:['1',Validators.required], gamma_max:['1',Validators.required],
      delta_max:['1',Validators.required], e_max:['1',Validators.required],
      lambda_max:['1',Validators.required], mu_max:['1',Validators.required],
      m_max:['1',Validators.required],
      method: ['RK45',Validators.required],
      S:[Number,Validators.min(0)&&Validators.required],I:[Number,Validators.min(0)&&Validators.required],
      R:[Number,Validators.min(0)&&Validators.required],E:[Number,Validators.min(0)&&Validators.required],
      t:['10',Validators.min(1)&&Validators.required],
      total_points:['20',Validators.min(1)&&Validators.required],
      N:['1',Validators.min(1)&&Validators.required]
    })
  }

  ngOnInit(): void {
    this.subscription=this.modelService.obtModelName().subscribe(data => {
      this.model_name = data
      console.log(this.model_name.model_name)
    })

    this.subscription=this.modelService.obtBounds().subscribe(data => {
      this.bounds = data
      console.log(this.bounds)
    })

    this.subscription=this.modelService.obtUpdate().subscribe(data => {
      this.update = data
      console.log(this.update)
      if(this.update){
        this.save()
      }
    })
    this.subscription=this.modelService.obtGetValid().subscribe(data => {
      this.validation = data
      console.log('validation' + this.validation)
      if(this.validation){
        this.isValid()
      }
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  updateParamsInitials(position:number,value:string):void{
    this.params_initials.splice(position,1,Number(value))
  }

  updateVarsInitials(position:number,value:string):void{
    this.vars_initials.splice(position,1,Number(value))
  }

  updateParamsEstInitials(position:number,value:string):void{
    this.params_est.splice(position,1,Boolean(value))
  }

  updateParamsMinInitials(position:number,value:string):void{
    this.params_min.splice(position,1,Number(value))
  }

  updateParamsMaxInitials(position:number,value:string):void{
    this.params_max.splice(position,1,Number(value))
  }

  updateModelData():void{

    switch(this.model_name.model_name){
      case 'SI':
        this.params_initials= [this.params_initials[0],this.params_initials[4],this.params_initials[5],this.params_initials[6]];
        this.params_est= [this.params_est[0],this.params_est[4],this.params_est[5],this.params_est[6]];
        this.params_min= [this.params_min[0],this.params_min[4],this.params_min[5],this.params_min[6]];
        this.params_max= [this.params_max[0],this.params_max[4],this.params_max[5],this.params_max[6]];
        this.vars_initials = [this.vars_initials[0],this.vars_initials[1]];
        break;
      case 'SIR':
        this.params_initials= [this.params_initials[0],this.params_initials[1],this.params_initials[4],this.params_initials[5],this.params_initials[6]];
        this.params_est= [this.params_est[0],this.params_est[1],this.params_est[4],this.params_est[5],this.params_est[6]];
        this.params_min= [this.params_min[0],this.params_min[1],this.params_min[4],this.params_min[5],this.params_min[6]];
        this.params_max= [this.params_max[0],this.params_max[1],this.params_max[4],this.params_max[5],this.params_max[6]];
        this.vars_initials = [this.vars_initials[0],this.vars_initials[1],this.vars_initials[2]];
        break;
      case 'SIRS':
        this.params_initials= [this.params_initials[0],this.params_initials[1],this.params_initials[2],this.params_initials[4],this.params_initials[5],this.params_initials[6]]
        this.params_est= [this.params_est[0],this.params_est[1],this.params_est[2],this.params_est[4],this.params_est[5],this.params_est[6]]
        this.params_min= [this.params_min[0],this.params_min[1],this.params_min[2],this.params_min[4],this.params_min[5],this.params_min[6]]
        this.params_max= [this.params_max[0],this.params_max[1],this.params_max[2],this.params_max[4],this.params_max[5],this.params_max[6]]
        this.vars_initials = [this.vars_initials[0],this.vars_initials[1],this.vars_initials[2]];
        break;
      case 'SEIR':
        this.params_initials= [this.params_initials[0],this.params_initials[3],this.params_initials[1],this.params_initials[4],this.params_initials[5],this.params_initials[6]];
        this.params_est= [this.params_est[0],this.params_est[3],this.params_est[1],this.params_est[4],this.params_est[5],this.params_est[6]];
        this.params_min= [this.params_min[0],this.params_min[3],this.params_min[1],this.params_min[4],this.params_min[5],this.params_min[6]];
        this.params_max= [this.params_max[0],this.params_max[3],this.params_max[1],this.params_max[4],this.params_max[5],this.params_max[6]];
        this.vars_initials = [this.vars_initials[0],this.vars_initials[1],this.vars_initials[2],this.vars_initials[3]];
        break;
      default:
        break
    }
  }

  saveNumericSolveModel():NumericSolveModels{
    this.updateModelData();
    const numeric_solve_models: NumericSolveModels = new NumericSolveModels();
    numeric_solve_models.model_name = this.model_name.model_name
    numeric_solve_models.vars_initials = this.vars_initials;
    numeric_solve_models.params = this.params_initials;
    numeric_solve_models.params_est = this.params_est;
    numeric_solve_models.t = this.form.get('t')?.value;
    numeric_solve_models.total_points = this.form.get('total_points')?.value;
    numeric_solve_models.method = this.form.get('method')?.value;
    numeric_solve_models.N = this.form.get('N')?.value;
    return numeric_solve_models
  }

  onSubmit(): void{
    const numeric_solve_models: NumericSolveModels = this.saveNumericSolveModel();
    numeric_solve_models.params_est = [false,false,false,false,false,false,false];
    var results:ResultsNumericSolve = new ResultsNumericSolve();
    this.modelService.numericSolve(numeric_solve_models).subscribe(data => {
      console.log(data)
      results = JSON.parse(String(data));
      console.log(results)
      this.modelService.updateResultsNumeric(results);

      this.router.navigate(['/results_numeric']);
    });

  }

  updateEstimation():void{
    this.modelService.updateEstimation(true);
    this.estimation = true;
  }

  save():void{
    const numeric_solve_models: NumericSolveModels = this.saveNumericSolveModel();
    this.modelService.updateNumericSolveModel(numeric_solve_models);
    const min_max: MinMax = new MinMax();
    min_max.params_min = this.params_min;
    min_max.params_max = this.params_max;
    this.modelService.updateMinMax(min_max);
  }

  isValid(){
    const is = (element:boolean)=>element;
    var valid = this.form.valid && this.params_est.some(is);
    console.log('Valid');
    console.log(valid);
    this.modelService.updateValid(valid);
  }
}

