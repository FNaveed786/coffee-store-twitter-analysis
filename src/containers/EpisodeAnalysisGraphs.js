import React, { Component } from 'react';
import { connect } from 'react-redux';
import WordCloud from 'react-d3-cloud';
import ReactDOM from 'react-dom';


class EpisodeAnalysis extends Component {

    componentDidUpdate(prevProps, prevState) {
      if(this.refs.testing1) {
        this.width = ReactDOM.findDOMNode(this.refs.testing1).getBoundingClientRect().width;
      }

    }

    render() {
      const data = [
        { text: 'Hey', value: 1000 },
        { text: 'lol', value: 200 },
        { text: 'first impression', value: 800 },
        { text: 'very cool', value: 1000000 },
        { text: 'duck', value: 10 },
        ];

        const fontSizeMapper = word => Math.log2(word.value) * 5;
        const rotate = word => word.value % 360;
        const { selectedEpisode } = this.props.episodeReducer;

        if (!selectedEpisode) {
            return <div></div>
        }

        if(!this.props.episodeReducer.wordcloudData) {
          return <div></div>
        }
        let wordcloudData = this.props.episodeReducer.wordcloudData.data
        console.log("WORLD CLOUD DATA")
        console.log(wordcloudData)
        let rows = []
        for (var i = 1; i < wordcloudData.length; i++) {
            rows.push(<div className="col-lg-4">
            <div>{wordcloudData[i].title}</div>
              <WordCloud
                data={wordcloudData[i].words}
                fontSizeMapper={fontSizeMapper}
                rotate={rotate}
                height={500}
                width={this.width}
              />
            </div>);
        }

        return (
            <div className="col-lg-12">
                <div className="panel panel-primary">
                    <div className="panel-heading text-left">
                        <strong>
                            Episode Analysis: World Clouds showing sentiment analysis
                        </strong>
                    </div>
                    <div className="panel-body">
                        <div className="col-lg-12">
                            <div className="col-lg-4" ref="testing1">
                            <div>{wordcloudData[0].title}</div>
                              <WordCloud
                                data={wordcloudData[0].words}
                                fontSizeMapper={fontSizeMapper}
                                rotate={rotate}
                                height={500}
                                width={this.width}
                              />
                            </div>
                            {rows}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        episodeReducer: state.episodeReducer
    };
}

export default connect(mapStateToProps)(EpisodeAnalysis);
