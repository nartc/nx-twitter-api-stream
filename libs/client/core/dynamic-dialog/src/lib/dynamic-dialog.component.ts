import {
  animateChild,
  AnimationEvent,
  group,
  query,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Type,
  ViewChild,
} from '@angular/core';
import { fadeIn, fadeOut, zoomIn, zoomOut } from '@nartc/client/common';
import { DynamicDialogContentDirective } from './dynamic-dialog-content.directive';
import { AnimationState, DynamicDialogRef } from './dynamic-dialog-ref';
import { DynamicDialogConfig } from './dynamic-dialog.config';

const ESCAPE = 'Escape';

@Component({
  selector: 'nartc-dynamic-dialog',
  template: `
    <div
      class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center flex-col px-4"
      [@animation]="{
        value: animationState,
        params: {
          timing: dialogConfig.containerAnimationTiming,
          delayChild: dialogConfig.animationChildDelay
        }
      }"
      (@animation.start)="animationStateChanged.emit($event)"
      (@animation.done)="animationStateChanged.emit($event)"
    >
      <div
        class="absolute top-0 bottom-0 left-0 right-0 bg-gray-dark opacity-50"
        (click)="onModalBackgroundClick()"
      ></div>
      <div
        class="flex flex-col overflow-hidden relative w-full mx-8"
        style="max-height: calc(100vh - 40px);"
        [@zoom]="{
          value: animationState == 'enter' ? 'in' : 'out',
          params: { timing: dialogConfig.contentAnimationTiming }
        }"
      >
        <header
          class="border-b rounded-t border-secondary items-center flex flex-shrink-0 justify-start relative p-4 bg-accent"
        >
          <p class="text-white flex-grow flex-shrink-0 text-xl leading-none">
            {{ dialogConfig.header }}
          </p>
          <button
            class="h-10 w-10"
            aria-label="close"
            *ngIf="dialogConfig.closable"
            (click)="onCloseClick()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </header>
        <section class="bg-background flex-grow flex-shrink overflow-auto p-4">
          <ng-template nartcDynamicDialogContent></ng-template>
        </section>
      </div>
    </div>
  `,
  styles: [],
  animations: [
    trigger('zoom', [
      transition(
        '* => in',
        useAnimation(zoomIn, { params: { timing: '{{timing}}' } }),
      ),
      transition(
        '* => out',
        useAnimation(zoomOut, { params: { timing: '{{timing}}' } }),
      ),
    ]),
    trigger('animation', [
      transition(
        `* => ${AnimationState.Enter}`,
        group([
          useAnimation(fadeIn, { params: { timing: '{{timing}}' } }),
          query('@zoom', [animateChild({ delay: '{{delayChild}}' })]),
        ]),
      ),
      transition(
        `* => ${AnimationState.Leave}`,
        group([
          useAnimation(fadeOut, { params: { timing: '{{timing}}' } }),
          query('@zoom', [animateChild({ delay: '{{delayChild}}' })]),
        ]),
      ),
    ]),
  ],
})
export class DynamicDialogComponent implements AfterViewInit, OnDestroy {
  animationState: AnimationState = AnimationState.Enter;
  animationStateChanged: EventEmitter<AnimationEvent> = new EventEmitter<
    AnimationEvent
  >();
  childComponentType: Type<any>;

  @ViewChild(DynamicDialogContentDirective, { static: false })
  contentInsertionPoint: DynamicDialogContentDirective;

  private componentRef: ComponentRef<any>;

  constructor(
    public readonly dialogConfig: DynamicDialogConfig,
    private readonly dialogRef: DynamicDialogRef,
    private readonly cfr: ComponentFactoryResolver,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  @HostListener('document:keydown', ['$event'])
  private handleKeydown(event: KeyboardEvent) {
    if (event.key === ESCAPE) {
      this.dialogRef.close();
    }
  }

  ngAfterViewInit(): void {
    this.loadContentComponent(this.childComponentType);
    this.cdr.detectChanges();
  }

  private loadContentComponent(componentType: Type<any>) {
    const factory = this.cfr.resolveComponentFactory(componentType);
    const vcr = this.contentInsertionPoint.viewContainerRef;
    vcr.clear();

    this.componentRef = vcr.createComponent(factory);
  }

  startExitAnimation() {
    this.animationState = AnimationState.Leave;
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  onModalBackgroundClick() {
    this.dialogRef.close();
  }
}
