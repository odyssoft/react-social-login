import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { GoogleIcon } from './google'

export default {
  title: 'Icons/Google',
  component: GoogleIcon,
  argTypes: {},
} as ComponentMeta<typeof GoogleIcon>

const Template: ComponentStory<typeof GoogleIcon> = (args) => (
  <GoogleIcon {...args} />
)

export const Google = Template.bind({})
