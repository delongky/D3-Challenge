// @TODO: YOUR CODE HERE!
// see D3 08 & 09
function makeResponsive() {

    var svgArea = d3.select("body").select("svg");

    // clear svg if not empty
    if(!svgArea.empty()) {
        svgArea.remove();
    }

    // SVG wrapper dimensions are determined by the current width & height of the browser window.    
    var svgWidth = 900 // window.innerWidth;
    var svgHeight = 500    // window.innerHeight;

    var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Import Data
    d3.csv("assets/data/data.csv").then(function(censusData) { 
    console.log(censusData)
        
        // Step 1: Parse Data/Cast as numbers
        // ==============================
        censusData.forEach(function(data) {
            data.age = +data.age;
            data.healthcare = +data.healthcare;
            data.poverty = +data.poverty;
            // data.income = +data.income;
            // data.obesity = +data.obesity;
            // data.smokes = +data.smokes;
          });  // ends forEach parsing function

        // Step 2: Create scale functions
        // ==============================
        var xLinearScale = d3.scaleLinear()
            .domain([0, d3.max(censusData, d => d.poverty)])
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(censusData, d => d.healthcare)])
            .range([height, 0]);

        // Step 3: Create axis functions
        // ==============================
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Step 4: Append Axes to the chart
        // ==============================
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        // Step 5: Create Circles
        // ==============================
        var circlesGroup = chartGroup.selectAll("circle")
            .data(censusData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", "15")
            .attr("fill", "#800020")
            .attr("opacity", ".75");

        // Add text to circles: 
        circlesGroup.append("g")
            .selectAll('text')
            .data(censusData)
            .enter()
            .append("text")
            .classed("stateText", true)
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare))
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-size", "8px")
            .text(d => d.abbr)
            // .text(function(d) {return d.abbr});


        // Step 6: Initialize tool tip
        // ==============================
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(d) {
                return (`${d.state}<br>In Poverty: ${d.poverty}%<br>Lacking Healthcare: ${d.healthcare}%`);
        }); // ends tooltip init

        // Step 7: Create tooltip in the chart
        // ==============================
        chartGroup.call(toolTip);

        // Step 8: Create event listeners to display & hide the tooltip
        // ==============================
        circlesGroup.on("click", function(data) {
            toolTip.show(data, this);
        }) // ends click event
            // onmouseout event
            .on("mouseout", function(data, index) {
                toolTip.hide(data);
            }); // ends mouseout event

        // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Lacks Healthcare (%)"); 
        
        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
            .attr("class", "axisText")
            .text("In Poverty (%)");

    }).catch(function(error) {
        console.log(error);
    }); // ends promise
}// ends responsive function

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);