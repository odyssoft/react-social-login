import { Button } from '@nextui-org/react'
import React from 'react'

import {
  getParams,
  isMobile,
  isRedirected,
  loadFacebookSdk,
} from '../functions'
import FacebookIcon from '../icons/facebook'
import {
  FacebookFailureResponse,
  FacebookLoginInfo,
  FacebookLoginProps,
} from '../types'

export const FacebookLogin = ({
  appId,
  css,
  fields,
  isDisabled,
  language,
  onClick,
  onSuccess,
  onFailure,
  render,
  scope,
  text,
  ...rest
}: FacebookLoginProps) => {
  const [isSdkLoaded, setIsSdkLoaded] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const checkLogin = (response: any) =>
    response.status === 'connected'
      ? checkState(response)
      : window.FB.login((loginResponse: any) => checkState(loginResponse), true)

  const checkState = ({ authResponse, status }: any) => {
    setIsLoading(false)
    if (authResponse) {
      return responseApi(authResponse)
    }
    return onFailure ? onFailure({ status }) : onSuccess({ status })
  }

  const handleClick = (e: any) => {
    if (!isSdkLoaded || isLoading || isDisabled) {
      return
    }
    setIsLoading(true)

    if (typeof onClick === 'function') {
      onClick(e)
      if (e.defaultPrevented) {
        setIsLoading(false)
        return
      }
    }

    const params = {
      client_id: appId,
      redirect_uri: 'window.location.href (mobile-only)',
      return_scopes: false,
      response_type: 'code',
    }

    if (isMobile()) {
      const locParams = getParams(params)
      window.location.href = `https://www.facebook.com/dialog/oauth${locParams}`
    } else {
      if (!window.FB) {
        if (onFailure) {
          onFailure({ status: 'facebookNotLoaded' })
        }

        return
      }

      window.FB.getLoginStatus((response: any) => {
        if (response.status === 'connected') {
          checkState(response)
        } else {
          window.FB.login(checkState, {
            scope,
            return_scopes: params.return_scopes,
          })
        }
      })
    }
    onClick && onClick(e)
  }

  const initFB = () =>
    (window.fbAsyncInit = () => {
      window.FB.init({
        version: 'v3.1',
        appId,
        xfbml: false,
        cookie: false,
      })
      setIsSdkLoaded(true)
      if (isRedirected()) {
        window.FB.getLoginStatus(checkLogin)
      }
    })

  const responseApi = (
    authResponse: FacebookLoginInfo | FacebookFailureResponse
  ) =>
    window.FB.api(
      '/me',
      { locale: language ?? 'en_US', fields: fields ?? 'name' },
      (response: any) => {
        Object.assign(response, authResponse)
        onSuccess(response)
      }
    )

  React.useEffect(() => {
    if (document.getElementById('facebook-jssdk')) {
      return setIsSdkLoaded(true)
    }
    initFB()
    loadFacebookSdk(language ?? 'en_US')
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div')
      fbRoot.id = 'fb-root'
      document.body.appendChild(fbRoot)
    }
  }, [])

  return render ? (
    render({
      onClick: handleClick,
      isDisabled: !!isDisabled,
      isLoading,
      isSdkLoaded,
    })
  ) : (
    <Button
      css={{
        ...css,
        '& .nextui-button-text': {
          marginLeft: '$10',
        },
      }}
      icon={<FacebookIcon />}
      onClick={handleClick}
      {...rest}
    >
      {text ?? 'Login with Facebook'}
    </Button>
  )
}

export default FacebookLogin
