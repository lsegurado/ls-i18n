import I18nUtils from "./I18nUtils";

export interface OnLanguageChangeFunction {
    (newLanguage: string): void;
}

export default class LanguageManager {
    constructor(onLanguageChange: OnLanguageChangeFunction) {
        const localStorageResult = localStorage.getItem('lang');
        const lang = localStorageResult === null ? 'en' : localStorageResult;
        I18nUtils.setLanguage(lang);
        onLanguageChange(lang);

        new MutationObserver(() => {
            localStorage.setItem('lang', I18nUtils.getDocumentLanguage());
            onLanguageChange(I18nUtils.getDocumentLanguage());
        }).observe(document.documentElement, {
            attributes: true, //configure it to listen to attribute changes
            attributeFilter: ['lang']
        });
    }
}