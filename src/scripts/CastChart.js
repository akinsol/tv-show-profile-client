import {Bar} from "react-chartjs-2";
import React from "react";


function CastChart(props) {
    const characterNames = () => {
        let characters = [];
        props.cast.map((character) =>
            characters.push(character.name)
        );
        return characters;
    }

    const characterAppearances = () => {
        let characters = [];
        props.cast.map((character) =>
            characters.push(character.appearances)
        );
        return characters;
    }


    const chartData = {
        labels: characterNames(),
        datasets: [{
            label: 'Cast Appearances (Seasons)',
            backgroundColor: 'rgba(253,63,63,0.5)',
            data: characterAppearances(),
        }
        ]
    };

    return (
        <div>
            <div className='chart'>
                <Bar data={chartData}/>
            </div>
        </div>
    )
}

export default CastChart;