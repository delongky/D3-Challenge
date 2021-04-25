# D3-Challenge

The task for this assignment was to use D3 to create a scatterplot to illustrate the health risks facing particular demographics; I chose to visualize the correlation between poverty levels & & the percentage of population lacking healthcare.

I used D3 techniques to create the plot so that each state was represented by a circle element.  This was coded into the "app.js" file.  I pulled the data from the "data.csv" file using the "d3.csv" function.  I also included ToolTip to display the data when each state's circle is clicked.

The dataset included is based on 2014 ACS 1-year estimates from the US Census Bureau; it includes data on rates of income, obesity, poverty, etc. by state.

* Note: In order to run this visualization, command `python -m http.server` in the terminal, which will host the page at `localhost:8000` in the web browser.

