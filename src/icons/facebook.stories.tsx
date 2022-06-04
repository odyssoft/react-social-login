import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { FacebookIcon } from './facebook'

export default {
  title: 'Icons/Facebook',
  component: FacebookIcon,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof FacebookIcon>

const Template: ComponentStory<typeof FacebookIcon> = (args) => (
  <FacebookIcon {...args} />
)

export const Facebook = Template.bind({})
