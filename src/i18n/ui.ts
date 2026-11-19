// Translations and localized routes. German is the default language (served at /),
// English lives under /en/.

export const languages = {
  de: { label: 'DE', name: 'Deutsch', htmlLang: 'de-CH', ogLocale: 'de_CH' },
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_GB' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'de';

/** Pages that exist in every language, with their localized paths. */
export const routes = {
  home: { de: '/', en: '/en/' },
  imprint: { de: '/impressum/', en: '/en/imprint/' },
  privacy: { de: '/datenschutz/', en: '/en/privacy/' },
} as const;

export type Page = keyof typeof routes;

export const ui = {
  de: {
    'meta.title': 'ionics – Software Engineering',
    'meta.description':
      'ionics entwickelt seit 2014 Software – von industriellen IoT-Anwendungen über die Cloud bis zur Entwicklung mit künstlicher Intelligenz.',
    'skip': 'Zum Inhalt springen',
    'home.link': 'ionics – zur Startseite',
    'lang.switch': 'Sprache wählen',

    'hero.title': 'Software Engineering seit {year}.',
    'hero.lead':
      'Von industriellen IoT-Anwendungen über die Cloud bis zur Entwicklung mit künstlicher Intelligenz – ionics entwickelt seit vielen Jahren Software und ist mit der Technologie gewachsen.',
    'hero.imageAlt':
      'Panorama der Walliser Alpen mit dem Matterhorn über einem Nebelmeer im Morgenlicht',

    'journey.eyebrow': 'Unser Weg',
    'journey.title': 'Vom handgeschriebenen Code zur KI.',
    'journey.lead':
      'Als wir angefangen haben, wurde jede Zeile Code noch von Hand geschrieben. Heute wird vieles automatisiert und künstliche Intelligenz ist aus der Entwicklung nicht mehr wegzudenken. Eine spannende Zeit – und wir sind mittendrin.',
    'journey.stages': [
      {
        title: 'Industrie & IoT',
        text: 'Software für industrielle Anwendungen: Geräte, Sensoren und Maschinen vernetzen und ihre Daten nutzbar machen.',
      },
      {
        title: 'Cloud',
        text: 'Webapplikationen und Plattformen in der Cloud – vernetzt, skalierbar und von überall erreichbar.',
      },
      {
        title: 'Künstliche Intelligenz',
        text: 'Heute entwickeln wir mit und für KI: Abläufe werden automatisiert und KI ist fester Teil unserer Arbeit.',
      },
    ],

    'contact.title': 'Kontakt',
    'contact.map': 'Auf der Karte anzeigen',
    'country': 'Schweiz',

    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.legal': 'Rechtliches',
  },
  en: {
    'meta.title': 'ionics – Software Engineering',
    'meta.description':
      'ionics has been building software since 2014 – from industrial IoT applications to the cloud to development with artificial intelligence.',
    'skip': 'Skip to content',
    'home.link': 'ionics – home',
    'lang.switch': 'Choose language',

    'hero.title': 'Software engineering since {year}.',
    'hero.lead':
      'From industrial IoT applications to the cloud to development with artificial intelligence – ionics has been building software for many years and has grown with the technology.',
    'hero.imageAlt':
      'Panorama of the Valais Alps with the Matterhorn above a sea of fog in the morning light',

    'journey.eyebrow': 'Our journey',
    'journey.title': 'From hand-written code to AI.',
    'journey.lead':
      'When we started out, every line of code was still written by hand. Today much of it is automated and artificial intelligence has become an integral part of software development. An exciting time – and we are right in the middle of it.',
    'journey.stages': [
      {
        title: 'Industry & IoT',
        text: 'Software for industrial applications: connecting devices, sensors and machines and making their data usable.',
      },
      {
        title: 'Cloud',
        text: 'Web applications and platforms in the cloud – connected, scalable and accessible from anywhere.',
      },
      {
        title: 'Artificial intelligence',
        text: 'Today we build with and for AI: processes are automated and AI is an integral part of our work.',
      },
    ],

    'contact.title': 'Contact',
    'contact.map': 'View on map',
    'country': 'Switzerland',

    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
    'footer.legal': 'Legal',
  },
} as const;

export function useTranslations(lang: Lang) {
  return ui[lang];
}

export function localizedPath(page: Page, lang: Lang) {
  return routes[page][lang];
}
