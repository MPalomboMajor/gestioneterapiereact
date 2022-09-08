import { ResponsiveLine } from '@nivo/line'
import { dashboard } from '../helpers/api/api'
import { useState, useEffect } from 'react';
import moment from 'moment';

function LineChartGetMonthlyTrend(props) {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth > 576 ? 600 : 325
    })
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setDimensions({
            width: (45 / 100) * window.innerWidth > 600 ? 600 : (60 / 100) * window.innerWidth  < 576 ?(75 / 100) * window.innerWidth> 390 ?425 : 320:(45 / 100) * window.innerWidth  ,
          });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }, []); 
    const MyResponsiveLine = ({ data /* see data tab */ }) => (

        <ResponsiveLine
            {...props.commonProperties}
            width={dimensions.width}
            data={data === null ? [] : data}
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
                legend: '',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
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
            <div style={{ height: 300, width: 300 }}>
                <MyResponsiveLine data={props.data} />
            </div>
        </>
    );
};

export { LineChartGetMonthlyTrend };







