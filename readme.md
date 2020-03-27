# LS-i18n!
Hi! This is a language manager for vainilla JS.


## How to install it
```
npm install @lsegurado/ls-i18n
```

## How to use it
- Use your HTML lang tag as always
```
<html lang="en">
```
- Put your translations in this directory i18n/"your-translation-name".i18n.en.json
```
Example: i18n/myTranslation.i18n.en.json
```
> Note: Make sure you include it in your build.

- Import dependencies and create two variables:
```
Example in StencilJS
myTranslation.i18n.en.json
{
	"HELLO": Hello world
}

Example.tsx
import I18n from  '@lsegurado/ls-i18n/dist/I18n';
import { I18nDictionary } from  '@lsegurado/ls-i18n/dist/Types';
...
@State() t: I18nDictionary = {}; //This will contain the translations strings
@State() i18n: I18n =  new I18n('myTranslation', (newTranslation: I18nDictionary) => { this.t = newTranslation }); 
//This callback will allow to update your translations when the lang tag changes.
//You can also add a parameter that will set the fallback language if the language you are looking doesn´t exists.
...
...
//This will display Hello world
{this.t.HELLO}
Or
{this.t["HELLO"]}
```

## Other utilities
- Remember the language preferences (using localstorage)
```
Example in StencilJS
import LanguageManager from  '@lsegurado/ls-i18n/dist/LanguageManager';
...
@State() languageManager: LanguageManager =  new LanguageManager((newLanguage: string) =>  this.language = newLanguage);
//It works in similar way that I18n class
@State() language: string;
```
- Obtain and set the document language
```
import I18nUtils from  '@lsegurado/ls-i18n/dist/I18nUtils';
...
I18nUtils.setLanguage('en') //Change the html lang tag to lang="en"
I18nUtils.getDocumentLanguage() //gets "en"
```

