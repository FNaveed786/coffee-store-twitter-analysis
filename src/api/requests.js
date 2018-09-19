export const getWordCloudDataRequest = (curIntervalEndDate, prevIntervalEndDate) => {
    return {
        index: 'USERS_INDEX_NAME',
        type: 'USERS_INDEX_TYPE',
        body: {
            "size": 0,
            "query": {
                "constant_score": {
                    "filter": {
                        "terms": {
                            "interval_end": [
                                curIntervalEndDate,
                                prevIntervalEndDate
                            ]
                        }
                    }
                }
            },
            "aggs": {
                "intervals": {
                    "terms": {
                        "field": "interval_end"
                    },
                    "aggs": {
                        "wordcloud": {
                            "terms": {
                                "field": "wordcloud"
                            }
                        }
                    }
                }
            }
        }
    }
}

export const getVolumeData = (intervalStart, intervalEnd) => {
    return {
        "index": 'POSTS_INDEX_NAME',
        "type": 'POSTS_INDEX_TYPE',
        "body": {
            "size": 0,
            "query": {
                "range": {
                    "createtime": {
                        "gte": intervalStart,
                        "lte": intervalEnd
                    }
                }
            },
            "aggs": {
                "volume": {
                    "date_histogram": {
                        "field": "createtime",
                        "interval": "day"
                    },
                    "aggs": {
                        "likes": {
                            "sum": {
                                "field": "likes_count"
                            }
                        }
                    }
                }
            }
        }
    }
}
