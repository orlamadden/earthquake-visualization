const canvas = d3.select(".canvas");

let width = "100%";
let height = "100%";

const api_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

const svg = canvas.append("svg")
                  .attr('width', width)
                  .attr('height', height);

let div = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

function timeStamptoDate(mTime){
    var mDate = new Date(mTime);
    return mDate.toLocaleDateString('en-US');
}

d3.json(api_url)
  .then(data => {
    // data goes in here
    const circle = svg.selectAll('circle')
                      .data(data.features);
    
    circle.attr('cx', (d, i) => d.properties.mag)
          .attr('cy', (d, i) => (d.properties.mag)*18)
          .attr('r', (d, i) => (d.properties.mag)*2)
          .attr('fill', (d) => (d.properties.alert))

    circle.enter()
          .append('circle')
          .attr('cx', (d, i) => Math.floor(Math.random() * 200) + d.properties.mag*i)
          .attr('cy', (d, i) => Math.floor(Math.random() * 100) + d.properties.mag)
          .attr('r', (d, i) => (d.properties.mag) * 2)
          .style('top', 156)
          .on('mouseover', function(d, i, n){
            d3.select(n[i])
            .transition()
            .duration(100)//in millisecond
            .style("opacity", 0.7)
            console.log(d.properties.mag);
            
            div.transition()
               .duration(200)
               .style('opacity', 0.9);

            div.html('<p>Mag: ' + d.properties.mag + '</p>' + 
                     '<p> Time: ' + timeStamptoDate(d.properties.time) + '</p>' +
                     '<p> Where: ' + d.properties.place.split(',')[1] + '</p>')
                .style('left', (d3.event.pageX)+'px')
                .style('top', (d3.event.pageY -20)+'px');
          })
          .on('mouseout', function(d, i, n){
            d3.select(n[i])
            .transition()
            .duration(100)//in millisecond
            .style("opacity", 1);

            div.transition()
               .duration(100)
               .style('opacity', 0);
        })
        .attr("fill", (d, i) => d.properties.alert);
  });