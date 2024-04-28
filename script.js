// set up the dimension for the chart
const margin = { top: 60, right: 40, bottom: 60, left: 60}
const width = 1000 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom


// create svg container
const svg = d3.select("#chart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)

//color scale
const colorScale = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica"])
    .range(["#b492ef", "#3c0c8f", "#c3c2f2"])

//default property for axes
let xAxisProperty = "sepal_length";
let yAxisProperty = "sepal_width";

//fetch json data
d3.json('iris dataset.json')
 .then(data => {
    console.log("iris dataset:", data);

    //initial state
    updateChart(xAxisProperty, yAxisProperty, data);

    //handle dropdown event
    d3.select('#x-select')
        .property("value", xAxisProperty)
        .on("change", function(){
            xAxisProperty = this.value;
            updateChart(xAxisProperty, yAxisProperty, data);
        })

    d3.select('#y-select')
        .property("value", yAxisProperty)
        .on("change", function(){
            yAxisProperty = this.value;
            updateChart(xAxisProperty, yAxisProperty, data);
        })

 })

    

//update chart based on the selected properties for axes

function updateChart(xAxisProperty, yAxisProperty, data){
    const xScale =  d3.scaleLinear()
    .range([0, width])
    .domain([d3.min(data, d => d[xAxisProperty]), d3.max(data, d => d[xAxisProperty])])

    const yScale =  d3.scaleLinear()
        .range([height, 0])
        .domain([d3.min(data, d => d[yAxisProperty]), d3.max(data, d => d[yAxisProperty])])

    // Remove existing axes
    svg.select(".x-axis").remove();
    svg.select(".y-axis").remove();

    //axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
    .call(xAxis)

    svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .call(yAxis)

    // Remove existing circles
    svg.selectAll("circle").remove();

    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d[xAxisProperty]))
    .attr("cy", d => yScale(d[yAxisProperty]))
    .attr("r", 6)
    .attr("fill", d => colorScale(d.species) )
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

}

 

