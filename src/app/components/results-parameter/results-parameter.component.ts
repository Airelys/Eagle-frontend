import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModelName } from 'src/app/models/model_name';
import { NumericSolveModels } from 'src/app/models/numeric_solve_model';
import { ResultsParameterEstimation } from 'src/app/models/results_parameter_estimation';
import { SolveModelService } from 'src/app/services/solve-model.service';
import { StyleService } from 'src/app/services/style.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-results-parameter',
  templateUrl: './results-parameter.component.html',
  styleUrls: ['./results-parameter.component.css']
})
export class ResultsParameterComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  results: ResultsParameterEstimation = new ResultsParameterEstimation();
  numeric_solve: NumericSolveModels = new NumericSolveModels();
  model_name: ModelName = new ModelName();
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataObs$!: Observable<any>;
  len!:number;

  constructor(private modelService:SolveModelService, public styleService:StyleService,
              private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscription=this.modelService.obtResultsParameter().subscribe(data => {
      this.results = data,
      this.setPagination(this.results.sol);
      this.len = this.results.sol.length
    });

    this.subscription=this.modelService.obtModelName().subscribe(data => {
      this.model_name = data
    });

    this.subscription=this.modelService.obtNumericSolveModel().subscribe(data => {
      this.numeric_solve = data,
      console.log(this.numeric_solve.params)
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  setPagination(tableData:any) {
    this.dataSource = new MatTableDataSource<any>(tableData);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs$ = this.dataSource.connect();
  }

  downloadPDF() {
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA!, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`resultados.pdf`);
    });
  }
}
