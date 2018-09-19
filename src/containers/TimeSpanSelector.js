import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

import { fetchTotalVolumeData } from '../actions';

import Multiselect from 'react-widgets/lib/Multiselect'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'

import 'react-widgets/dist/css/react-widgets.css'

momentLocalizer(moment)

const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />

class TimeSpanSelector extends Component {
    onSubmit(values) {
        this.props.fetchTotalVolumeData(values.startDate, values.endDate, values.businesses);
    }

    componentDidMount() {
        this.props.initialize({"interval":"2016-07-01/2016-12-31"});
        this.props.fetchTotalVolumeData(new Date(2018, 8, 16), new Date(2018, 8, 25), [ 'Starbucks', 'Dunkin Donuts', 'Dutch Bros' ]);
    }

    render() {
        const { handleSubmit } = this.props;


        return (
            <div className="col-lg-12">
                <div className="panel panel-primary">
                    <div className="panel-heading text-left"><strong>Filters</strong></div>
                    <div className="panel-body">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <div className="form-group">

                                <div className="col-lg-12">
                                    <div className="input-group">
                                      <div className="col-lg-4">
                                          <label>Businesses</label>
                                          <Field
                                            name="businesses"
                                            component={renderMultiselect}
                                            data={[ 'Starbucks', 'Dunkin Donuts', 'Dutch Bros', "McDonalds" ]}
                                            value={[ 'Starbucks', 'Dunkin Donuts', 'Dutch Bros' ]}
                                          />
                                      </div>
                                      <div className="col-lg-3">
                                          <label>Start Date</label>
                                          <Field
                                            name="startDate"
                                            showTime={false}
                                            component={renderDateTimePicker}
                                            value={new Date(2018, 8, 16)}
                                          />
                                      </div>
                                      <div className="col-lg-3">
                                          <label>End Date</label>
                                          <Field
                                            name="endDate"
                                            showTime={false}
                                            component={renderDateTimePicker}
                                            value={new Date(2018, 8, 25)}
                                          />
                                      </div>
                                      <span className="input-group-btn">
                                          <button className="btn btn-primary" type="submit">Search</button>
                                      </span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchTotalVolumeData }, dispatch);
}

export default reduxForm({
    form: 'IntervalForm'
})(
    connect(null, mapDispatchToProps)(TimeSpanSelector)
);
