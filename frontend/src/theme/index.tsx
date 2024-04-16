import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ; (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

// const white = '#FFFFFF'
// const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white: '#FEF9EF', // Warm white, reminiscent of sandy beaches
    black: '#1F2329', // Deep, dark blue-black, like a tropical night

    // text - More vibrant, drawing from natural colors for readability
    text1: darkMode ? '#FFF8E7' : '#2B2D42', // Off-white for dark, deep blue for light
    text2: darkMode ? '#D9CBA3' : '#587B7F', // Sandy brown for dark, sea green for light
    text3: darkMode ? '#BDA589' : '#8A817C', // Earthy tan for dark, stone gray for light
    text4: darkMode ? '#587B7F' : '#D9CBA3', // Sea green for dark, sandy brown for light
    text5: darkMode ? '#3C6E71' : '#E4E6E9', // Dark cyan for dark, light gray for light

    // backgrounds / greys - Emulating the diverse environments
    bg1: darkMode ? '#262D31' : '#FEF9EF', // Dark slate for dark, warm white for light
    bg2: darkMode ? '#3C6E71' : '#FFFCEB', // Dark cyan for dark, pale yellow for light
    bg3: darkMode ? '#335C67' : '#F3F0D7', // Deep teal for dark, light cream for light
    bg4: darkMode ? '#2F4858' : '#E9E4D0', // Navy blue for dark, soft beige for light
    bg5: darkMode ? '#2B2D42' : '#DCD7C9', // Deep blue for dark, muted khaki for light

    //specialty colors - Enhanced with a Latin vibe
    modalBG: darkMode ? 'rgba(28, 49, 58, 0.85)' : 'rgba(255, 204, 109, 0.6)', // Ocean blue for dark, sunny yellow for light
    advancedBG: darkMode ? 'rgba(49, 87, 94, 0.1)' : 'rgba(254, 249, 239, 0.6)', // Teal for dark, warm white for light

    //primary colors - Inspired by the spirited Latin American palette
    primary1: darkMode ? '#FFBA08' : '#D62828', // Sunshine yellow for dark, fiery red for light
    primary2: darkMode ? '#F77F00' : '#F4A261', // Bright orange for dark, soft orange for light
    primary3: darkMode ? '#FCBF49' : '#2A9D8F', // Goldenrod for dark, calming teal for light
    primary4: darkMode ? '#EAE2B7' : '#264653', // Pale yellow for dark, deep sea blue for light
    primary5: darkMode ? '#F4A261' : '#E9C46A', // Soft orange for dark, amber for light

    // color text - Keeping high contrast for better legibility
    primaryText1: darkMode ? '#fff' : '#D62828', // Sunshine yellow vs fiery red

    // secondary colors - Subtle, yet colorful
    secondary1: darkMode ? '#D62828' : '#FFBA08', // Fiery red for dark, sunshine yellow for light
    secondary2: darkMode ? '#264653' : '#F77F00', // Deep sea blue for dark, bright orange for light
    secondary3: darkMode ? '#264653' : '#FCBF49', // Deep sea blue for dark, goldenrod for light

    // other - Keeping essentials vibrant
    red1: '#E76F51',
    green1: '#2A9D8F',
    yellow1: '#F4A259',
    yellow2: '#E9C46A'
  }
}


export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text) <{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
@import url('https://rsms.me/inter/inter.css');
html { font-family: 'Inter', sans-serif; letter-spacing: -0.018em;}
@supports (font-variation-settings: normal) {
  html { font-family: 'Inter var', sans-serif; }
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;    
}

* {
  box-sizing: border-box;
}

body > div {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg2};
}
`
