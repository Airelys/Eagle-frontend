import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor(private sanitizer: DomSanitizer) { }

  urlImage(data:ArrayBuffer){
    let url = 'data:image/png;base64,' + data;
    console.log(this.sanitizer.bypassSecurityTrustUrl(url))
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
