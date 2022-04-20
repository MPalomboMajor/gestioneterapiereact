import { Col, Table, Form, Button, Container, Row, Carousel } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../helpers/api/api';

function BloodTestsInfo() {
    const [patientId, setPatientId] = useState(window.location.pathname.split('/').pop());
    const [days, setDays] = useState([]);

    useEffect(() => {
        const fetchDays = async () => {
            await api.get("/GetTestBloodDays/", patientId)
                .then((response) => {
                    if (response.status === 200) {
                        setDays(response.data);
                    }
                }).catch((error) => {

                });
        };
        fetchDays();
    }, []);

    return (
        <>
            <Row className='col-12 pt-4' >
                <div className='col-12'>
                    <h2>Analisi del sangue</h2>
                </div>
            </Row>
            &nbsp;&nbsp;
            <Row>
                <Col className='mb-3'>
                    <BloodTestSelectDay listDays={days} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ControlledCarouselBloodTests />
                </Col>
                <Col>
                    <BloodTestTable />
                </Col>
            </Row>
            <div className='mb-3'>
                <Button type='submit' >Indietro</Button> <Button type='submit' >Torna a elenco pazienti</Button> <Button type='submit' >Avanti</Button>
            </div>

        </>
    );
}



function BloodTestSelectDay() {
    const [day, setDay] = useState();

    useEffect(() => {
        const fetchDays = async () => {
            await api.get("/GetImgTestBloodDay/", day)
                .then((response) => {
                    if (response.status === 200) {
                        ControlledCarouselBloodTests(response.data);
                        BloodTestTable(response.data);
                    }
                }).catch((error) => {

                });
        };
        fetchDays();
    }, [day]);


    return (
        <Form.Control as="select" defaultValue='' value={day} onChange={event => setDay(event.target.value)} >
            <option>Seleziona una data</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            {/* { props.listDays.map(listDays => 
          <option key={listDays.id} value={course.uploadedDateTime}>
            {course.name}
          </option>) } */}
        </Form.Control>
    );
}

function ControlledCarouselBloodTests(response) {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://pbs.twimg.com/media/C7M4QqPXkAAy5o8?format=jpg&name=medium"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://pbs.twimg.com/media/C7M4QqbXgAAYfiR?format=jpg&name=large"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://pbs.twimg.com/media/C7M4QqcXkAANKpV?format=jpg&name=large"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            {/* {response.imgs.map(img => (
          <Carousel.Item key={img.id}>
            <img
              className="testimonialImages d-block w-50"
              src={img.image}
              alt={img.author}
            />
            <Carousel.Caption>
              <h3>{img.author}</h3>
              <p>{img.content}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))} */}
        </Carousel>
    );
}

function BloodTestTable(response) {
    return (
        <>

            <div className='col-6'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>

                            <th></th>
                            <th>Valore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response.data?.map((drugNameConcentration) => <BloodTestRow key={drugNameConcentration.id} drugNameConcentration={drugNameConcentration} />)
                        }
                    </tbody>
                </Table>
            </div>



        </>
    );
}

function BloodTestRow(props) {
    return <tr><BloodTestRowData drugNameConcentration={props.drugNameConcentration} /></tr>
}

function BloodTestRowData(props) {
    return (<>
        <td>{props.drugNameConcentration.name === 0 ? "dataEvento" : "dataEvento"}</td>
        <td>{props.drugNameConcentration.concentration === 0 ? "disturboEvento" : "disturboEvento"}</td>

    </>
    );
}






export { BloodTestsInfo };