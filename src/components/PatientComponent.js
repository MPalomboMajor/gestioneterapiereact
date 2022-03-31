import { Col, Table } from 'react-bootstrap';

function PatientInfo() {
    return (
        <Col>
            <PatientTable />
        </Col>
    );
}

function PatientTable() {
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Codice Paziente</th>
                    <th>Codice Fiscale</th>
                    <th>Cognome</th>
                    <th>Nome</th>
                    <th>Telefono</th>
                    <th>Stato Paziente</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>

    );
}

export { PatientInfo };