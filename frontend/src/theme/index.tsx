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
    white: '#000', // White remains consistent for light and freshness
    black: '#21374A', // Deep blue to maintain a sophisticated look in dark mode

    // text - Enhanced contrast for readability, inspired by Brazilian vibrancy
    text1: darkMode ? '#FAF9F6' : '#21374A', // Off-white for dark mode, deep blue for light mode
    text2: darkMode ? '#B0B7C3' : '#325B72', // Soft grey for dark mode, rich sky blue for light mode
    text3: darkMode ? '#A1ADC7' : '#437890', // Light grey-blue for dark mode, cerulean for light mode
    text4: darkMode ? '#8E9AAC' : '#4D8FA6', // Greyish blue for dark mode, brighter blue for light mode
    text5: darkMode ? '#778BA5' : '#5294B5', // Slate blue for dark mode, vibrant blue for light mode

    // backgrounds / greys - Softened to complement the Brazilian-themed colors
    bg1: darkMode ? '#21374A' : '#F0F0F0', // Deep blue for dark mode, light grey for light mode
    bg2: darkMode ? '#325B72' : '#E1E8EB', // Rich sky blue for dark mode, pale blue-grey for light mode
    bg3: darkMode ? '#437890' : '#C5CED1', // Cerulean for dark mode, soft grey for light mode
    bg4: darkMode ? '#4D8FA6' : '#AEB9C4', // Brighter blue for dark mode, muted grey for light mode
    bg5: darkMode ? '#5294B5' : '#9AA4AE', // Vibrant blue for dark mode, steel grey for light mode

    // specialty colors - Tinted to reflect a tropical and digital feel
    modalBG: darkMode ? 'rgba(33, 55, 74, 0.85)' : 'rgba(255, 209, 0, 0.6)', // Navy for dark mode, golden for light mode
    advancedBG: darkMode ? 'rgba(50, 75, 92, 0.1)' : 'rgba(0, 155, 58, 0.6)', // Ocean blue for dark mode, jungle green for light mode

    // primary colors - Bold and thematic, aligned with Brazil's colors
    primary1: darkMode ? '#FFD700' : '#00A550', // Gold for dark mode, pine green for light mode
    primary2: darkMode ? '#C1A33B' : '#FFD700', // Metallic gold for dark mode, bright yellow for light mode
    primary3: darkMode ? '#325B72' : '#2E5090', // Rich sky blue for dark mode, flag blue for light mode
    primary4: darkMode ? '#437890' : '#FFD700', // Cerulean for dark mode, bright yellow for light mode
    primary5: darkMode ? '#4D8FA6' : '#00A550', // Brighter blue for dark mode, pine green for light mode

    // color text - Focused on visibility against the primary and background colors
    primaryText1: darkMode ? '#FAF9F6' : '#21374A', // Off-white vs deep blue

    // secondary colors - A balance between accent and subtlety
    secondary1: darkMode ? '#FFD700' : '#21374A', // Bright yellow for dark mode, deep blue for light mode
    secondary2: darkMode ? '#C1A33B' : '#325B72', // Metallic gold for dark mode, rich sky blue for light mode
    secondary3: darkMode ? '#A1ADC7' : '#437890', // Light grey-blue for dark mode, cerulean for light mode

    // other - Ensuring functional colors are clear and distinct
    red1: '#E63946', // Crisp red, suitable for alerts and warnings
    green1: '#00A550', // Pine green, for success and confirmation messages
    yellow1: '#FFD700', // Bright yellow, for attention and caution
    yellow2: '#FFC107' // Amber, for highlights and important buttons
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
