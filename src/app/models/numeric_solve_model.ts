export class NumericSolveModels{
  model_name:string='';
  vars_initials: Array<object> =[];
  params: Array<object> =[];
  params_est: Array<boolean> =[];
  t: number = 0;
  method: string='';
  P: number = 1;
  di: boolean = false;
}
