var PenguinPromise = d3.json("classData.json")
PenguinPromise.then(function(penguins)
{
    
var alldays = d3.range(1, 39)
  console.log(penguins) 
    d3.select("body")
    .selectAll("button")
    .data(alldays)
    .enter()
    .append("button")
    .text(function(d)
    { 
        return "Day" + d
    })
    .on("click", function(day)
    {
        var alldata =  mapdata(penguins, day)
    console.log("hi", alldata)
    setup(alldata)
    drawpoints(alldata, xScale, yScale)
    })
    d3.select("body")
    .append("button")
    .text("Previous")
    .on("click", function(day){
         var alldata =  mapdata(penguins, 8)

    setup(alldata)
    drawpoints(alldata, xScale, yScale)
        })
     d3.select("body")
    .append("button")
    .text("Next")
    .on("click", function(day){
        var alldata =  mapdata(penguins, 9)

    setup(alldata)
    drawpoints(alldata, xScale, yScale)
        })
    var alldata =  mapdata(penguins, 0)

    setup(alldata)
    drawpoints(alldata, xScale, yScale)
},

function(err)
                    {
    console.log("error", err)
})
var mapdata = function(alldata, day)
{
 return alldata.map( function(d, i)
{
    var x= i;
    var y=  d.quizes[day].grade;
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
    
    xScale.range([0, screen.width-10])
    
    var yScale = d3.scaleLinear()
    yScale.domain([
        d3.min(alldata, function(p){return p.y}),
         d3.max(alldata, function(p){return p.y})
    ])
     yScale.range([screen.height-20, 500])
    drawpoints(alldata, yScale, xScale) 
}

var drawpoints=function(alldata, xScale, yScale)
{
    d3.selectAll('svg *')
    .remove()
   
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


var nextdata = function(alldata, day)
{
 return alldata.map( function(d, i)
{
    var x= i;
    var y=  d.quizes[day+1].grade;
    return {x, y}
})
}
var previousdata = function(alldata, day)
{
 return alldata.map( function(d, i)
{
    var x= i;
    var y=  d.quizes[day-1].grade;
    return {x, y}
})
}