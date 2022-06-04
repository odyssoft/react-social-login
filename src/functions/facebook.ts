export const loadFacebookSdk = (lang: string) => {
  if (document.getElementById('facebook-jssdk')) {
    return
  }
  const element = document.getElementsByTagName('script')[0]
  const clone: any = element
  let source: any = element
  source = document.createElement('script')
  source.id = 'facebook-jssdk'
  source.src = `https://connect.facebook.net/${lang}/sdk.js`
  clone.parentNode.insertBefore(source, clone)
}
