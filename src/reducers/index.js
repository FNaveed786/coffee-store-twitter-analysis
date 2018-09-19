import { combineReducers } from 'redux';
import EpisodeReducer from './episode_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    episodeReducer : EpisodeReducer,
    form: formReducer
});

export default rootReducer;