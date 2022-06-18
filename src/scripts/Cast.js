import CastChart from './CastChart';
import '../stylesheets/Cast.css';
import {gql, useQuery} from "@apollo/client";
import React from "react";
import {IoArrowBackCircle} from "react-icons/io5";

function Cast(props) {
        const castResult = gql`
        query GetCast($showId: Int!, $seasons: [String!]!) {
            cast(showId: $showId, seasons: $seasons){
                name
                actor
                appearances
            }
        }
    `;

    const seasonNumbers = () => {
        return Object.keys(props.season_numbers);
    }

    const {loading, error, data} = useQuery(castResult,
        {variables: {showId: props.trakt_id, seasons: seasonNumbers()}});

    if (loading) return <p>Loading... Results may take some time.</p>
    if (error) return <p>Error!</p>

    return (
        <div id='chart'>
            <CastChart cast={data.cast} />
        </div>
    )
}

export default Cast;