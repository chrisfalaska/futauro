import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../Theme/Theme';
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

export const LightTheme: Story = {
  render: () => html`
    <auro-theme theme="light">
      <auro-hello-world name="Light Theme User"></auro-hello-world>
    </auro-theme>
  `
};

export const DarkTheme: Story = {
  render: () => html`
    <auro-theme theme="dark">
      <auro-hello-world name="Dark Theme User"></auro-hello-world>
    </auro-theme>
  `
};

export const ThemeToggle: Story = {
  render: () => html`
    <auro-theme>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <auro-hello-world name="Theme Toggle User"></auro-hello-world>
        <button @click=${() => window.auroThemeContext.toggleTheme()}>
          Toggle Theme
        </button>
      </div>
    </auro-theme>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates dynamic theme switching using the theme context.'
      }
    }
  }
};