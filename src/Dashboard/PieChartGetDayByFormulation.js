import { ResponsivePie } from '@nivo/pie'

function PieChartGetDayByFormulation(props) {

    const MyResponsivePie = ({ data /* see data tab */ }) => (
        <ResponsivePie
            {...props.commonProperties}
            data={data === null ? [] : data}
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
            arcLinkLabel={function(e){return e.id + " mg"}}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabel={function(e){return e.value + " giorni"}}
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
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 50,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'top-to-bottom',
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
            <div style={{ height: 300, width: 300 }}>
                <MyResponsivePie data={props.data} commonProperties={props.commonProperties} />
                
            </div>
        </>
    );
};

export { PieChartGetDayByFormulation };







