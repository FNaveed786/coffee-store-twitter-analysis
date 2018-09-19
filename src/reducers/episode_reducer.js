import _ from 'lodash';

import { SELECT_EPISODE, DESELECT_EPISODE,
        REQUEST_VOLUME_DATA, RECEIVE_VOLUME_DATA,
        FETCH_WORDCLOUD_DATA, REQUEST_WORDCLOUD_DATA } from '../actions';

export default function(state={}, action) {
    switch(action.type) {
        case REQUEST_VOLUME_DATA:
            return {
                volumeData: {
                    isFetching: true
                }
            }
        case RECEIVE_VOLUME_DATA:
            return {
                volumeData: {
                    ...action.payload,
                    isFetching: false
                }
            }
        case SELECT_EPISODE:
            return _.omit({...state, selectedEpisode: action.payload});
        case DESELECT_EPISODE:
            return _.omit(state, 'selectedEpisode', 'selectedWordCloud', 'wordcloudData');

        case REQUEST_WORDCLOUD_DATA:
            return {
                ...state,
                ['wordcloudData']: {
                    ...state['wordcloudData'],
                    isFetching: true,
                    selectedWordCloud : "",
                    data: {}
                }
            }

        case FETCH_WORDCLOUD_DATA:
            console.log(
              {
                  ...state,
                  ['wordcloudData']: {
                      ...state['wordcloudData'],
                      selectedWordCloud: "",
                      isFetching: false,
                      data: action.payload
                  }
              }
            )
            return {
                ...state,
                ['wordcloudData']: {
                    ...state['wordcloudData'],
                    selectedWordCloud: "",
                    isFetching: false,
                    data: action.payload
                }
            }


        default:
            return state;
    }
}
