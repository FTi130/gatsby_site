import Typography from 'typography'
import moragaTheme from 'typography-theme-moraga'
import * as colors from '../../colors'
import { injectGlobal } from 'emotion'

moragaTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  'a': {
    color: colors.primary[2],
  },
  'a:hover': {
    color: colors.primary[3],
  },
  'blockquote': {
    fontSize: rhythm(0.55),
  },
})

// injectGlobal(`
//   .gatsby-resp-iframe-wrapper  {
//     max-width: 800px;
//     margin-left: auto;
//     margin-right: auto;
//   }
// `)

const typography = new Typography({
  ...moragaTheme,
  googleFonts: [{
      name: 'Lato',
      styles: ['400', '700', '400i', '700i'],
    },
  ],
  headerFontFamily: ['Lato', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Lato', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}


const { rhythm, scale } = typography
export { rhythm, scale, typography as default }
