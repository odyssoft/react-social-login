import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { FacebookLogin } from './facebook'
import { FacebookResponse } from '../types'

export default {
  title: 'Providers/Facebook',
  component: FacebookLogin,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof FacebookLogin>

const Template: ComponentStory<typeof FacebookLogin> = (args) => {
  const success = (response: FacebookResponse) => console.log({ response })
  return <FacebookLogin {...args} onSuccess={success} />
}

export const Facebook = Template.bind({})

export const CustomRender = Template.bind({})
CustomRender.args = {
  //  @ts-ignore
  render: ({ onClick, isDisabled, isLoading, isSdkLoaded }) => (
    <div onClick={onClick}>Custom Render</div>
  ),
}
