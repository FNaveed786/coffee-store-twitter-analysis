import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as d3 from 'd3';

import LineChart from '../components/LineChart';
import '../style/VolumeBreakout.css';
import { selectEpisode, deselectEpisode, fetchWordCloudData, fetchIssueData } from '../actions';

class VolumeBreakoutGraph extends Component {
    constructor() {
        super();

        this.onEpisodeSelect = this.onEpisodeSelect.bind(this);
        this.onEpisodeDeselect = this.onEpisodeDeselect.bind(this);
        this.onDotSelect = this.onDotSelect.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.volumeData !== this.props.volumeData) {
          d3.selectAll("#volumeBreakoutChart > *").remove();
            this.lineChart = new LineChart(this.refs.volumeBreakoutChart);
            let volumeData = this.props.volumeData;
            if (!volumeData.isFetching) {
                this.lineChart.draw(volumeData.data, volumeData.breakouts, this.onDotSelect);
                this.lineChart.makePartitions(volumeData.data, volumeData.breakouts);
                this.lineChart.makePartitionsClickable(volumeData.breakouts,
                    this.onEpisodeSelect, this.onEpisodeDeselect);
            }
        }
    }


    onEpisodeSelect(episode) {
        let breakouts = this.props.volumeData.breakouts;
        let selectedEpisodeIndex = breakouts.indexOf(episode);
        let curEpisodeEndDate = new Date(breakouts[selectedEpisodeIndex]);
        let prevEpisodeEndDate = new Date(breakouts[selectedEpisodeIndex - 1]);
        this.props.selectEpisode(episode);
        console.log("HERE3")
        this.props.fetchWordCloudData(moment(curEpisodeEndDate).format(),
                                      moment(prevEpisodeEndDate).format());
    }

    onDotSelect(company, date) {
      console.log("ON DOT SELECT")
      console.log(date)
      console.log(company)
      this.props.fetchWordCloudData(date, company);
    }

    onEpisodeDeselect() {
        this.props.deselectEpisode();
    }

    render() {
        let volumeData = this.props.volumeData;

        if (!volumeData ||  volumeData.isFetching) {
            return <div>Fetching data...</div>
        }

        return (
            <div className="col-lg-12">
                <div className="panel panel-primary">
                    <div className="panel-heading text-left">
                        <strong>
                            Total Tweet Volume: Click on any episode between two lines to view sentiment analysis
                        </strong>
                    </div>
                    <div className="panel-body">
                    <div id="legend2">
                       <div className="legend2"> <p className="country-name"><span className="key-dot sb"></span>Starbucks</p> </div>
                       <div className="legend2"> <p className="country-name"><span className="key-dot dd"></span>Dunkin Donuts</p> </div>
                       <div className="legend2"> <p className="country-name"><span className="key-dot db"></span>Dutch Bros</p> </div>
                       <div className="legend2"> <p className="country-name"><span className="key-dot mc"></span>McDonalds</p> </div>
                      </div>
                        <div id="volumeBreakoutChart" ref="volumeBreakoutChart" style={{ "height": "500px", width: "100%" }}></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        volumeData: state.episodeReducer.volumeData
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ selectEpisode, deselectEpisode, fetchWordCloudData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeBreakoutGraph);
