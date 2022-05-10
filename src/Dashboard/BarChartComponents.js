import { ResponsiveBar } from '@nivo/bar'
import { dashboard } from '../helpers/api/api'
import { useState, useEffect } from 'react';
import moment from 'moment';

function BarChart() {
    const [dataInizio, setDataInizio] = useState();
    const [dataFine, setDataFine] = useState();
    const [data, setData] = useState([
        {
            "sesso": "Maschi",
            "registrazioni": 56,
            "registrazioniColor": "hsl(233, 100%, 50%)",
            "attivazioni": 52,
            "attivazioniColor": "hsl(37, 100 %, 50 %)"
        },
        {
            "sesso": "Femmine",
            "registrazioni": 36,
            "registrazioniColor": "hsl(233, 100%, 50%)",
            "attivazioni": 42,
            "attivazioniColor": "hsl(37, 100 %, 50 %)"
        }
    ]);

    function fetchData(evt) {
        evt.preventDefault();
        dashboard.getWithParam("GetBySex/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
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

    const MyResponsiveBar = ({ data /* see data tab */ }) => (
        <ResponsiveBar
            {...commonProperties}
            data={data}
            keys={[
                'registrazioni',
                'attivazioni'
                
            ]}
            indexBy="sesso"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'registrazioni'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'attivazioni'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'valore x',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'valore y',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
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
                <MyResponsiveBar data={data} />
            </div>
        </>
    );
};

export { BarChart };







