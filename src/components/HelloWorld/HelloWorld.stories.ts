import type { Meta, StoryObj } from '@storybook/web-components';
import { HelloWorld, HelloWorldProps } from './HelloWorld';

const meta = {
  title: 'Components/HelloWorld',
  tags: ['autodocs'],
  component: 'auro-hello-world',
  parameters: {
    componentClass: HelloWorld
  }
} satisfies Meta<HelloWorldProps>;

export default meta;
type Story = StoryObj<HelloWorldProps>;

export const Default: Story = {};

export const CustomName: Story = {
  args: {
    name: 'Traveler',
  },
};

export const LongName: Story = {  
  args: {
    name: 'Christopher Alaska Airlines Hawaii Auro Component',
  },
};