import { ResponsivePie } from '@nivo/pie'

function PieChartGetCumulativeSurveysByMood(props) {
    const MyResponsivePie = ({ data /* see data tab */ }) => (
        <ResponsivePie
            {...props.commonProperties}
            data={data === null ? [] : data}
            margin={{ top: 40, right: 180, bottom: 80, left: 100 }}
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
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'column',
                    justify: true,
                    translateX: 160,
                    translateY: 50,
                    itemsSpacing: 1,
                    itemWidth: 60,
                    itemHeight: 40,
                    itemTextColor: '#999',
                    itemDirection: 'top-to-bottom',
                    itemOpacity: 1,
                    symbolSize: 10,
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
            <div style={{ height: 300, width: 300 }}>
                <MyResponsivePie data={props.data} commonProperties={props.commonProperties} />
            </div>
        </>
    );
};

export { PieChartGetCumulativeSurveysByMood };







