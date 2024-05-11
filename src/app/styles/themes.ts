export {};

export const customDarkColors: Partial<CustomColors> = {
    colorLevel0: '#6383cb',
    colorLevel1: '#006da4',
    colorLevel2: '#006494',
    colorLevel3: '#004d74',
    colorLevel4: '#003554',
    colorLevel5: '#022b42',
    colorLevel6: '#032030',
};

export const customLightColors: Partial<CustomColors> = {
    colorLevel1: '#f0f3fa',
    colorLevel2: '#d5deff',
    colorLevel3: '#b1c9ef',
    colorLevel4: '#8aaee0',
    colorLevel5: '#628ecb',
    colorLevel6: '#395886',
};

export interface CustomColors {
    colorLevel0: string;
    colorLevel1: string;
    'colorLevel1.5': string;
    colorLevel2: string;
    'colorLevel2.5': string;
    colorLevel3: string;
    colorLevel4: string;
    colorLevel5: string;
    colorLevel6: string;
}
