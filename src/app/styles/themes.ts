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
    colorLevel2: '#E8F4FF',
    colorLevel3: '#D0E9FF',
    colorLevel4: '#A8D5FF',
    colorLevel5: '#FCFCFC',
    colorLevel6: '#F0F3FC',
};

export interface CustomColors {
    colorLevel0: string;
    colorLevel1: string;
    colorLevel2: string;
    colorLevel3: string;
    colorLevel4: string;
    colorLevel5: string;
    colorLevel6: string;
}
