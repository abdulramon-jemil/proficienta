import { PUBLIC_ENV_SITE_ORIGIN } from "./env"

export const NEXT_URL_FALLBACK = "/"
export const NEXT_URL_QUERY_PARAM = "next"

export function toUsableURLObject(string: string) {
  const siteOrigin = PUBLIC_ENV_SITE_ORIGIN
  const siteOriginURLObject = new URL(siteOrigin)
  let url: URL | null = null

  try {
    url = new URL(string, siteOriginURLObject.origin)
  } catch (error) {
    // string is not usable as url or part of a url
    url = siteOriginURLObject
  }

  if (url.host !== siteOriginURLObject.host) return siteOriginURLObject
  return url
}

function getOriginLessUrlHref(urlObject: URL) {
  return `${urlObject.pathname}${urlObject.search}${urlObject.hash}`
}

export function nextUrlFor(url: string, includeOrigin = false) {
  if (url === "")
    throw new TypeError("Cannot get next url for non string value")

  const usableURLObject = toUsableURLObject(url)
  const definedNextURL = usableURLObject.searchParams.get(NEXT_URL_QUERY_PARAM)

  const usableNextURLObject = toUsableURLObject(
    definedNextURL ?? NEXT_URL_FALLBACK
  )

  return includeOrigin
    ? usableNextURLObject.href
    : getOriginLessUrlHref(usableNextURLObject)
}

export function assignNextURL(
  url: string,
  nextURL: string,
  includeOrigin = false
) {
  if (url === "")
    throw new TypeError("Cannot assign next url to non string value")

  if (nextURL === "")
    throw new TypeError("Cannot assign non string value as next url")

  let urlObjectAsAbsolute: URL | null = null

  try {
    urlObjectAsAbsolute = new URL(url)
  } catch (error) {
    urlObjectAsAbsolute = null
  }

  const siteOrigin = PUBLIC_ENV_SITE_ORIGIN
  const siteOriginURLObject = new URL(siteOrigin)
  const urlIsAbsolute = urlObjectAsAbsolute !== null

  if (
    urlObjectAsAbsolute !== null &&
    urlObjectAsAbsolute.host !== siteOriginURLObject.host
  ) {
    throw new Error(`Expected original URL to have the origin ${siteOrigin}`)
  }

  const URLObjectToUse = urlObjectAsAbsolute ?? toUsableURLObject(url)
  const nextURLObjectToUse = toUsableURLObject(nextURL)

  const finalNextURLString = includeOrigin
    ? nextURLObjectToUse.href
    : getOriginLessUrlHref(nextURLObjectToUse)

  URLObjectToUse.searchParams.set(NEXT_URL_QUERY_PARAM, finalNextURLString)
  return urlIsAbsolute
    ? URLObjectToUse.href
    : getOriginLessUrlHref(URLObjectToUse)
}

export function hasDistinctNextURL(url: string) {
  if (url === "")
    throw new TypeError("Cannot assign next url to non string value")

  if (nextUrlFor(url) === NEXT_URL_FALLBACK) return false
  return true
}

export function getDistinctNextURL(
  url: string,
  fallbackURL: string,
  includeOrigin = false
) {
  const definedNextURL = nextUrlFor(url, includeOrigin)
  if (definedNextURL !== NEXT_URL_FALLBACK) return definedNextURL

  const usableFallbackURLObject = toUsableURLObject(fallbackURL)
  return includeOrigin
    ? usableFallbackURLObject.href
    : getOriginLessUrlHref(usableFallbackURLObject)
}
