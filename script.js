var PenguinPromise = d3.json("classData.json")
PenguinPromise.then(function(penguins)
{
    
var alldays = d3.range(39)
  console.log(penguins) 
var alldata =  mapdata(penguins, 3)
    console.log("hi", alldata)
    setup(alldata)
    drawpoints(alldata, xScale, yScale)
    createbuttons()
    
},

function(err)
                    {
    console.log("error", err)
})
var mapdata = function(alldata, n)
{
 return alldata.map( function(d, i)
{
    var x= i;
    var y=  d.quizes[n].grade;
    return {x, y}
})
}

var screen={width:900,height:700}

var setup = function(alldata)
{
    d3.select('svg')
    .attr("height",screen.height)
    .attr("width",screen.width)
    
    var xScale = d3.scaleLinear()
    xScale.domain([
        d3.min(alldata, function(p){return p.x}),
        d3.max(alldata, function(p){return p.x})
    ])
    
    xScale.range([0, screen.width])
    
    var yScale = d3.scaleLinear()
    yScale.domain([
        d3.min(alldata, function(p){return p.y}),
         d3.max(alldata, function(p){return p.y})
    ])
     yScale.range([screen.height, 0])
    drawpoints(alldata, yScale, xScale) 
}

var drawpoints=function(alldata, xScale, yScale)
{
    d3.select('svg')
    .attr("height",screen.height)
    .attr("width",screen.width)
    console.log(alldata)
    d3.select('svg')
    .selectAll("circle")
    .data(alldata)
    .enter()
    .append("circle")
    .attr("cx",function(p)
    {
        {return xScale(p.x)}
    })
    .attr("cy",function(p)
    {
        {return yScale(p.y)}
    })
    .attr("r",10)
    }

