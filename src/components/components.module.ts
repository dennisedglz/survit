import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CheckboxComponent } from './checkbox/checkbox';
import { Checkbox2Component } from './checkbox2/checkbox2';
import { EndSurveyComponent } from './end-survey/end-survey';
import { JustTextComponent } from './just-text/just-text';
import { NumberInputComponent } from './number-input/number-input';
import { RangeInputComponent } from './range-input/range-input';
import { SimpleInputComponent } from './simple-input/simple-input';
import { SkeletonItemComponent } from './skeleton-item/skeleton-item';
import { TablaComponent } from './tabla/tabla';
@NgModule({
	declarations: [
		JustTextComponent,
		CheckboxComponent,
        NumberInputComponent,
        Checkbox2Component,
        RangeInputComponent,
        EndSurveyComponent,
        SimpleInputComponent,
        SkeletonItemComponent,
    TablaComponent,
	],
	imports: [IonicModule],
	exports: [
	    JustTextComponent,
		CheckboxComponent,
        NumberInputComponent,
        Checkbox2Component,
        RangeInputComponent,
        EndSurveyComponent,
        SimpleInputComponent,
        SkeletonItemComponent,
    TablaComponent,
	]
})
export class ComponentsModule {}
