export default class LanguageManager {
    constructor() {
        const localStorageResult = localStorage.getItem('lang');
        const lang = localStorageResult === null ? 'en' : localStorageResult;
        LanguageManager.setLanguage(lang);

        new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type == "attributes") {
                    if (mutation.attributeName === 'lang') {
                        localStorage.setItem('lang', LanguageManager.getDocumentLanguage());
                    }
                }
            });
        }).observe(document.documentElement, {
            attributes: true //configure it to listen to attribute changes
        })
    }

    public static setLanguage(lang: string) {
        document.documentElement.setAttribute('lang', lang);
    }

    public static getDocumentLanguage(): string {
        return document.documentElement.getAttribute('lang');
    }
}