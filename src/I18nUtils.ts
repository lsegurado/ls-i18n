export default class I18nUtils {

    public static setLanguage(lang: string) {
        document.documentElement.setAttribute('lang', lang);
    }

    public static getDocumentLanguage(): string {
        return document.documentElement.getAttribute('lang');
    }
}