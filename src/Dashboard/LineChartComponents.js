import { ResponsiveLine } from '@nivo/line'
import { dashboard } from '../helpers/api/api'
import { useState, useEffect } from 'react';
import moment from 'moment';

function LineChart() {
    const [dataInizio, setDataInizio] = useState();
    const [dataFine, setDataFine] = useState();
    const [data, setData] = useState([
        {
            "id": "Registrati",
            "color": "hsl(233, 100%, 50%)",
            "data": [
                { "x": "06/2022", "y": 0 },
                { "x": "05/2022", "y": 3 },
                { "x": "04/2022", "y": 0 },
                { "x": "03/2022", "y": 0 }
            ]
        },
        {
            "id": "Attivi",
            "color": "hsl(37, 100%, 50%)",
            "data":
                [
                    { "x": "06/2022", "y": 0 },
                    { "x": "05/2022", "y": 0 },
                    { "x": "04/2022", "y": 0 },
                    { "x": "03/2022", "y": 0 }
                ]
        }
    ]);

    function fetchData(evt) {
        evt.preventDefault();
        dashboard.getWithParam("GetMonthlyTrend/", { params: { DataFine: dataFine, DataInizio: dataInizio } })
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

    const MyResponsiveLine = ({ data /* see data tab */ }) => (
        <ResponsiveLine
            {...commonProperties}
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
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
                <MyResponsiveLine data={data} />
            </div>
        </>
    );
};

export { LineChart };







