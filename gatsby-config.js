module.exports = {
  siteMetadata: {
    title: `BxJS`,
    description: `BxJS - or "Building X with JS" - is a web video series, live podcast as well as a community of like-minded people. The main goal of BxJS is to teach everyone to build awesome things with javascript.`,
    author: `@yamalight`,
  },
  plugins: [
    `gatsby-plugin-workerize-loader`,
    `gatsby-source-bxjs`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `bjxs`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4dc0b5`,
        display: `minimal-ui`,
        icon: `src/images/bxjs-logo.png`,
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/css/style.css`],
      },
    },
    `gatsby-plugin-offline`,
  ],
};
