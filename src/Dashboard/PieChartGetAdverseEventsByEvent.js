import { ResponsivePie } from '@nivo/pie'

function PieChartGetAdverseEventsByEvent(props) {
    const MyResponsivePie = ({ data /* see data tab */ }) => (
        <ResponsivePie
            {...props.commonProperties}
            data={data === null ? [] : data}
            margin={{ top: 0, right: 180, bottom: 80, left: 80 }}
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
            legends={[]}
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

export { PieChartGetAdverseEventsByEvent };







