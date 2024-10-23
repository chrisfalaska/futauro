import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './HelloWorld';

interface HelloWorldProps {
  name: string;
}

const meta = {
  title: 'Components/HelloWorld',
  tags: ['autodocs'],
  component: 'auro-hello-world',
  parameters: {
    docs: {
      description: {
        component: 'A simple Auro hello world component that displays a greeting with a customizable name.',
      },
    },
  },
  render: (args) => html`
    <auro-hello-world 
      .name=${args.name}
    ></auro-hello-world>
  `,
  argTypes: {
    name: {
      control: 'text',
      description: 'Name to display in the greeting',
      defaultValue: 'Alaska Air',
    }
  },
} satisfies Meta<HelloWorldProps>;

export default meta;
type Story = StoryObj<HelloWorldProps>;

export const Default: Story = {
  args: {
    name: 'Somebody',
  },
};

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