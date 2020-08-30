import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DynamicDialogComponent } from './dynamic-dialog.component';

const AnimationPhase = {
  START: 'start',
  DONE: 'done',
};

export enum AnimationState {
  Void = 'void',
  Enter = 'enter',
  Leave = 'leave',
}

export class DynamicDialogRef<TReturnType = any> {
  private beforeClosed$: Subject<void> = new Subject<void>();
  private afterClosed$: Subject<TReturnType> = new Subject<TReturnType>();

  constructor(private overlayRef: OverlayRef) {}

  componentInstance: DynamicDialogComponent;

  close(data?: TReturnType): void {
    this.componentInstance.animationStateChanged
      .pipe(
        filter((event) => event.phaseName === AnimationPhase.START),
        take(1),
      )
      .subscribe(() => {
        this.beforeClosed$.next();
        this.beforeClosed$.complete();
        this.overlayRef.detachBackdrop();
      });

    this.componentInstance.animationStateChanged
      .pipe(
        filter(
          (event) =>
            event.phaseName === AnimationPhase.DONE &&
            event.toState === AnimationState.Leave,
        ),
        take(1),
      )
      .subscribe(() => {
        this.overlayRef.dispose();
        this.afterClosed$.next(data);
        this.afterClosed$.complete();
        this.componentInstance = null;
      });

    this.componentInstance.startExitAnimation();
  }

  get beforeClosed(): Observable<void> {
    return this.beforeClosed$.asObservable();
  }

  get afterClosed(): Observable<TReturnType> {
    return this.afterClosed$.asObservable();
  }
}
