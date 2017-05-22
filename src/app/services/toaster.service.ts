import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class ToasterService {

    constructor(private snackBar: MdSnackBar) {
    }

    showToaster(msg: string,duration:number) {
        this.snackBar.open(msg, null, {
            duration: duration,
        });
    }
}