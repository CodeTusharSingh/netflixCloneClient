import React, { useState } from 'react';

const SeasonsComponent = ({ seasons }) => {
    const [selectedPart, setSelectedPart] = useState(Object.keys(seasons[0])[0]);
    const handlePartChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedPart(selectedValue);
    };
    const selectedSeason = seasons.find((season) => season[selectedPart]);
    return (
        <div>
            <select onChange={handlePartChange} style={{ backgroundColor: 'rgb(26,26,26)', border: 'none', color: 'rgb(229,9,20)', fontSize: '18px', fontFamily: 'NetflixSansLite', cursor: 'Pointer' }}>
                {seasons.map((season, index) => (
                    <option key={index} value={Object.keys(season)[0]} style={{ color: 'white' }}>
                        {Object.keys(season)[0]}
                    </option>
                ))}
            </select>

            {selectedPart && selectedSeason && (
                <div>
                    <div style={{ width: '45%' }}>
                        <h4 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>Release Year: {selectedSeason[selectedPart][0].releaseYear}</h4>
                        <p style={{ fontFamily: 'NetflixSansLite', color: '#a3a3a3', fontSize: '16px' }}>{selectedSeason[selectedPart][0].seasonDescription}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {selectedSeason[selectedPart][0].episodes.map((episode, index) => (
                            <div key={index} style={{ paddingRight: '12px', paddingTop: '10px' }}>
                                <img src={episode} alt={`Episode ${index + 1}`} height={'223px'} width={'396px'} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeasonsComponent;
