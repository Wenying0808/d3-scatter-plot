// set up the dimension for the chart
const margin = { top: 60, right: 40, bottom: 60, left: 100}
const width = 1000 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom


 // create svg container
 const svg = d3.select("#chart").append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .attr("class", "svg")



//fetch json data
d3.json('iris dataset.json')
 .then( data => {
    console.log("iris dataset:", data);

    const xScale =  d3.scaleLinear()
                    .range([0, width])
                    .domain([d3.min(data, d => d.sepal_length), d3.max(data, d => d.sepal_length)])

    const yScale =  d3.scaleLinear()
                    .range([height, 0])
                    .domain([d3.min(data, d => d.sepal_width), d3.max(data, d => d.sepal_width)])

    //axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

    svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)

   
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.sepal_length))
        .attr("cy", d => yScale(d.sepal_width))
        .attr("r", 4)
        .attr("fill", "black")

  

 })