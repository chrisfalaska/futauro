import type { Meta, StoryObj } from '@storybook/web-components';
import './HelloWorld';

interface HelloWorldProps {
  name: string;
}

const meta = {
  title: 'Components/HelloWorld',
  tags: ['autodocs'],
  component: 'auro-hello-world',
} satisfies Meta<HelloWorldProps>;

export default meta;
type Story = StoryObj<HelloWorldProps>;

export const Default: Story = {};

export const CustomName: Story = {
  args: {
    name: 'John Doe',
  },
};

export const LongName: Story = {
  args: {
    name: 'Christopher Alaska Airlines Hawaii Auro Component',
  },
};