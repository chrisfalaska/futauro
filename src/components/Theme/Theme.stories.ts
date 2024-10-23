import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { until } from 'lit/directives/until.js';
import './Theme';
import { THEMES, type Theme } from './Theme';

interface ThemeProps {
  theme?: Theme;
}

const meta = {
  title: 'Components/Theme',
  tags: ['autodocs'],
  component: 'auro-theme',
  parameters: {
    docs: {
      description: {
        component: `
The Auro Theme component provides theming capabilities for Auro components. It manages:
- Theme switching (example: light/dark)
- System preference detection
- Persistent theme storage
- Theme token distribution

## Features
- Automatically detects system theme preference
- Persists theme choice across sessions
- Synchronizes theme across browser tabs
- Provides theme context for child components
- Generates CSS custom properties from theme tokens
        `,
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: Object.values(THEMES),
      description: 'Sets the active theme',
      table: {
        type: { summary: 'Theme' },
        defaultValue: { summary: THEMES.LIGHT },
      },
    },
  },
} satisfies Meta<ThemeProps>;

export default meta;
type Story = StoryObj<ThemeProps>;

const ThemedBox = () => html`
  <div style="
    padding: 20px;
    margin: 10px;
    background-color: var(--background-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-default);
    border-radius: var(--radii-md);
    transition: all var(--animation-durations-normal) var(--animation-easings-easeInOut);"
  >
    <h3 style="margin: 0 0 10px 0;">Themed Content</h3>
    <p style="margin: 0;">Using Auro Design Tokens</p>
  </div>
`;

export const Default: Story = {
  args: {
    theme: THEMES.LIGHT,
  },
  render: (args) => html`
    <auro-theme theme=${ifDefined(args.theme)}>
      ${ThemedBox()}
    </auro-theme>
  `,
};

export const DarkTheme: Story = {
  args: {
    theme: THEMES.DARK,
  },
  render: (args) => html`
    <auro-theme theme=${ifDefined(args.theme)}>
      ${ThemedBox()}
    </auro-theme>
  `,
};

export const SystemPreference: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This example follows your system theme preference. Switch your system theme to see it update dynamically.',
      },
    },
  },
  render: () => html`
    <auro-theme>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${ThemedBox()}
        <p style="margin: 0; font-size: 14px;">
          Current theme: <strong id="current-theme"></strong>
        </p>
      </div>
    </auro-theme>

    <script>
      const themeElement = document.querySelector('auro-theme');
      const themeDisplay = document.getElementById('current-theme');

      function updateThemeDisplay() {
        themeDisplay.textContent = window.auroThemeContext.getTheme();
      }

      // Monitor theme changes
      themeElement?.addEventListener('auroThemeChanged', updateThemeDisplay);

      // Initial render of the theme display
      updateThemeDisplay();
    </script>
  `,
};


export const ThemeToggle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates dynamic theme switching using the theme context.',
      },
    },
  },
  render: () => html`
    <auro-theme>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${ThemedBox()}
        <button
          @click=${() => window.auroThemeContext.toggleTheme()}
          style="
            padding: 8px 16px;
            background-color: var(--action-primary);
            color: var(--text-primary);
            border: 1px solid var(--border-default);
            border-radius: var(--radii-md);
            cursor: pointer;
            transition: all var(--animation-durations-fast) var(--animation-easings-easeOut);
          "
        >
          Toggle Theme
        </button>
      </div>
    </auro-theme>
  `,
};

export const ThemeReset: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates resetting to system preference.',
      },
    },
  },
  render: () => html`
    <auro-theme>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${ThemedBox()}
        <div style="display: flex; gap: 8px;">
          <button
            @click=${() => window.auroThemeContext.toggleTheme()}
            style="
              padding: 8px 16px;
              background-color: var(--action-primary);
              color: var(--text-primary);
              border: 1px solid var(--border-default);
              border-radius: var(--radii-md);
              cursor: pointer;
              transition: all var(--animation-durations-fast) var(--animation-easings-easeOut);
            "
          >
            Toggle Theme
          </button>
          <button
            @click=${() => {
              const theme = document.querySelector('auro-theme');
              theme?.resetTheme();
            }}
            style="
              padding: 8px 16px;
              background-color: var(--action-secondary);
              color: var(--text-primary);
              border: 1px solid var(--border-default);
              border-radius: var(--radii-md);
              cursor: pointer;
              transition: all var(--animation-durations-fast) var(--animation-easings-easeOut);
            "
          >
            Reset to System Theme
          </button>
        </div>
      </div>
    </auro-theme>
  `,
};

export const NestedThemes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates nested theme providers with different theme values.',
      },
    },
  },
  render: () => html`
    <auro-theme theme=${THEMES.LIGHT}>
      ${ThemedBox()}
      <auro-theme theme=${THEMES.DARK}>
        ${ThemedBox()}
      </auro-theme>
    </auro-theme>
  `,
};

export const TokenUsage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows different theme tokens in use.',
      },
    },
  },
  render: () => {
    const themeReady = new Promise<Theme>((resolve) => {
      resolve(window.auroThemeContext.getTheme());
    });

    return html`
      ${until(themeReady.then(() => html`
        <auro-theme>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="
              padding: 20px;
              background-color: var(--background-primary);
              color: var(--text-primary);
              border: 1px solid var(--border-default);
              border-radius: var(--radii-md);
            ">
              Primary Background
            </div>
            <div style="
              padding: 20px;
              background-color: var(--background-secondary);
              color: var(--text-secondary);
              border: 1px solid var(--border-default);
              border-radius: var(--radii-md);
            ">
              Secondary Background
            </div>
            <div style="
              padding: 20px;
              background-color: var(--background-tertiary);
              color: var(--text-primary);
              border: 1px solid var(--border-hover);
              border-radius: var(--radii-md);
            ">
              Tertiary Background
            </div>
          </div>
        </auro-theme>
      `))}
    `;
  },
};
