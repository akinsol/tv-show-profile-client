import {Line} from "react-chartjs-2";
import React from "react";
import '../stylesheets/Ratings.css';


function RatingsChart(props) {

    const episodeNumbers = () => {
        let episodes = [];
        props.season.episodes.map((episode) =>
            episodes.push(episode.number)
        );
        return episodes;
    }

    const episodeRatings = () => {
        let episodes = [];
        props.season.episodes.map((episode) =>
            episodes.push(episode.rating)
        );
        return episodes;
    }

    const chartData = {
        labels: episodeNumbers(),
        datasets: [{
            label: 'Rating by Episode',
            borderColor: '#000000',
            data: episodeRatings(),
        }
        ]
    };

    return(
        <Line data={chartData}/>
    )
}

export default RatingsChart;