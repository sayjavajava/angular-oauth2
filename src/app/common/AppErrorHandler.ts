

import {ErrorHandler} from "@angular/core";

export class AppErrorHandler implements ErrorHandler{
  handleError(error: any): void {
   // alert('un-expected Error ');
console.log('cause of error'+ error);

  }


}
