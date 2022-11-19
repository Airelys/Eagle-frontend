import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MinMax } from 'src/app/models/min_max';
import { NumericSolveModels } from 'src/app/models/numeric_solve_model';
import { ParameterEstimation } from 'src/app/models/parameter_estimation';
import { ResultsParameterEstimation } from 'src/app/models/results_parameter_estimation';
import { SolveModelService } from 'src/app/services/solve-model.service';
import { UploadService } from 'src/app/services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-parameter-estimation',
  templateUrl: './parameter-estimation.component.html',
  styleUrls: ['./parameter-estimation.component.css']
})
export class ParameterEstimationComponent implements OnInit {

  form:FormGroup;
  subscription: Subscription = new Subscription();
  numeric_solve: NumericSolveModels = new NumericSolveModels();
  min_max: MinMax = new MinMax();
  classical_methods = [{name:'None'},{name:'CG'},{name:'BFGS'},{name:'L-BFGS-B'}];
  metaheuristics = [{name:'None'},{name:'PSO'},{name:'DE'}];
  classical_method = 'None';
  metaheuristic = 'None';
  bounds = false;
  pso = false;
  de = false;
  valid!:boolean;
  shortLink: string = "";
  loading: boolean = false;
  file!: File;

  constructor(private router: Router, private fb: FormBuilder, private modelService:SolveModelService,
              private uploadService:UploadService, private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.form = this.fb.group({
      met:['None',Validators.required],
      clas:['None',Validators.required],
      file: ['',Validators.required],
      iter: ['5',Validators.min(1)&&Validators.required],
      particle: ['5',Validators.min(1)&&Validators.required], cognitive: ['0.5',Validators.required],
      social: ['0.3',Validators.required], inercia: ['0.9',Validators.required],
      population: ['100',Validators.min(1)&&Validators.required], crossing: ['0.8',Validators.required],
      scaled: ['0.6',Validators.required]
    })
  }

  ngOnInit(): void {
    this.subscription=this.modelService.obtNumericSolveModel().subscribe(data => {
      this.numeric_solve = data
      console.log(this.numeric_solve.params)
    });

    this.subscription=this.modelService.obtMinMax().subscribe(data => {
      this.min_max = data
      console.log(this.min_max)
    });

    this.subscription=this.modelService.obtValid().subscribe(data => {
      this.valid = data
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  updateClassicalMethod(value:string){
    this.classical_method = value;
  }

  updateMetaheuristic(value:string){
    this.metaheuristic = value;
    if (this.metaheuristic!='None'){
      this.modelService.updateBounds(true);
      if(this.metaheuristic=='PSO'){
        this.pso = true;
        this.de =false;
      }
      else{
        this.de = true;
        this.pso =false;
      }
    }
    else{
      this.pso = false;
      this.de =false;
      this.modelService.updateBounds(false);
    }
  }

  saveParameterEstimation(): ParameterEstimation{
    const parameter_estimation: ParameterEstimation = new ParameterEstimation();
    parameter_estimation.model_name = this.numeric_solve.model_name
    parameter_estimation.vars_initials = this.numeric_solve.vars_initials;
    parameter_estimation.params = this.numeric_solve.params;
    parameter_estimation.params_est = this.numeric_solve.params_est;
    parameter_estimation.t = this.numeric_solve.t;
    parameter_estimation.method = this.numeric_solve.method;
    parameter_estimation.N = this.numeric_solve.N;
    parameter_estimation.params_min = this.min_max.params_min;
    parameter_estimation.params_max = this.min_max.params_max;
    parameter_estimation.classical_method = this.classical_method;
    parameter_estimation.metaheuristic = this.metaheuristic;
    if(this.metaheuristic!='None'){
      this.form.get('iter')?.value==''? parameter_estimation.iter = 5 : parameter_estimation.iter = this.form.get('iter')?.value;
      if(this.metaheuristic=='PSO'){
        parameter_estimation.particle = this.form.get('particle')?.value;
        parameter_estimation.cognitive = this.form.get('cognitive')?.value;
        parameter_estimation.social = this.form.get('social')?.value;
        parameter_estimation.inercia = this.form.get('inercia')?.value;
        parameter_estimation.population = 0;
        parameter_estimation.crossing = 0;
        parameter_estimation.scaled = 0;
      }
      else{
        parameter_estimation.population = this.form.get('population')?.value;
        parameter_estimation.crossing = this.form.get('crossing')?.value;
        parameter_estimation.scaled = this.form.get('scaled')?.value;
        parameter_estimation.particle = 0;
        parameter_estimation.cognitive = 0;
        parameter_estimation.social = 0;
        parameter_estimation.inercia = 0;
      }
    }
    else{
      parameter_estimation.iter = 0;
      parameter_estimation.particle = 0;
      parameter_estimation.cognitive = 0;
      parameter_estimation.social = 0;
      parameter_estimation.inercia = 0;
      parameter_estimation.population = 0;
      parameter_estimation.crossing = 0;
      parameter_estimation.scaled = 0;
    }
    return parameter_estimation;
  }

  onSubmit():void{
    this.spinner.show();
    this.modelService.updateGetValid(true);

    if(!this.valid || (this.form.get('met')?.value==this.form.get('clas')?.value)){
      this.toastr.error('Datos inválidos','Revise el formulario');
      this.spinner.hide();
    }
    else{

      this.loading = !this.loading;
      console.log(this.file);
      this.uploadService.upload(this.file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {

                  this.shortLink = event.link;

                  this.loading = false;
              }
          });

      this.modelService.updateAll(true);
      const parameter_est: ParameterEstimation = this.saveParameterEstimation();
      var results:ResultsParameterEstimation = new ResultsParameterEstimation();
      this.modelService.parammeterEstimation(parameter_est).subscribe(data => {
        this.spinner.hide();
        results = JSON.parse(String(data));
        this.modelService.updateResultsParameter(results);
        this.router.navigate(['/results_parameter']);
      });
    }
  }

  onChange(event:any){
    this.file = event.target.files[0];
  }
}
