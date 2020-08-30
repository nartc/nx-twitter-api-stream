import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';
import { take } from 'rxjs/operators';
import { DynamicDialogRef } from './dynamic-dialog-ref';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { DynamicDialogConfig } from './dynamic-dialog.config';

@Injectable()
export class DynamicDialogService {
  private readonly defaultDialogConfig: DynamicDialogConfig;

  constructor(private overlay: Overlay, private injector: Injector) {
    this.defaultDialogConfig = new DynamicDialogConfig();
    this.defaultDialogConfig.overlayConfig = new OverlayConfig({
      disposeOnNavigation: true,
      panelClass: 'dynamic-dialog-panel',
      positionStrategy: overlay
        .position()
        .global()
        .centerVertically()
        .centerHorizontally(),
      scrollStrategy: overlay.scrollStrategies.block(),
    });
  }

  open<TReturnType = any>(
    component: Type<any>,
    config?: DynamicDialogConfig,
  ): DynamicDialogRef<TReturnType> {
    const mergeConfig = {
      ...this.defaultDialogConfig,
      ...config,
      overlayConfig: {
        ...this.defaultDialogConfig.overlayConfig,
        ...(config && config.overlayConfig ? config.overlayConfig : {}),
      },
    };
    const overlayRef = this.createOverlay(mergeConfig);
    const dialogRef = new DynamicDialogRef<TReturnType>(overlayRef);
    dialogRef.componentInstance = this.attachDialogContainer(
      overlayRef,
      component,
      dialogRef,
      mergeConfig,
    );
    overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe(dialogRef.close.bind(dialogRef));
    return dialogRef;
  }

  private createOverlay(config: DynamicDialogConfig): OverlayRef {
    return this.overlay.create(config.overlayConfig);
  }

  private attachDialogContainer<TComponent>(
    overlayRef: OverlayRef,
    component: Type<TComponent>,
    dialogRef: DynamicDialogRef,
    dialogConfig: DynamicDialogConfig,
  ): DynamicDialogComponent {
    const injector = this.createInjector(dialogRef, dialogConfig);
    const portal = new ComponentPortal(DynamicDialogComponent, null, injector);
    const containerRef = overlayRef.attach(portal);
    containerRef.instance.childComponentType = component;
    return containerRef.instance;
  }

  private createInjector(
    dialogRef: DynamicDialogRef,
    dialogConfig: DynamicDialogConfig,
  ): Injector {
    return Injector.create({
      providers: [
        { provide: DynamicDialogConfig, useValue: dialogConfig },
        { provide: DynamicDialogRef, useValue: dialogRef },
      ],
      parent: this.injector,
    });
  }
}
