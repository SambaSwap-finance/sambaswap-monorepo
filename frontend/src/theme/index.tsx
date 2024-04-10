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
    white: '#FFFBF1', // Soft white, evoking sun-bleached walls and sandy beaches
    black: '#242F40', // Deep navy, reminiscent of the late evening skies

    // text - Bold and expressive, ensuring clarity and vibrancy
    text1: darkMode ? '#F1E0C5' : '#333D4B', // Light ochre for dark, slate grey for light
    text2: darkMode ? '#D0C2A5' : '#627C8C', // Warm beige for dark, coastal blue for light
    text3: darkMode ? '#B8A88D' : '#8A9BA8', // Muted taupe for dark, soft sky blue for light
    text4: darkMode ? '#627C8C' : '#D0C2A5', // Coastal blue for dark, warm beige for light
    text5: darkMode ? '#4E6577' : '#ECE5DB', // Dusky blue for dark, light limestone for light

    // backgrounds / greys - Mimicking the textures and tones of natural materials
    bg1: darkMode ? '#2A3648' : '#FFFBF1', // Midnight blue for dark, soft white for light
    bg2: darkMode ? '#4E6577' : '#FFF6E0', // Dusky blue for dark, very pale yellow for light
    bg3: darkMode ? '#3D5265' : '#EDE5D9', // Steel blue for dark, pale sand for light
    bg4: darkMode ? '#333D4B' : '#DAD2C3', // Slate grey for dark, muted beige for light
    bg5: darkMode ? '#293345' : '#CFC4B2', // Deep ocean blue for dark, warm grey for light

    //specialty colors - Adding layers of depth and intrigue
    modalBG: darkMode ? 'rgba(36, 47, 64, 0.85)' : 'rgba(255, 174, 66, 0.6)', // Dark slate for dark, soft amber for light
    advancedBG: darkMode ? 'rgba(52, 61, 72, 0.1)' : 'rgba(255, 251, 241, 0.6)', // Charcoal mist for dark, morning haze for light

    //primary colors - Radiant and lively, drawing from Latin America's colorful landscapes and cities
    primary1: darkMode ? '#F2994A' : '#DB504A', // Warm amber for dark, vivid coral for light
    primary2: darkMode ? '#EB5757' : '#F2C14E', // Soft red for dark, golden yellow for light
    primary3: darkMode ? '#F2C14E' : '#8CB369', // Golden yellow for dark, fresh green for light
    primary4: darkMode ? '#BB9457' : '#6B9080', // Bronze for dark, sage green for light
    primary5: darkMode ? '#A89B68' : '#A4C3B2', // Olive gold for dark, seafoam green for light

    // color text - Lively and legible, complementing the primary hues
    primaryText1: darkMode ? '#fff' : '#DB504A', // Warm amber vs vivid coral

    // secondary colors - Subtle yet spirited, enhancing the overall palette
    secondary1: darkMode ? '#DB504A' : '#F2994A', // Vivid coral for dark, warm amber for light
    secondary2: darkMode ? '#333D4B' : '#EB5757', // Slate grey for dark, soft red for light
    secondary3: darkMode ? '#333D4B' : '#F2C14E', // Slate grey for dark, golden yellow for light

    // other - Keeping functional colors vibrant and expressive
    red1: '#EB5757',
    green1: '#27AE60',
    yellow1: '#F2C14E',
    yellow2: '#F2994A'
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
