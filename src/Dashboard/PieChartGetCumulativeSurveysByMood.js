import { ResponsivePie } from '@nivo/pie'

import { Row, Col, } from 'react-bootstrap';
import { Columns } from 'react-bootstrap-icons';

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
        />
    )

    return (<>
        <Row>
            <div style={{ height: 225, width: 240 }}>
                <MyResponsivePie data={props.data} commonProperties={props.commonProperties} />
            </div>
        </Row>
        <Row>
            <Col className='faccina1 mood-label'><p>Mood 1</p></Col>
            <Col className='faccina2 mood-label'><p>Mood 2</p></Col>
            <Col className='faccina3 mood-label'><p>Mood 3</p></Col>
            <Col className='faccina4 mood-label'><p>Mood 4</p></Col>
        </Row >
        <Row>
            <Col className='faccina5 mood-label'><p>Mood 5</p></Col>
            <Col className='faccina6 mood-label'><p>Mood 6</p></Col>
            <Col className='faccina7 mood-label'><p>Mood 7</p></Col>
            <Col className='faccina8 mood-label'><p>Mood 8</p></Col>
        </Row >
    </>

    );
};

export { PieChartGetCumulativeSurveysByMood };







