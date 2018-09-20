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


        timeSpanData['startDate'] = new Date(2018, 7, 20)
        timeSpanData['endDate'] = new Date(2018, 7, 27)
        timeSpanData['breakouts'] = getDates(timeSpanData['startDate'], timeSpanData['endDate'])
        console.log("START DATE")
        console.log(timeSpanData['startDate'])
        console.log("END DATE")
        console.log(timeSpanData['endDate'])
        console.log("DATES IN BETWEEN")
        console.log(timeSpanData['breakouts'])
        timeSpanData['data'] = [{
          'company': 'Starbucks',
          'values': [
            {'date': new Date(2018, 7, 20), 'volume': 35},
            {'date': new Date(2018, 7, 21), 'volume': 30},
            {'date': new Date(2018, 7, 22), 'volume': 14},
            {'date': new Date(2018, 7, 23), 'volume': 20},
            {'date': new Date(2018, 7, 24), 'volume': 30},
            {'date': new Date(2018, 7, 25), 'volume': 15},
            {'date': new Date(2018, 7, 26), 'volume': 20},
            {'date': new Date(2018, 7, 27), 'volume': 12}
          ],
          'dots': [
            {'company': 'Starbucks', 'date': new Date(2018, 7, 20), 'volume': 35, 'sentiment': 'green'},
            {'company': 'Starbucks', 'date': new Date(2018, 7, 24), 'volume': 30, 'sentiment': 'green'},
            {'company': 'Starbucks', 'date': new Date(2018, 7, 27), 'volume': 12, 'sentiment': 'green'}
          ]
        },

        {
          'company': 'McDonalds',
          'values': [
            {'date': new Date(2018, 7, 20), 'volume': 23},
            {'date': new Date(2018, 7, 21), 'volume': 15},
            {'date': new Date(2018, 7, 22), 'volume': 42},
            {'date': new Date(2018, 7, 23), 'volume': 26},
            {'date': new Date(2018, 7, 24), 'volume': 19},
            {'date': new Date(2018, 7, 25), 'volume': 26},
            {'date': new Date(2018, 7, 26), 'volume': 32},
            {'date': new Date(2018, 7, 27), 'volume': 18}
          ],
          'dots': [
            {'company': 'McDonalds', 'date': new Date(2018, 7, 20), 'volume': 35, 'sentiment': 'green'},
            {'company': 'McDonalds', 'date': new Date(2018, 7, 23), 'volume': 26, 'sentiment': 'green'},
            {'company': 'McDonalds', 'date': new Date(2018, 7, 26), 'volume': 32, 'sentiment': 'green'},
            {'company': 'McDonalds', 'date': new Date(2018, 7, 27), 'volume': 18, 'sentiment': 'green'}
          ]
        },
        {
          'company': 'Dunkin Donuts',
          'values': [
            {'date': new Date(2018, 7, 20), 'volume': 16},
            {'date': new Date(2018, 7, 21), 'volume': 27},
            {'date': new Date(2018, 7, 22), 'volume': 24},
            {'date': new Date(2018, 7, 23), 'volume': 17},
            {'date': new Date(2018, 7, 24), 'volume': 28},
            {'date': new Date(2018, 7, 25), 'volume': 16},
            {'date': new Date(2018, 7, 26), 'volume': 23},
            {'date': new Date(2018, 7, 27), 'volume': 19}
          ],
          'dots': [
            {'company': 'Dunkin Donuts', 'date': new Date(2018, 7, 21), 'volume': 27, 'sentiment': 'green'},
            {'company': 'Dunkin Donuts', 'date': new Date(2018, 7, 25), 'volume': 16, 'sentiment': 'green'},
            {'company': 'Dunkin Donuts', 'date': new Date(2018, 7, 26), 'volume': 23, 'sentiment': 'green'}
          ]
        },
        { 'company': 'Dutch Bros',
           'values': [
             {'date': new Date(2018, 7, 20), 'volume': 13},
             {'date': new Date(2018, 7, 21), 'volume': 40},
             {'date': new Date(2018, 7, 22), 'volume': 15},
             {'date': new Date(2018, 7, 23), 'volume': 24},
             {'date': new Date(2018, 7, 24), 'volume': 16},
             {'date': new Date(2018, 7, 25), 'volume': 19},
             {'date': new Date(2018, 7, 26), 'volume': 21},
             {'date': new Date(2018, 7, 27), 'volume': 31},
           ],
           'dots': [
             {'company': 'Dutch Bros', 'date': new Date(2018, 7, 22), 'volume': 15, 'sentiment': 'green'},
             {'company': 'Dutch Bros', 'date': new Date(2018, 7, 23), 'volume': 24, 'sentiment': 'green'},
             {'company': 'Dutch Bros', 'date': new Date(2018, 7, 27), 'volume': 31, 'sentiment': 'green'},
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
          if (weekEnd == 'Starbucks')
          {
            let request = [
              {'title': 'We are aware that some people are experiencing issues with the Starbucks App and the Starbucks website this morning. We are working diligently on a fix and hope to have you up and running shortly. Thank you so much for your patience while we get this sorted out.', 'words': [{'text': 'help', 'value': 24188}, {'text': 'Starbucks App', 'value': 52035}, {'text': 'Anthony Thanks', 'value': 21144}, {'text': 'Ryan', 'value': 97029}, {'text': 'rewards', 'value': 76467}, {'text': 'account', 'value': 72341}, {'text': 'look', 'value': 1286}, {'text': 'amazing day', 'value': 59637}, {'text': 'love', 'value': 35067}, {'text': 'happy sipping', 'value': 67333}, {'text': 'issues', 'value': 54812}, {'text': 'patience', 'value': 68210}, {'text': 'feature improvements', 'value': 13175}, {'text': 'email address', 'value': 87318}, {'text': 'things', 'value': 76092}, {'text': 'Steve', 'value': 71385}, {'text': 'kind comments', 'value': 41295}, {'text': 'drive', 'value': 99411}, {'text': 'line', 'value': 84892}, {'text': 'Karie', 'value': 54732}, {'text': 'Stars', 'value': 13456}, {'text': 'company', 'value': 60868}, {'text': 'pleasure', 'value': 5821}]}
            ]
            dispatch(recievedWordCloudData(request));
          }
          else if (weekEnd == 'Dutch Bros')
          {
            let request = [
              {"title": "Cross something amazing off your bucket list  SIP PEEL WIN today! \n\nNo Purch Nec. US, 13+. Ends 10/15/18 or while supplies last.  For free piece & official rules: http://spr.ly/6011DxPZU .", "words": [{"text": "Sip Peel Win", "value": 49214}, {"text": "year", "value": 23257}, {"text": "large iced coffee", "value": 86700}, {"text": "Patriots offer", "value": 51627}, {"text": "large coffees", "value": 42241}, {"text": "chance", "value": 97165}, {"text": "real prizes", "value": 87170}, {"text": "promotion", "value": 39396}, {"text": "help", "value": 75623}, {"text": "size coffee drink", "value": 23185}, {"text": "Parking lot", "value": 89966}, {"text": "worse RockawayBoulevard Queens", "value": 80926}, {"text": "game piece", "value": 80875}, {"text": "dollar", "value": 46636}, {"text": "spin", "value": 24672}, {"text": "location", "value": 17413}, {"text": "coupon good", "value": 9650}, {"text": "DD i\u2019d", "value": 98009}, {"text": "dunkin giftcard", "value": 41817}, {"text": "reason", "value": 43380}, {"text": "sippeelwin", "value": 16894}, {"text": "GS", "value": 29857}, {"text": "dunkins", "value": 98975}, {"text": "purchase necessary", "value": 45477}, {"text": "info", "value": 36791}, {"text": "Dunks", "value": 85773}, {"text": "Kayla", "value": 14812}, {"text": "right", "value": 12384}, {"text": "disappointment", "value": 79694}, {"text": "Kimberly", "value": 1265}, {"text": "Pls", "value": 6989}, {"text": "link", "value": 69826}, {"text": "junk", "value": 79767}]}
            ]
            dispatch(recievedWordCloudData(request));
          }
          else {
            let request = [
              {'title': 'Starbucks', 'words': [{'text': 'pink fluffy unicorns', 'value': 79499}, {'text': 'pink fluffy uncorns', 'value': 52908}, {'text': 'Unicorn Frappuccinos', 'value': 4773}, {'text': 'small group', 'value': 58049}, {'text': 'lot', 'value': 20608}, {'text': 'yesss', 'value': 27319}, {'text': 'kids', 'value': 86878}, {'text': 'acceptVIACOIN', 'value': 65885}, {'text': 'Fluuuffffyyyyy', 'value': 59848}, {'text': 'drink', 'value': 44421}, {'text': 'Iced Vanilla Bean Coconutmilk Latte', 'value': 69254}, {'text': 'Starbucks location', 'value': 72568}, {'text': 'creation method', 'value': 40824}, {'text': 'love', 'value': 45321}, {'text': 'loving military spouses', 'value': 30765}, {'text': 'sacrifices military spouses', 'value': 12282}]}
              ,
                {'title': 'Dutch Bros', 'words': [{'text': 'dutch coffee', 'value': 13227}, {'text': 'dutch Bros', 'value': 88753}, {'text': 'great dollar coffee day', 'value': 28351}, {'text': 'week', 'value': 40611}, {'text': 'caramelizer freeze', 'value': 69493}, {'text': 'whip', 'value': 53871}, {'text': 'money', 'value': 20327}, {'text': 'insides shiny', 'value': 75119}, {'text': 'shiny cold brew', 'value': 15564}, {'text': 'drinks sunshine rebel', 'value': 80300}, {'text': 'couple times', 'value': 65156}, {'text': 'year Cold Brew', 'value': 22488}, {'text': 'Tap', 'value': 53076}, {'text': 'wonderful service', 'value': 98124}, {'text': 'special treat', 'value': 57284}, {'text': 'NJproblems', 'value': 88703}]}
              ,

                {'title': 'McDonalds', 'words': [{'text': 'BigMac50', 'value': 14193}, {'text': 'ImNotLovinIt', 'value': 50399}, {'text': 'millions of chickens', 'value': 79624}, {'text': 's Big Mac', 'value': 63963}, {'text': 'early internet age', 'value': 486}, {'text': 'MHQ', 'value': 93642}, {'text': 's future', 'value': 29824}, {'text': "mcdonald's breakfast", 'value': 7477}, {'text': 'McDonalds sponsors Fox', 'value': 98172}, {'text': 'best time', 'value': 44142}, {'text': 'secret menu', 'value': 10111}, {'text': 'ice cream right', 'value': 99267}, {'text': 'new Bacon Smokehouse Burger', 'value': 79080}, {'text': 'menu', 'value': 75966}, {'text': 'life', 'value': 12143}, {'text': 'glass bottle', 'value': 35033}]}
              ,

                {'title': 'Dunkin Donuts', 'words': [{'text': 'Sip Peel Win', 'value': 48070}, {'text': 'year', 'value': 66373}, {'text': 'large iced coffee', 'value': 65858}, {'text': 'Patriots offer', 'value': 76950}, {'text': 'large coffees', 'value': 37934}, {'text': 'chance', 'value': 24445}, {'text': 'real prizes', 'value': 75856}, {'text': 'promotion', 'value': 51200}, {'text': 'help', 'value': 28067}, {'text': 'size coffee drink', 'value': 4029}, {'text': 'Sip Peel Win', 'value': 27544}, {'text': 'year', 'value': 32850}, {'text': 'large iced coffee', 'value': 3801}, {'text': 'Patriots offer', 'value': 90429}, {'text': 'large coffees', 'value': 25494}, {'text': 'chance', 'value': 84989}, {'text': 'real prizes', 'value': 79807}, {'text': 'peel', 'value': 25926}, {'text': 'mins', 'value': 78101}, {'text': 'hold', 'value': 25309}, {'text': 'patented idea', 'value': 40406}, {'text': 'actual idea', 'value': 71045}]}

            ]
            dispatch(recievedWordCloudData(request));
          }

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
