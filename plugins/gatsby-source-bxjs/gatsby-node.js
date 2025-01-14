/* eslint no-loop-func: off */
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const dateFns = require('date-fns');
const { markdownToDocuments } = require('./episodesToDocuments');

const baseUrl = 'https://api.github.com/repos/BuildingXwithJS/bxjs-weekly';
const episodesListUrl = `${baseUrl}/contents/links`;

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  const episodes = await fetch(episodesListUrl).then(r => r.json());

  const allSearchItems = [];
  const allEpisodes = [];
  let docId = 1;

  for (const episode of episodes) {
    const episodeUrl = episode.download_url;
    const filename = episode.name;
    const [, year, weeks, episodeName] = /(\d+)-(\d+)-(.+?)\./.exec(filename);
    const yearDate = dateFns.parse(`20${year}-01-01`, 'yyyy-MM-dd', new Date());
    const weekDate = dateFns.addWeeks(yearDate, weeks);
    const episodeDate = dateFns.lastDayOfWeek(weekDate);
    const markdown = await fetch(episodeUrl).then(r => r.text());
    const documents = await markdownToDocuments(markdown);

    // push into array of all links used for searching
    documents
      .map(d => ({
        ...d,
        episodeName: episodeName.replace(/-/g, ' '),
        episodeUrl: `/${episodeName.replace(/-/g, '')}`,
      }))
      .forEach(item => allSearchItems.push(item));

    // create new episode and use links inside of it
    const newEpisode = {
      id: `${docId++}`,
      data: {
        filename,
        episodeName: episodeName.replace(/-/g, ' '),
        episodeUrl: `/${episodeName.replace(/-/g, '')}`,
        episodeDate,
        links: documents,
      },
      internal: {
        type: 'episode',
        contentDigest: episodeName,
      },
    };
    allEpisodes.push(newEpisode);
  }

  // save json used for search
  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'static', 'links.json'),
    JSON.stringify(allSearchItems)
  );
  // import nodes to gatsby
  allEpisodes.forEach(item => createNode(item));
};
