import { I18nDictionary } from './Types';
import I18nUtils from "./I18nUtils";

export interface OnLanguageChangeFunction {
    (translations: I18nDictionary): void;
}

export default class I18n {
    private fileName: string;
    private onLanguageChange: OnLanguageChangeFunction;
    private defaultLanguage: string;

    constructor(fileName: string, onLanguageChange: OnLanguageChangeFunction, defaultLanguage: string = 'en') {
        this.fileName = fileName;
        this.defaultLanguage = defaultLanguage;
        this.onLanguageChange = onLanguageChange;
        this.fetchTranslations();

        new MutationObserver(() => {
            this.fetchTranslations();
        }).observe(document.documentElement, {
            attributes: true, //configure it to listen to attribute changes
            attributeFilter: ['lang']
        });
    }

    private async fetchTranslations() {
        let json: I18nDictionary = {};
        try {
            const documentLanguageResponse = await fetch(`/i18n/${this.fileName}.i18n.${I18nUtils.getDocumentLanguage()}.json`);
            json = await documentLanguageResponse.json();
        } catch (ex) {
            console.error('File not found, using default language');
            try {
                const defaultLanguageResponse = await fetch(`/i18n/${this.fileName}.i18n.${this.defaultLanguage}.json`);
                json = await defaultLanguageResponse.json();
            } catch (ex) {
                console.error('Default language not found, using an empty object');
            }
        }
        this.onLanguageChange(json);
    }
}