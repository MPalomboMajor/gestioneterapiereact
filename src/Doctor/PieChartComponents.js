import { ResponsivePie } from '@nivo/pie'

const data = [
    {
        "id": "causa1",
        "label": "Causa1",
        "value": 207,
        "color": "hsl(161, 70%, 50%)"
    },
    {
        "id": "causa2",
        "label": "Causa2",
        "value": 9,
        "color": "hsl(86, 70%, 50%)"
    },
    {
        "id": "causa3",
        "label": "Causa3",
        "value": 246,
        "color": "hsl(329, 70%, 50%)"
    },
    {
        "id": "causa4",
        "label": "Causa4",
        "value": 161,
        "color": "hsl(135, 70%, 50%)"
    },
    {
        "id": "causa5",
        "label": "Causa5",
        "value": 38,
        "color": "hsl(168, 70%, 50%)"
    }
]

const commonProperties = {
    width: 800,
    height: 500,
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

export default function PieChart() {
    return (
        <div style={{ height: 300, width: 400 }}>
            <MyResponsivePie data={data} />
        </div>
    );
}
