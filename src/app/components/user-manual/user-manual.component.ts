import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-manual',
  templateUrl: './user-manual.component.html',
  styleUrls: ['./user-manual.component.css']
})
export class UserManualComponent implements OnInit {

  met_num = false;
  met_clas = false;
  met = false;
  esp = false;
  xlsx = false;

  constructor() { }

  ngOnInit(): void {
  }

  MetNum():void{
    this.met_num = true;
    this.met_clas = false;
    this.met = false;
    this.esp = false;
    this.xlsx = false;
  }

  MetClas():void{
    this.met_num = false;
    this.met_clas = true;
    this.met = false;
    this.esp = false;
    this.xlsx = false;
  }

  Met():void{
    this.met_num = false;
    this.met_clas = false;
    this.met = true;
    this.esp = false;
    this.xlsx = false;
  }

  Esp():void{
    this.met_num = false;
    this.met_clas = false;
    this.met = false;
    this.esp = true;
    this.xlsx = false;
  }

  Xlsx():void{
    this.met_num = false;
    this.met_clas = false;
    this.met = false;
    this.esp = false;
    this.xlsx = true;
  }

  closed():void{
    this.met_num = false;
    this.met_clas = false;
    this.met = false;
    this.esp = false;
    this.xlsx = false;
  }

}
