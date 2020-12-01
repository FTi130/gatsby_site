const colors = require('./colors')

module.exports = {
  siteMetadata: {
    title: 'Pavel Popov - Data Visualization Engineer',
    author: 'Pavel Popov',
    description: 'I develop simulation models and data visualisation.',
    siteUrl: 'https://ya.ru/',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              quality: 80,
              maxWidth: 850,
              wrapperStyle: `
                margin: 20px auto 20px auto;
                padding: 10px;
                border: 1px solid #eef;
                border-radius: 5;
                box-shadow: 0px 0px 5px #ccc;
              `,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pavel Popov- Data Visualization Engineer`,
        short_name: `Pavel Popov`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: colors.primary[1],
        display: `minimal-ui`,
        icon: `src/assets/favicon.png`,
      },
    },
    // `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    'gatsby-plugin-emotion',
  ],
}
