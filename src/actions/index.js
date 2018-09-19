import elasticsearch from 'elasticsearch';
import _ from 'lodash';
import moment from 'moment';


import { getWordCloudDataRequest, getVolumeData} from '../api/requests';

const client = new elasticsearch.Client({
    host: '206.207.50.53:9200'
});

export const SELECT_EPISODE = "select_episode";
export const DESELECT_EPISODE = "deselect_episode";
export const REQUEST_VOLUME_DATA = "request_volume_data";
export const RECEIVE_VOLUME_DATA = "receive_volume_data";
export const FETCH_WORDCLOUD_DATA = "fetch_wordcloud_data";
export const REQUEST_WORDCLOUD_DATA = "request_wordcloud_data";


export const requestTotalVolumeData = () => {
    return {
        type: REQUEST_VOLUME_DATA,
        payload: ''
    }
}

export const receiveTotalVolumeData = (totalVolumeData) => {
    return {
        type: RECEIVE_VOLUME_DATA,
        payload: totalVolumeData
    }
}

// Returns an array of dates between the two dates
var getDates = function(startDate, endDate) {
  var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};


export const fetchTotalVolumeData = (startDate, endDate, company) => {
    console.log(startDate);
    console.log(endDate);
    console.log(company);
    let timeSpanData = {};
    return dispatch => {
        dispatch(requestTotalVolumeData());
        // client.search(getIntervalData(timeSpanStart, timeSpanEnd), (error, response) => {
        //
        //   timeSpanData['startDate'] = new Date(new Date(startDate).setHours(0,0,0,0))
        //   timeSpanData['endDate'] = new Date(new Date(endDate).setHours(0,0,0,0))
        //   timeSpanData['breakouts'] = getDates(timeSpanData['startDate'], timeSpanData['endDate'])
        //   timeSpanData['data']
        //
        //     let intervalsEndBucket = response.aggregations.interval_end.buckets;
        //     let actualTimeSpanEndDate = _.max(intervalsEndBucket.map(a => new Date(a.key_as_string)));
        //     let actualTimeSpanStartDate = _.min(intervalsEndBucket.map(a => new Date(a.interval_start.buckets[0].key_as_string)));
        //     timeSpanData['startDate'] = new Date(actualTimeSpanStartDate);
        //     timeSpanData['endDate'] = new Date(actualTimeSpanEndDate);
        //     timeSpanData['breakouts'] = _.sortBy([...intervalsEndBucket.map(a => new Date(a.key_as_string)), new Date(actualTimeSpanStartDate)]);
        //     client.search(getVolumeData(moment.utc(actualTimeSpanStartDate).format('YYYY-MM-DD'), moment.utc(actualTimeSpanEndDate).format('YYYY-MM-DD')), (error, response) => {
        //         timeSpanData['data'] = response.aggregations.volume.buckets.map(a => {
        //             return { 'date': new Date(a.key_as_string), 'volume':a.doc_count + a.likes.value}
        //         });
        //         dispatch(receiveTotalVolumeData(timeSpanData));
        //     });
        // });


        timeSpanData['startDate'] = new Date(new Date(startDate).setHours(0,0,0,0))
        timeSpanData['endDate'] = new Date(new Date(endDate).setHours(0,0,0,0))
        timeSpanData['breakouts'] = getDates(timeSpanData['startDate'], timeSpanData['endDate'])
        console.log("START DATE")
        console.log(timeSpanData['startDate'])
        console.log("END DATE")
        console.log(timeSpanData['endDate'])
        console.log("DATES IN BETWEEN")
        console.log(timeSpanData['breakouts'])
        timeSpanData['data'] = [
          {
            'company': 'Starbucks',
            'values': [
              {'date': new Date(2018, 8, 16), 'volume': 10},
              {'date': new Date(2018, 8, 17), 'volume': 20},
              {'date': new Date(2018, 8, 18), 'volume': 5},
              {'date': new Date(2018, 8, 19), 'volume': 8},
              {'date': new Date(2018, 8, 20), 'volume': 30},
              {'date': new Date(2018, 8, 21), 'volume': 32},
              {'date': new Date(2018, 8, 22), 'volume': 25},
              {'date': new Date(2018, 8, 23), 'volume': 20},
              {'date': new Date(2018, 8, 24), 'volume': 12},
              {'date': new Date(2018, 8, 25), 'volume': 10}
            ],
            'dots': [
              {'company': 'Starbucks', 'date': new Date(2018, 8, 16), 'volume': 20, 'sentiment': 'green'},
              {'company': 'Starbucks', 'date': new Date(2018, 8, 21), 'volume': 32, 'sentiment': 'green'},
              {'company': 'Starbucks', 'date': new Date(2018, 8, 22), 'volume': 25, 'sentiment': 'red'}
            ]
          },
          {
            'company': "Dutch Bros",
            'values': [
              {'date': new Date(2018, 8, 16), 'volume': 20},
              {'date': new Date(2018, 8, 17), 'volume': 10},
              {'date': new Date(2018, 8, 18), 'volume': 15},
              {'date': new Date(2018, 8, 19), 'volume': 18},
              {'date': new Date(2018, 8, 20), 'volume': 10},
              {'date': new Date(2018, 8, 21), 'volume': 12},
              {'date': new Date(2018, 8, 22), 'volume': 35},
              {'date': new Date(2018, 8, 23), 'volume': 10},
              {'date': new Date(2018, 8, 24), 'volume': 12},
              {'date': new Date(2018, 8, 25), 'volume': 14}
            ],
            'dots': [
              {'company': "Dutch Bros", 'date': new Date(2018, 8, 19), 'volume': 18, 'sentiment': 'red'},
              {'company': "Dutch Bros", 'date': new Date(2018, 8, 25), 'volume': 14, 'sentiment': 'red'},
            ]
          },
          {
            'company': 'Dunkin Donuts',
            'values': [
              {'date': new Date(2018, 8, 16), 'volume': 20},
              {'date': new Date(2018, 8, 17), 'volume': 30},
              {'date': new Date(2018, 8, 18), 'volume': 25},
              {'date': new Date(2018, 8, 19), 'volume': 8},
              {'date': new Date(2018, 8, 20), 'volume': 19},
              {'date': new Date(2018, 8, 21), 'volume': 14},
              {'date': new Date(2018, 8, 22), 'volume': 25},
              {'date': new Date(2018, 8, 23), 'volume': 20},
              {'date': new Date(2018, 8, 24), 'volume': 19},
              {'date': new Date(2018, 8, 25), 'volume': 12}
            ],
            'dots': [
              {'company': 'Dunkin Donuts', 'date': new Date(2018, 8, 17), 'volume': 30, 'sentiment': 'red'},
              {'company': 'Dunkin Donuts', 'date': new Date(2018, 8, 20), 'volume': 19, 'sentiment': 'gray'},
              {'company': 'Dunkin Donuts', 'date': new Date(2018, 8, 21), 'volume': 14, 'sentiment': 'green'},
              {'company': 'Dunkin Donuts', 'date': new Date(2018, 8, 24), 'volume': 19, 'sentiment': 'red'},
            ]
          }
        ]
        dispatch(receiveTotalVolumeData(timeSpanData));
    }
}

export const selectEpisode = date => {
    return {
        type: SELECT_EPISODE,
        payload: date
    }
}

export const deselectEpisode = date => {
    return {
        type: DESELECT_EPISODE,
        payload: date
    }
}

export const fetchWordCloudData = (weekStart, weekEnd) => {
    console.log("HERE1")
    return dispatch => {
      console.log("HERE2")
        //dispatch(requestWordCloudData());
        //let request = client.search(getWordCloudDataRequest(weekStart, weekEnd));
        let request = [
          {
            'title': 'This is the title',
            'words': [
              { text: 'Hey', value: 1000 },
              { text: 'lol', value: 200 },
              { text: 'first impression', value: 800 },
              { text: 'very cool', value: 1000000 },
              { text: 'duck', value: 10 },
              ]
          },
          {
            'title': 'This is the title',
            'words': [
              { text: 'Hey', value: 1000 },
              { text: 'lol', value: 200 },
              { text: 'first impression', value: 800 },
              { text: 'very cool', value: 1000000 },
              { text: 'duck', value: 10 },
              ]
          },
          {
            'title': 'This is the title',
            'words': [
              { text: 'Hey', value: 1000 },
              { text: 'lol', value: 200 },
              { text: 'first impression', value: 800 },
              { text: 'very cool', value: 1000000 },
              { text: 'duck', value: 10 },
              ]
          },
          {
            'title': 'This is the title',
            'words': [
              { text: 'Hey', value: 1000 },
              { text: 'lol', value: 200 },
              { text: 'first impression', value: 800 },
              { text: 'very cool', value: 1000000 },
              { text: 'duck', value: 10 },
              ]
          },
          {
            'title': 'This is the title',
            'words': [
              { text: 'Hey', value: 1000 },
              { text: 'lol', value: 200 },
              { text: 'first impression', value: 800 },
              { text: 'very cool', value: 1000000 },
              { text: 'duck', value: 10 },
              ]
          }
        ]
        dispatch(recievedWordCloudData(request));
    }
}

export const requestWordCloudData = () => {
    return {
        type: REQUEST_WORDCLOUD_DATA,
        payload: ''
    }
}

export const recievedWordCloudData = request => {
    console.log("INSIDE REQUEST")
    return {
        type: FETCH_WORDCLOUD_DATA,
        payload: request
    }
}
