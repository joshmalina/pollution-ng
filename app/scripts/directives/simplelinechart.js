'use strict';

/**
 * @ngdoc directive
 * @name pollutionNgApp.directive:simpleLineChart
 * @description
 * # simpleLineChart
 */
angular.module('pollutionNgApp')
  .directive('simpleLineChart', ['d3Service', 'err', function(d3Service, err) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

          var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 600 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

    //       scope.data = 
    //       [{'actual': 225, 'error': 134.0, 'howFarOut': 240},
			 // {'actual': 100, 'error': 3.0, 'howFarOut': 4},
			 // {'actual': 4, 'error': 44.0, 'howFarOut': 33},
			 // {'actual': 5, 'error': 2.0, 'howFarOut': 1},
			 // {'actual': 66, 'error': 55.0, 'howFarOut': 236}];
			 scope.data = err;

          var x = d3.scale.linear()
          	.domain([d3.min(scope.data, function(d) {return d.howFarOut;}), d3.max(scope.data, function(d) { return d.howFarOut; })])
            .range([0, width]);

          var y = d3.scale.linear()
          	.domain([d3.min(scope.data, function(d) {return d.actual}), d3.max(scope.data, function(d) {
          		return d.actual;
          	})])
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          var zScale = d3.scale.linear().domain([0, 500]).range([1,5]);
          	

          var svg = d3.select(element[0]).append('svg')
           .attr('width', width + margin.left + margin.right)
           .attr('height', height + margin.top + margin.bottom)
           .append('g')
           .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

           // add the tooltip area to the webpage
		   var tooltip = d3.select(element[0]).append("div")
			 .attr("class", "tooltip")
			 .style("opacity", 0);          


          svg.selectAll("circle") // No longer "rect"
			  .data(scope.data)
			  .enter()
			  .append("circle") // No longer "rect"

			   .attr("cx", function(d) {
				     return d.howFarOut;
			   })
			   .attr("cy", function(d) {
			        return d.actual;
			   })
			   .attr("r", function(d) {
			   	  return zScale(d.error);
			   });         

       

          var xValue = function(d) { return d.howFarOut;}, // data -> value
		    xScale = d3.scale.linear().range([0, width]), // value -> display
		    xMap = function(d) { return xScale(xValue(d));}, // data -> display
		    errorerror = function(d) {return d.error};


		// setup y
		var yValue = function(d) { return d.actual;}, // data -> value
		    yScale = d3.scale.linear().range([height, 0]), // value -> display
		    yMap = function(d) { return yScale(yValue(d));};// data -> display



          svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + height + ')')
              .call(xAxis)
            .append("text")
		      .attr("class", "label")
		      .attr("x", width)
		      .attr("y", -6)
		      .style("text-anchor", "end")
		      .text("Hourly distance to event");

          svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr("class", "label")
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Actual pollution value');

          // draw dots
		  svg.selectAll(".dot")
		      .data(scope.data)
		    .enter().append("circle")
		      .attr("class", "dot")
		      .attr("r", errorerror)
		      .attr("cx", xMap)
		      .attr("cy", yMap)
		      .on("mouseover", function(d) {
		          tooltip.transition()
		               .duration(200)
		               .style("opacity", .9);
		          tooltip.html('ave error: ' + d.error + "<br/> (" + xValue(d) 
			        + ", " + yValue(d) + ")")
		               .style("left", (d3.event.pageX + 5) + "px")
		               .style("top", (d3.event.pageY - 28) + "px");
		      })
		      .on("mouseout", function(d) {
		          tooltip.transition()
		               .duration(500)
		               .style("opacity", 0);
		      });

          
        });
      }};
    }]);