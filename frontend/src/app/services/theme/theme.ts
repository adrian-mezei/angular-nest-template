export interface Theme {
    name: string;
    bootstrap?: string;
    properties: ThemeProperties;
}

export interface ThemeProperties {
    // global

    // auth
    '--auth-google-icon'?: string;
}

export const dark: Theme = {
    name: 'dark',
    bootstrap: 'assets/css/themes/darkly.bootstrap.min.css', // https://bootswatch.com/darkly/
    properties: {
        '--auth-google-icon': 'assets/icons/google.png',
    },
};

export const light: Theme = {
    name: 'light',
    bootstrap: 'assets/css/themes/default.bootstrap.min.css',
    properties: {
        '--auth-google-icon': 'assets/icons/google.png',
    },
};
