import LanguageManager from "./LanguageManager";

export interface OnLanguageChangeFunction {
    (translations: any): void;
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

        const self = this;
        new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type == "attributes") {
                    if (mutation.attributeName === 'lang') {
                        self.fetchTranslations();
                    }
                }
            });
        }).observe(document.documentElement, {
            attributes: true //configure it to listen to attribute changes
        })
    }

    private async fetchTranslations() {
        let json: any = {};
        try {
            const documentLanguageResponse = await fetch(`/i18n/${this.fileName}.i18n.${LanguageManager.getDocumentLanguage()}.json`);
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