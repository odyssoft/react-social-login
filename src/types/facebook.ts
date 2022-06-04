import { ButtonProps } from '@nextui-org/react'

export interface FacebookLoginProps extends ButtonProps {
  appId: string
  fields?: string
  isDisabled?: boolean
  language?: string
  onSuccess(userInfo: FacebookResponse): void
  onFailure?(response: FacebookFailureResponse): void
  render?(props: any): JSX.Element
  scope?: string
  text?: string
}

export type FacebookResponse = FacebookLoginInfo | FacebookFailureResponse

export type FacebookLoginRenderProps = {
  onClick: any
  isDisabled: boolean
  isLoading: boolean
  isSdkLoaded: boolean
}

export type FacebookFailureResponse = {
  status?: string | undefined
}

export type FacebookPicture = {
  data: {
    height?: number | undefined
    is_silhouette?: boolean | undefined
    url?: string | undefined
    width?: number | undefined
  }
}

export type FacebookLoginInfo = {
  id: string
  userID: string
  accessToken: string
  name?: string | undefined
  email?: string | undefined
  picture?: FacebookPicture | undefined
}

export type FacebookLoginState = {
  isSdkLoaded?: boolean | undefined
  isLoading?: boolean | undefined
}
