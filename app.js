const canvas = d3.select(".canvas");

let width = "100%";
let height = "100%";

const api_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

const svg = canvas.append("svg")
                  .attr('width', width)
                  .attr('height', height);


d3.json(api_url)
  .then(data => {
    // data goes in here
    const circle = svg.selectAll('circle')
                      .data(data.features);
    
    // circle.attr('cx', (d, i) => d.properties.mag)
    //       .attr('cy', (d, i) => (d.properties.mag)*18)
    //       .attr('r', (d, i) => (d.properties.mag)*2)
    //       .attr('fill', (d) => (d.properties.alert))

    circle.enter()
          .append('circle')
          .attr('cx', (d, i) => Math.floor(Math.random() * 200) + d.properties.mag*i)
          .attr('cy', (d, i) => Math.floor(Math.random() * 100) + d.properties.mag)
          .attr('r', (d, i) => (d.properties.mag)*2)
          .attr('fill', (d, i) => (d.properties.alert))

  })