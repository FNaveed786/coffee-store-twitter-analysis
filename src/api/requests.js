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

export const getVolumeData = (start, end, companies) => {
    return {
     "query": {
       "bool": {
         "must": [
           {
             "bool": {
             "should": companies
           }},
           {
             "range": {
               "date": {
                 "gte": start,
                 "lte": end
               }
             }
           }]
           }

       }
     }
}
