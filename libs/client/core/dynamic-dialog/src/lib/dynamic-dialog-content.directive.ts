import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[nartcDynamicDialogContent]',
})
export class DynamicDialogContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
