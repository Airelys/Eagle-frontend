import { Component, OnDestroy, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModelName } from 'src/app/models/model_name';
import { ResultsNumericSolve } from 'src/app/models/results_numeric_solve';
import { SolveModelService } from 'src/app/services/solve-model.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { StyleService } from 'src/app/services/style.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-numeric-solve',
  templateUrl: './results-numeric-solve.component.html',
  styleUrls: ['./results-numeric-solve.component.css']
})
export class ResultsNumericSolveComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  results: ResultsNumericSolve = new ResultsNumericSolve();
  model_name: ModelName = new ModelName();

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataObs$!: Observable<any>;
  len!:number;

  constructor(private modelService:SolveModelService, public styleService: StyleService,
              private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.subscription=this.modelService.obtResultsNumeric().subscribe(data => {
      this.results = data;
      this.setPagination(this.results.sol);
      this.len = this.results.sol.length;
    });

    this.subscription=this.modelService.obtModelName().subscribe(data => {
      this.model_name = data;
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
