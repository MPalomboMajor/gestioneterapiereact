import { ResponsivePie } from '@nivo/pie'
import { dashboard } from '../helpers/api/api'
import { useState, useEffect } from 'react';
import moment from 'moment';

function PieChart(props) {
    const [dataInizio, setDataInizio] = useState();
    const [dataFine, setDataFine] = useState();
    const [data, setData] = useState([
        {
            "id": "Causa 3",
            "label": "Causa 3",
            "value": "33", 
            "color": "hsl(57, 2%, 50%)"
        },
        {
            "id": "Causa 4",
            "label": "Causa 4",
            "value": "66",
            "color": "hsl(57, 100%, 50%)"
        }
    ]
        //     [
        //     {
        //         "id": "causa1",
        //         "label": "Causa1",
        //         "value": 207,
        //         "color": "hsl(161, 70%, 50%)"
        //     },
        //     {
        //         "id": "causa2",
        //         "label": "Causa2",
        //         "value": 9,
        //         "color": "hsl(86, 70%, 50%)"
        //     },
        //     {
        //         "id": "causa3",
        //         "label": "Causa3",
        //         "value": 246,
        //         "color": "hsl(329, 70%, 50%)"
        //     },
        //     {
        //         "id": "causa4",
        //         "label": "Causa4",
        //         "value": 161,
        //         "color": "hsl(135, 70%, 50%)"
        //     },
        //     {
        //         "id": "causa5",
        //         "label": "Causa5",
        //         "value": 38,
        //         "color": "hsl(168, 70%, 50%)"
        //     }
        // ]
    );

    function fetchData(evt) {
        evt.preventDefault();
        dashboard.getWithParam("GetAllDropOff/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data.dati);
                }
            }).catch((error) => {

            });
    };

    const commonProperties = {
        width: 800,
        height: 400,
        animate: true,
        activeOuterRadiusOffset: 8,
    }

    const MyResponsivePie = ({ data /* see data tab */ }) => (
        <ResponsivePie
            {...commonProperties}
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'causa1'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'causa2'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'causa3'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'causa4'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'causa5'
                    },
                    id: 'lines'
                }

            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )

    return (
        <>
            <div className="row mb-4">
                <form onSubmit={fetchData}>
                    <div className="row mb-4">
                        <div className="col-12 col-md-4">
                            <span className="input-group-text" id="label-data">Data inizio</span>
                            <input type="date" className="form-control form-control-sm" id="data" aria-describedby="label-data" name="dataInizio" onChange={e => setDataInizio(moment(e.target.value).format("DD/MM/YYYY"))} />
                        </div>
                        <div className="col-12 col-md-4">
                            <span className="input-group-text" id="label-data">Data fine</span>
                            <input type="date" className="form-control form-control-sm" id="data" aria-describedby="label-data" name="dataFine" onChange={e => setDataFine(moment(e.target.value).format("DD/MM/YYYY"))} />
                        </div>
                        <div className="col-12 col-md-4">
                            <button className="btn btn-primary btn-upload" id type="submit" >Filtra</button>
                        </div>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                </form>
            </div>
            <div style={{ height: 300, width: 300 }}>
                <MyResponsivePie data={data} />
            </div>
        </>
    );
};

export { PieChart };







