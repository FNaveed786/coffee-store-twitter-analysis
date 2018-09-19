import elasticsearch from 'elasticsearch';
import _ from 'lodash';
import moment from 'moment';
import VOLUME_DATA from 'volumeData';

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
        timeSpanData['data'] = VOLUME_DATA
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
