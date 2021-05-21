import { Injectable } from '@angular/core';
import { Theme, dark, light } from './theme';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private active: Theme = light;
    private availableThemes: Theme[] = [dark, light];

    getAvailableThemes(): Theme[] {
        return this.availableThemes;
    }

    getActiveTheme(): Theme {
        return this.active;
    }

    applyTheme(): void {
        if (this.active) {
            this.setActiveTheme(this.active);
        }
    }

    setActiveTheme(theme: Theme): void {
        this.active = theme;

        if (theme.bootstrap) {
            const newLink = document.createElement('link') as HTMLLinkElement;
            newLink.rel = 'preload';
            newLink.as = 'style';
            newLink.href = theme.bootstrap;
            newLink.onload = (ev) => (newLink.rel = 'stylesheet');
            document.getElementsByTagName('head')[0].appendChild(newLink);
        }

        Object.keys(theme.properties).forEach((property) => {
            document.documentElement.style.setProperty(property, (theme.properties as any)[property]);
        });
    }
}
