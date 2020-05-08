import { TRANSLATION as SPANISH_TRANSLATION } from './es.js'
import { TRANSLATION as ENGLISH_TRANSLATION } from './en.js'
import { TRANSLATION as EN_GB_TRANSLATION } from './en_GB.js'

export const getMessages = (userLocale) => {
    switch (userLocale) {
        case 'es':
            return SPANISH_TRANSLATION;
        case 'en_GB':
            return EN_GB_TRANSLATION;
        default:
            return ENGLISH_TRANSLATION;
    }
}
