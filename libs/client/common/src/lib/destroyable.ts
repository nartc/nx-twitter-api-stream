import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class Destroyable implements OnDestroy {
  protected readonly $destroyed = new Subject();

  ngOnDestroy() {
    this.$destroyed.next();
  }
}
