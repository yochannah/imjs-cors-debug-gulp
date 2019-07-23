const intermine = require('imjs');

const flymine = new intermine.Service({
  root: 'www.flymine.org/query',
  token: "d1r6FbSbocR743CfT2Ob"
});
const query = {
  from: 'Gene',
  select: [
    'exons.symbol',
    'chromosome.primaryIdentifier',
    'exons.chromosomeLocation.start',
    'exons.chromosomeLocation.end'
  ],
  where: {
    symbol: 'eve',
    organism: { lookup: 'D. melanogaster' }
  }
};

const q = new intermine.Query(query, flymine)
q.save().then(console.log).catch(console.log);

// console.log(q.toXML())

// flymine.rows(q).then(function (rows) {
  // console.log(rows)
// });

/*flymine.fetchTemplates().then(templates => {
  Object.keys(templates).forEach(k => {
    // if(k.toLowerCase().indexOf('gene') !== -1) console.log(k)
  })
  // console.log(templates.Pathway_Genes)
})*/

// flymine.templateQuery('GO_Gene').then(console.log)

/*flymine.fetchTemplates().then(templates => {
  Object.keys(templates).forEach(k => {
    // if(k.toLowerCase().indexOf('gene') !== -1) console.log(k)
  })
  // console.log(templates.Pathway_Genes)
})*/
