import I18nUtils from "./I18nUtils";

export default class LanguageManager {
    constructor() {
        const localStorageResult = localStorage.getItem('lang');
        const lang = localStorageResult === null ? 'en' : localStorageResult;
        I18nUtils.setLanguage(lang);

        new MutationObserver(() => {
            localStorage.setItem('lang', I18nUtils.getDocumentLanguage());
        }).observe(document.documentElement, {
            attributes: true, //configure it to listen to attribute changes
            attributeFilter: ['lang']
        });
    }
}