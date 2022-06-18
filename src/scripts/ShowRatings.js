import {ApolloProvider} from "@apollo/client";
import { Line } from 'react-chartjs-2';
import SeasonRatings from './SeasonRatings';
import '../stylesheets/Ratings.css';
import React from "react";
import ReactDOM from "react-dom/client";
import {IoArrowBackCircle} from "react-icons/io5";
import Profile from "../scripts/Profile";

function ShowRatings(props) {

    // const goBack = () => {
    //     let div = ReactDOM.createRoot(document.getElementById('root'));
    //     div.render(
    //         <React.StrictMode>
    //             <Profile trakt_id={props.trakt_id} client={props.client }/>
    //         </React.StrictMode>
    //     );
    // }

    const showRatingsChart = (number) => {
        let root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <ApolloProvider client={props.client}>
                    <SeasonRatings season_number={number} trakt_id={props.trakt_id} />
                </ApolloProvider>
            </React.StrictMode>
        )
    }

    const seasonNumbers = () => {
        let seasons = [];
        props.season_numbers.map((number) =>
            seasons.push(number.number)
        );
        return seasons;
    }

    const seasonRating = () => {
        let seasons = [];
        props.season_numbers.map((number) =>
            seasons.push(number.rating)
        );
        return seasons;
    }

    const chartData = {
        labels: seasonNumbers(),
        datasets: [{
            label: 'Ratings by Season',
            borderColor: '#000000',
            data: seasonRating(),
        }
        ]
    };

    return(
        <div id='ratings'>
            {/*<IoArrowBackCircle onClick={goBack} />*/}
            <div id='chart'>
                <Line data={chartData}/>
            </div>
            <div id='buttons'>
                {seasonNumbers().map((number) =>
                <button onClick={() => showRatingsChart(number)}>Season {number}</button>
            )}
            </div>
        </div>
    )
}

export default ShowRatings;