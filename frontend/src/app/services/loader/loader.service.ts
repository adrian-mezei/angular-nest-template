import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoaderOverlayComponent } from 'src/app/components/loader-overlay/loader-overlay.component';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private overlayRef?: OverlayRef = undefined;

    constructor(private overlay: Overlay) {}

    public show(message = ''): void {
        // Returns an OverlayRef (which is a PortalHost)

        if (!this.overlayRef) {
            this.overlayRef = this.overlay.create();
        }

        // Create ComponentPortal that can be attached to a PortalHost
        const spinnerOverlayPortal = new ComponentPortal(LoaderOverlayComponent);
        const componentRef = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
        componentRef.instance.message = message;
    }

    public hide(): void {
        if (!!this.overlayRef) {
            this.overlayRef.detach();
        }
    }
}
