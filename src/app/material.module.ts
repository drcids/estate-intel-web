import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule} from '@angular/material/snack-bar';

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ],
  providers: []
})
export class MaterialModule { }
