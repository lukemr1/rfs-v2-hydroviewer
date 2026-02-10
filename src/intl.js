const locales = {
  en: () => import('./json/locales/en-US.json'),
  es: () => import('./json/locales/es.json'),
  fr: () => import('./json/locales/fr.json'),
}

const detectLang = () => {
  const stored = localStorage.getItem('lang')
  if (stored && locales[stored]) return stored
  const browserLangs = navigator.languages || [navigator.language]
  for (const tag of browserLangs) {
    const prefix = tag.split('-')[0]
    if (locales[prefix]) return prefix
  }
  return 'en'
}

const lang = detectLang()
document.documentElement.lang = lang

const module = await locales[lang]()
const text = module.default

const resolve = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj)

const hydrateDOM = () => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = resolve(text, el.dataset.i18n)
    if (val != null) el.textContent = val
  })
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = resolve(text, el.dataset.i18nHtml)
    if (val != null) el.innerHTML = val
  })
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = resolve(text, el.dataset.i18nPlaceholder)
    if (val != null) el.placeholder = val
  })
  document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
    const val = resolve(text, el.dataset.i18nTooltip)
    if (val != null) el.setAttribute('data-tooltip', val)
  })
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const val = resolve(text, el.dataset.i18nTitle)
    if (val != null) el.title = val
  })
}

const setLang = (newLang) => {
  localStorage.setItem('lang', newLang)
  window.location.reload()
}

hydrateDOM()

window.text = text
window.setLang = setLang

export {lang, text}
