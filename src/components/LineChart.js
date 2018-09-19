import * as d3 from 'd3';
import $ from 'jquery';

class LineChart {
    constructor(chartDiv) {
        this.chartDiv = chartDiv;

        const chartDivHeight = $(chartDiv).height();
        const chartDivWidth = $(chartDiv).width();
        this.partitions = null;

        this.canvas = d3.select(this.chartDiv)
          .append('svg')
          .attr('width', chartDivWidth)
          .attr('height', chartDivHeight);

        this.margin = { top: 50, right: 50, bottom: 80, left: 70 };
        this.width = chartDivWidth - this.margin.left - this.margin.right;
        this.height = chartDivHeight - this.margin.top - this.margin.bottom;

        this.g = this.canvas.append("g").attr("transform", "translate("
            + this.margin.left + "," + this.margin.top + ")");

        this.x = d3.scaleTime()
          .rangeRound([0, this.width]);

        this.y = d3.scaleLinear()
          .rangeRound([this.height, 0]);



        this.line = d3.line()
          .x(d => this.x(d.date))
          .y(d => this.y(d.volume));

        this.mouseclicked = this.mouseclicked.bind(this);
        this.mouseovered = this.mouseovered.bind(this);
        this.mouseout = this.mouseout.bind(this);
    }

    draw(data, tickValues, onDotSelect) {
        this.x
          .domain(d3.extent([].concat.apply([], data.map(d => d.values)), d => d.date))

        this.y
          .domain(d3.extent([].concat.apply([], data.map(d => d.values)), d => d.volume))

        var colorLookUp = {
          'Starbucks': 'black',
          "Dutch Bros": 'blue',
          "Dunkin Donuts": 'pink',
          "McDonalds": "orange"
        }

        //Draw X-axis
        this.g.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${this.height})`)
            .call(d3.axisBottom(this.x).tickValues(tickValues).tickFormat(d3.timeFormat("%d %b %y")))
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        //Draw Y-axis
        this.g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(this.y))
            .append("text")
            .attr("class", "y-axis")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end");



        var lines = this.g.selectAll('.company')
          .data(data, d => d.company);

        // on enter append a g to hold our 3 parts
        var lE = lines.enter()
          .append('g')

        // append a path that's our solid line on top of the area
        lE.append("path")
          .attr("fill", "none")
          .attr("stroke-width", "3px")
          .attr("d", d => this.line(d.values))
          .style("stroke", d => colorLookUp[d.company]);


        // create a subselection for our "dots"
        // and on enter append a bunch of circles
        lE.selectAll(".dot")
          .data(d => d.dots)
          .enter()
          .append("circle")
          .attr("r", 10)
          .attr("cx", d => this.x(d.date))
          .attr("cy", d => this.y(d.volume))
          .attr("fill", function(d){
            //return colorLookUp[d3.select(this.parentNode).datum().company];
            return d.sentiment
          })
          .on("click", (d) => {
            onDotSelect(d.company, d.date)
          })
          .on("mouseover", function(){
              d3.select(this)
              .attr("cursor", "pointer");
          });

    }

    makePartitions(data, breakouts) {
        let minVolume = d3.min([].concat.apply([], data.map(d => d.values)), d => d.volume);
        let maxVolume = d3.max([].concat.apply([], data.map(d => d.values)), d => d.volume);

        for (let i = 1, j = breakouts.length; i < j; i++) {
            this.g.append("line")
                .attr("fill", "none")
                .attr("x1", this.x(breakouts[i]))
                .attr("y1", this.y(maxVolume))
                .attr("x2", this.x(breakouts[i]))
                .attr("y2", this.y(minVolume))
                .attr("stroke", "steelblue")
                .attr("stroke-width", 0.5);
        }
    }

    makePartitionsClickable(breakouts, onEpisodeSelect, onEpisodeDeselect) {
        this.onEpisodeSelect = onEpisodeSelect;
        this.onEpisodeDeselect = onEpisodeDeselect;

        this.partitions = this.canvas.selectAll("rect")
            .data(breakouts.filter((d, i) => i > 1))
            .enter()
            .append("rect")
            .attr("width", (d, i) => this.x(d) - this.x(breakouts[i + 1]))
            .attr("height", this.height)
            .attr("x", (d, i) => this.x(breakouts[i + 1]) + this.margin.left)
            .attr("y", this.margin.top)
            .attr("class", "rect")
            .lower()
            .on("click", this.mouseclicked)
            .on("mouseover", this.mouseovered)
            .on("mouseout", this.mouseout);
    }

    mouseclicked(d) {
        console.log("CLICKED ON EPISODE")
        console.log(d)
        this.partitions.classed("rect-selected", function (n) { return false; })
        if (this.selectedEpisode === d) {
          console.log("HERE6")
            this.selectedEpisode = null;
            this.onEpisodeDeselect();
        } else {
            this.selectedEpisode = d;
            this.partitions.classed("rect-selected", function (n) { if (n === d) return true; })
            console.log("HERE7")
            this.onEpisodeSelect(d);
        }
    }

    mouseovered(d) {
        this.partitions.classed("rect-hovered", n => { if (n === d && n !== this.selectedEpisode) return true; })
    }

    mouseout(d) {
        this.partitions.classed("rect-hovered", n => { if (n !== this.selectedEpisode) return false; })
    }
}

export default LineChart;
