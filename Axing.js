var data=d3.json("gradeData.json");

var screen1=
{
  width:600,
  height:600
};
var screen2=
{
  width:700,
  height:700
};
var screen3=
{
  width:800,
  height:800
};
var svg1=d3.select("svg.plot1")
           .attr("width",screen1.width)
           .attr("height",screen1.height);
var svg2=d3.select("svg.plot2")
           .attr("width",screen2.width)
           .attr("height",screen2.height);
var svg3=d3.select("svg.plot3")
           .attr("width",screen3.width)
           .attr("height",screen3.height);
var drawPlot=function(d,screen,svg)
{
  var margin=
  {
    top:20,
    bottom:50,
    left:50,
    right:100
  };
  var width=screen.width-margin.left-margin.right;
  var height=screen.height-margin.top-margin.bottom;
  var xscale=d3.scaleLinear()
               .domain([0,20])
               .range([0,width]);
  var yscale=d3.scaleLinear()
               .domain([0,100])
               .range([height,0]);
  var colors=d3.scaleOrdinal(d3.schemeSet3);
  var plot=svg.append("g")
              .classed("plot",true)
              .attr("transform","translate("+margin.left+","+margin.top+")")
  var student=plot.selectAll("g")
                  .data(d)
                  .enter()
                  .append("g")
                  .attr("fill",function(d){
                    return colors(d.name);
                  });
  student.selectAll("circle")
         .data(function(d){
           return d.grades;
         })
         .enter()
         .append("circle")
         .attr("cx",function(d,i){
           return xscale(i);
         })
         .attr("cy",function(d){
           return yscale(d)
         })
         .attr("r",10);
  var legend=svg.append("g")
                .classed("legend",true)
                .attr("transform","translate("+(width+margin.left)+","+margin.top+")")
  var legendline=legend.selectAll("g")
                       .data(d)
                       .enter()
                       .append("g")
                       .classed("legendline",true)
                       .attr("transform",function(d,i){
                         return "translate(0,"+(i*20)+")"})
  legendline.append("rect")
            .attr("x",0)
            .attr("y",10)
            .attr("width",10)
            .attr("height",10)
            .attr("fill",function(d){
              return colors(d.name);
            })
  legendline.append("text")
            .attr("x",20)
            .attr("y",20)
            .text(function(d){
              return d.name;
            })

  var xAxis=d3.axisBottom(xscale);
  svg.append("g")
     .call(xAxis)
     .attr("transform","translate("+margin.left+","+(margin.top+height+10)+")")
  var yAxis=d3.axisLeft(yscale);
  svg.append("g")
     .call(yAxis)
     .attr("transform","translate("+margin.left+","+(margin.top+10)+")")
}
data.then(function(d)
{
  drawPlot(d,screen1,svg1);
  drawPlot(d,screen2,svg2);
  drawPlot(d,screen3,svg3);
},
function(err){
  console.log(err);
});
