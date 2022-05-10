import { ResponsiveHeatMap } from '@nivo/heatmap'

const data = [
    {
      "id": "Japan",
      "data": [
        {
          "x": "Train",
          "y": -17543
        },
        {
          "x": "Subway",
          "y": -88084
        },
        {
          "x": "Bus",
          "y": -68858
        },
        {
          "x": "Car",
          "y": -3729
        },
        {
          "x": "Boat",
          "y": -54439
        },
        {
          "x": "Moto",
          "y": 4084
        },
        {
          "x": "Moped",
          "y": -95207
        },
        {
          "x": "Bicycle",
          "y": 35931
        },
        {
          "x": "Others",
          "y": 48573
        }
      ]
    },
    {
      "id": "France",
      "data": [
        {
          "x": "Train",
          "y": -71960
        },
        {
          "x": "Subway",
          "y": -39328
        },
        {
          "x": "Bus",
          "y": 32810
        },
        {
          "x": "Car",
          "y": -40079
        },
        {
          "x": "Boat",
          "y": -43097
        },
        {
          "x": "Moto",
          "y": -33057
        },
        {
          "x": "Moped",
          "y": 94024
        },
        {
          "x": "Bicycle",
          "y": -12127
        },
        {
          "x": "Others",
          "y": 93847
        }
      ]
    },
    {
      "id": "US",
      "data": [
        {
          "x": "Train",
          "y": -77654
        },
        {
          "x": "Subway",
          "y": -43415
        },
        {
          "x": "Bus",
          "y": 54005
        },
        {
          "x": "Car",
          "y": 54995
        },
        {
          "x": "Boat",
          "y": 72291
        },
        {
          "x": "Moto",
          "y": 62532
        },
        {
          "x": "Moped",
          "y": -74664
        },
        {
          "x": "Bicycle",
          "y": -35174
        },
        {
          "x": "Others",
          "y": 93113
        }
      ]
    },
    {
      "id": "Germany",
      "data": [
        {
          "x": "Train",
          "y": -45182
        },
        {
          "x": "Subway",
          "y": 65891
        },
        {
          "x": "Bus",
          "y": -16140
        },
        {
          "x": "Car",
          "y": -22618
        },
        {
          "x": "Boat",
          "y": -36581
        },
        {
          "x": "Moto",
          "y": -27187
        },
        {
          "x": "Moped",
          "y": -94238
        },
        {
          "x": "Bicycle",
          "y": 19121
        },
        {
          "x": "Others",
          "y": -88436
        }
      ]
    },
    {
      "id": "Norway",
      "data": [
        {
          "x": "Train",
          "y": -24636
        },
        {
          "x": "Subway",
          "y": 37789
        },
        {
          "x": "Bus",
          "y": 72139
        },
        {
          "x": "Car",
          "y": -24392
        },
        {
          "x": "Boat",
          "y": 72092
        },
        {
          "x": "Moto",
          "y": -67731
        },
        {
          "x": "Moped",
          "y": -95628
        },
        {
          "x": "Bicycle",
          "y": -25307
        },
        {
          "x": "Others",
          "y": 5825
        }
      ]
    },
    {
      "id": "Iceland",
      "data": [
        {
          "x": "Train",
          "y": -53707
        },
        {
          "x": "Subway",
          "y": -82104
        },
        {
          "x": "Bus",
          "y": -50941
        },
        {
          "x": "Car",
          "y": -10328
        },
        {
          "x": "Boat",
          "y": 7118
        },
        {
          "x": "Moto",
          "y": -54345
        },
        {
          "x": "Moped",
          "y": -84614
        },
        {
          "x": "Bicycle",
          "y": -9845
        },
        {
          "x": "Others",
          "y": -4093
        }
      ]
    },
    {
      "id": "UK",
      "data": [
        {
          "x": "Train",
          "y": 38942
        },
        {
          "x": "Subway",
          "y": 70514
        },
        {
          "x": "Bus",
          "y": 38935
        },
        {
          "x": "Car",
          "y": -39453
        },
        {
          "x": "Boat",
          "y": 91425
        },
        {
          "x": "Moto",
          "y": 77295
        },
        {
          "x": "Moped",
          "y": 37108
        },
        {
          "x": "Bicycle",
          "y": 10383
        },
        {
          "x": "Others",
          "y": 28494
        }
      ]
    },
    {
      "id": "Vietnam",
      "data": [
        {
          "x": "Train",
          "y": 28169
        },
        {
          "x": "Subway",
          "y": -19648
        },
        {
          "x": "Bus",
          "y": -16953
        },
        {
          "x": "Car",
          "y": 32468
        },
        {
          "x": "Boat",
          "y": -82153
        },
        {
          "x": "Moto",
          "y": 97662
        },
        {
          "x": "Moped",
          "y": -95592
        },
        {
          "x": "Bicycle",
          "y": 51764
        },
        {
          "x": "Others",
          "y": 26707
        }
      ]
    }
  ]

  const commonProperties = {
    width: 800,
    height: 500,
    animate: true,
    activeOuterRadiusOffset: 8,
}

const MyResponsiveHeatMap = ({ data /* see data tab */ }) => (
    <ResponsiveHeatMap
    {...commonProperties}
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 46
        }}
        axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 70
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: -72
        }}
        colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            divergeAt: 0.5,
            minValue: -100000,
            maxValue: 100000
        }}
        emptyColor="#555555"
        legends={[
            {
                anchor: 'bottom',
                translateX: 0,
                translateY: 30,
                length: 400,
                thickness: 8,
                direction: 'row',
                tickPosition: 'after',
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                tickFormat: '>-.2s',
                title: 'Value →',
                titleAlign: 'start',
                titleOffset: 4
            }
        ]}
    />
)

export default function HealtMapChart() {
    return (
      <div style={{ height: 300, width: 400 }}>
        <MyResponsiveHeatMap data={data} />
      </div>
    );
  }
