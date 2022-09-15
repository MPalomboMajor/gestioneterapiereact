import { ResponsiveHeatMap } from '@nivo/heatmap'
import { role } from '../helpers/Constants';

function HeatMapGetTrackingMoodByPatient(props) {
  const user = JSON.parse(localStorage.getItem("role"));
    const isDoctor = user.idRole === role.DOCTOR ? true : false
   // const colors = ['#f5c342', '#fdff54', '#891910', '#4faeee', '#143165']

  const MyResponsiveHeatMap = ({ data /* see data tab */ }) => (
    
    <ResponsiveHeatMap
      width={380}
      height={300}
      valueFormat= " >-.2d"
      animate={false}
      activeOuterRadiusOffset={8}
      data={data === null ? [] : data}
      margin={{ top: 70, right: 90, bottom: 60, left: 90 }}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 46
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -72
        }}
        colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            minValue: 1,
            maxValue: 5,
            divergeAt: 0.5
        }}
        
        enableGridX={false}
        enableGridY={false}
        emptyColor="#555555"
        labelTextColor={{
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
                translateX: 0,
                translateY: 30,
                length: 300,
                thickness: 8,
                direction: 'row',  
                tickPosition: 'after',
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                tickFormat: e => Math.floor(e) === e && e,
                title: 'Value →',
                titleAlign: 'start',
                titleOffset: 4
            }
        ]}
        isInteractive={false}
    /> 
)
const MyResponsiveHeatMapCM = ({ data /* see data tab */ }) => (
    
  <ResponsiveHeatMap
    width={380}
    height={300}
    valueFormat= " >-.2d"
    animate={false}
    activeOuterRadiusOffset={8}
    data={data === null ? [] : data}
    margin={{ top: 70, right: 90, bottom: 60, left: 90 }}
      axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: '',
          legendOffset: 46
      }}
      axisLeft={null}
      colors={{
          type: 'diverging',
          scheme: 'red_yellow_blue',
          minValue: 1,
          maxValue: 5,
          divergeAt: 0.5
      }}
      
      enableGridX={false}
      enableGridY={false}
      emptyColor="#555555"
      labelTextColor={{
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
              translateX: 0,
              translateY: 30,
              length: 300,
              thickness: 8,
              direction: 'row',  
              tickPosition: 'after',
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              tickFormat: e => Math.floor(e) === e && e,
              title: 'Value →',
              titleAlign: 'start',
              titleOffset: 4
          }
      ]}
      isInteractive={false}
  /> 
)
  return (
    <>

      <div style={{ height: 300, width: 300 }}>
      {isDoctor ? <MyResponsiveHeatMap data={props.data} commonProperties={props.commonProperties} /> : <MyResponsiveHeatMapCM data={props.data} commonProperties={props.commonProperties}/>}
      </div>
    </>
  );
};

export { HeatMapGetTrackingMoodByPatient };

