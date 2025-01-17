import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

function IndexPage({
  data: {
    allEpisode: { edges: episodes },
  },
}) {
  return (
    <Layout>
      <SEO
        keywords={[`bxjs`, `bxjs-weekly`, `javascript`, `react`]}
        title="BxJS Weekly - All Episodes"
      />

      <h1 className="text-3xl	py-4">Episodes list</h1>

      {episodes.map(episode => (
        <div key={episode.node.id} className="py-1">
          <Link
            className="text-lg text-blue-700"
            to={`/${episode.node.data.episodeUrl}`}
          >
            {episode.node.data.episodeName}
          </Link>
        </div>
      ))}
    </Layout>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allEpisode(sort: { fields: data___episodeDate, order: DESC }) {
      edges {
        node {
          id
          data {
            episodeDate
            episodeName
            episodeUrl
          }
        }
      }
    }
  }
`;
