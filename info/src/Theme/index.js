import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
import { useDarkModeManager } from '../contexts/LocalStorage'
import styled from 'styled-components'
import { Text } from 'rebass'

export default function ThemeProvider({ children }) {
  const [darkMode] = useDarkModeManager()

  return <StyledComponentsThemeProvider theme={theme(darkMode)}>{children}</StyledComponentsThemeProvider>
}

const theme = (darkMode, color) => ({
  customColor: color,
  textColor: darkMode ? color : '#21374A', // Dark mode custom color or deep blue for light mode

  panelColor: darkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0)',
  backgroundColor: darkMode ? '#21374A' : '#F0F0F0', // Deep blue for dark mode or light grey for light mode

  uniswapPink: darkMode ? 'rgba(255, 209, 0, 0.6)' : '#21374A', // Pink for dark mode or deep blue for light mode

  concreteGray: darkMode ? '#292C2F' : '#FAFAFA',
  inputBackground: darkMode ? '#1F1F1F' : '#FAFAFA',
  shadowColor: darkMode ? '#000' : '#2F80ED',
  mercuryGray: darkMode ? '#333333' : '#E1E1E1',

  text1: darkMode ? '#FAF9F6' : '#21374A', // Off-white for dark mode, deep blue for light mode
  text2: darkMode ? '#B0B7C3' : '#325B72', // Soft grey for dark mode, rich sky blue for light mode
  text3: darkMode ? '#A1ADC7' : '#437890', // Light grey-blue for dark mode, cerulean for light mode
  text4: darkMode ? '#8E9AAC' : '#4D8FA6', // Greyish blue for dark mode, brighter blue for light mode
  text5: darkMode ? '#778BA5' : '#5294B5', // Slate blue for dark mode, vibrant blue for light mode

  white: '#FFFFFF',

  bg1: darkMode ? '#21374A' : '#FAFAFA', // Deep blue for dark mode, steel grey for light mode
  bg2: darkMode ? '#325B72' : '#F7F8FA', // Rich sky blue for dark mode, pale blue-grey for light mode
  bg3: darkMode ? '#437890' : '#EDEEF2', // Cerulean for dark mode, soft grey for light mode
  bg4: darkMode ? '#4D8FA6' : '#CED0D9', // Brighter blue for dark mode, muted grey for light mode
  bg5: darkMode ? '#5294B5' : '#888D9B', // Vibrant blue for dark mode, steel grey for light mode
  bg6: darkMode ? '#000' : '#FFFFFF',

  modalBG: darkMode ? 'rgba(33, 55, 74, 0.85)' : 'rgba(255, 209, 0, 0.6)', // Navy for dark mode, golden for light mode
  advancedBG: darkMode ? 'rgba(50, 75, 92, 0.1)' : 'rgba(0, 155, 58, 0.6)', // Ocean blue for dark mode, jungle green for light mode
  onlyLight: darkMode ? '#22242a' : 'transparent',
  divider: darkMode ? 'rgba(43, 43, 43, 0.435)' : 'rgba(43, 43, 43, 0.035)',

  primary1: darkMode ? '#FFD700' : '#00A550', // Gold for dark mode, pine green for light mode
  primary2: darkMode ? '#C1A33B' : '#FFD700', // Metallic gold for dark mode, bright yellow for light mode
  primary3: darkMode ? '#325B72' : '#2E5090', // Rich sky blue for dark mode, flag blue for light mode
  primary4: darkMode ? '#437890' : '#FFD700', // Cerulean for dark mode, bright yellow for light mode
  primary5: darkMode ? '#4D8FA6' : '#00A550', // Brighter blue for dark mode, pine green for light mode

  primaryText1: darkMode ? '#FAF9F6' : '#21374A', // Off-white for dark mode, deep blue for light mode

  secondary1: darkMode ? '#FFD700' : '#21374A', // Bright yellow for dark mode, deep blue for light mode
  secondary2: darkMode ? '#C1A33B' : '#325B72', // Metallic gold for dark mode, rich sky blue for light mode
  secondary3: darkMode ? '#A1ADC7' : '#437890', // Light grey-blue for dark mode, cerulean for light mode

  shadow1: darkMode ? '#000' : '#2F80ED',

  red1: '#E63946', // Crisp red, suitable for alerts and warnings
  green1: '#00A550', // Pine green, for success and confirmation messages
  yellow1: '#FFD700', // Bright yellow, for attention and caution
  yellow2: '#FFC107', // Amber, for highlights and important buttons
  link: '#2172E5',
  blue: '2f80ed',

  background: darkMode ? '#21374A' : `radial-gradient(50% 50% at 50% 50%, #00A55030 0%, #FFD70030 100%)`, // Deep blue for dark mode or radial gradient from pine green to bright yellow for light mode

})


const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
`

export const TYPE = {
  main(props) {
    return <TextWrapper fontWeight={500} fontSize={14} color={'text1'} {...props} />
  },

  body(props) {
    return <TextWrapper fontWeight={400} fontSize={14} color={'text1'} {...props} />
  },

  small(props) {
    return <TextWrapper fontWeight={500} fontSize={11} color={'text1'} {...props} />
  },

  header(props) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },

  largeHeader(props) {
    return <TextWrapper fontWeight={500} color={'text1'} fontSize={24} {...props} />
  },

  light(props) {
    return <TextWrapper fontWeight={400} color={'text3'} fontSize={14} {...props} />
  },

  pink(props) {
    return <TextWrapper fontWeight={props.faded ? 400 : 600} color={props.faded ? 'text1' : 'text1'} {...props} />
  },
}

export const Hover = styled.div`
  :hover {
    cursor: pointer;
  }
`

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
    text-decoration: underline;
  }
  :active {
    text-decoration: none;
  }
`

export const ThemedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  max-width: 100vw !important;
  height: 200vh;
  mix-blend-mode: color;
  position: absolute;
  top: 0px;
  left: 0px;
  /* z-index: ; */

  transform: translateY(-110vh);
`

export const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;    
    background-color: ${({ theme }) => theme.bg6};
  }

  a {
    text-decoration: none;

    :hover {
      text-decoration: none
    }
  }

  
.three-line-legend {
	width: 100%;
	height: 70px;
	position: absolute;
	padding: 8px;
	font-size: 12px;
	color: #20262E;
	background-color: rgba(255, 255, 255, 0.23);
	text-align: left;
	z-index: 10;
  pointer-events: none;
}

.three-line-legend-dark {
	width: 100%;
	height: 70px;
	position: absolute;
	padding: 8px;
	font-size: 12px;
	color: white;
	background-color: rgba(255, 255, 255, 0.23);
	text-align: left;
	z-index: 10;
  pointer-events: none;
}

@media screen and (max-width: 800px) {
  .three-line-legend {
    display: none !important;
  }
}

.tv-lightweight-charts{
  width: 100% !important;
  

  & > * {
    width: 100% !important;
  }
}


  html {
    font-size: 1rem;
    font-variant: none;
    color: 'black';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    height: 100%;
  }
`
