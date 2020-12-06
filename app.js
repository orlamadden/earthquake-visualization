const canvas = d3.select(".canvas");

let width = 600;
let height = 600;

const api_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

const svg = canvas.append("svg")
                  .attr('width', width)
                  .attr('height', height);


d3.json(api_url)
  .then(data => {
    // data goes in here
    const circle = svg.selectAll('circle')
                      .data(data.features);
    
    circle.attr('cx', (d, i) => d.properties.mag)
          .attr('cy', (d, i) => (d.properties.mag)*18)
          .attr('r', (d, i) => (d.properties.mag)*2)
          .attr('fill', 'purple')

    circle.enter()
          .append('circle')
          .attr('cx', (d, i) => (d.properties.mag)*42)
          .attr('cy', (d, i) => (d.properties.mag)*45)
          .attr('r', (d, i) => (d.properties.mag)*8)
          .attr('fill', 'purple')

  })