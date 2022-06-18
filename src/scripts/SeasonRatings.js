import {gql, useQuery} from "@apollo/client";
import RatingsChart from './RatingsChart'
import React from "react";

function SeasonRatings(props) {
    const seasonResult = gql`
        query GetSeason($showId: Int!, $seasonNumber: Int!) {
            season(showId: $showId, seasonNumber: $seasonNumber){
                summary
                episodes {
                    title
                    number
                    summary
                    rating
                }
            }
        }
    `;

    const {loading, error, data} = useQuery(seasonResult,
        {variables: {showId: props.trakt_id, seasonNumber: props.season_number}});

    if (loading) return <p>Loading... Results may take some time.</p>
    if (error) return <p>Error!</p>

    return (
        <RatingsChart season={data.season} />
    )
}

export default SeasonRatings;