export const decodeParams = (param: string, key: string) =>
  decodeURIComponent(
    param.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  )

export const getParams = (params: Object) =>
  '?' +
  Object.keys(params)
    .map((param) => `${param}=${encodeURIComponent(params[param])}`)
    .join('&')

export const isRedirected = (params = window.location.search) =>
  decodeParams(params, 'state') === 'facebookdirect' &&
  (decodeParams(params, 'code') || decodeParams(params, 'granted_scopes'))
