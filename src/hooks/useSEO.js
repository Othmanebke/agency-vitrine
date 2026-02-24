import { useEffect } from 'react'

const BASE_URL = 'https://wexor.vercel.app'

function setMeta(key, keyVal, content) {
  let el = document.querySelector(`meta[${key}="${keyVal}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(key, keyVal)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * useSEO — met à jour tous les meta tags de la page courante
 * @param {string} title       — ex: "À propos — Wexor"
 * @param {string} description — ~155 caractères max
 * @param {string} path        — ex: "/about"
 */
export function useSEO({ title, description, path = '/' }) {
  useEffect(() => {
    const url = BASE_URL + path

    document.title = title

    setMeta('name', 'description', description)
    setLink('canonical', url)

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)

    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:url', url)
  }, [title, description, path])
}
