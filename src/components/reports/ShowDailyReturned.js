import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { request } from "../../axios_helper";
import moment from 'moment-timezone';

const RentingList = () => {
    const [listRenting, setRentingList] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchRentings = async () => {
            try {
                const response = await request('get', "/api/rentings");
                setRentingList(response.data);
            } catch (error) {
                console.error("Error fetching rentings:", error);
            }
        };
        fetchRentings();
    }, []);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setErrorMessage(''); // Reset error message when a new date is selected
    };

    const handleFilter = () => {
        if (!selectedDate) {
            setErrorMessage('Proszę wybrać datę.');
        }
    };

    const filteredRentings = listRenting
      .filter(value => value.dateOfReturn && moment(value.dateOfReturn).isSame(selectedDate, 'day')); // Filter for rentals returned on the selected date
//.filter(value => !value.dateOfReturn && value.dateRenting && moment(value.dateRenting).isSame(selectedDate, 'day'));
    const totalRentalsCount = filteredRentings.length;
    const totalPrice = filteredRentings.reduce((sum, value) => sum + value.priceOfDuration, 0);

    return (
        <div>
            <Container>
                <h2>Lista zwróconych wypożyczeń w dniu</h2>

                <Form.Group>
                    <Form.Label>Wybierz datę:</Form.Label>
                    <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleFilter} className="mt-2">
                    Filtruj
                </Button>

                {errorMessage && (
                    <Alert variant="danger" className="mt-3">
                        {errorMessage}
                    </Alert>
                )}

                <Row className="bg-light fw-bold text-center py-2 mb-3 mt-3">
                    <Col xs={1}>Id</Col>
                    <Col xs={1}>Imię</Col>
                    <Col xs={2}>Nazwisko</Col>
                    <Col xs={2}>Data wypożyczenia</Col>
                    <Col xs={2}>Sprzęt</Col>
                    <Col xs={2}>Data zwrotu</Col>
                    <Col xs={1}>Cena całkowita</Col>
                    <Col xs={1}>Ilość dni</Col>
                </Row>
                {
                    filteredRentings.length > 0 ? (
                        filteredRentings.map(value => {
                            const dateRentingFormat = moment.utc(value.dateRenting).tz('Europe/Warsaw').format('DD/MM/YY HH:mm');
                            const dateOfReturnFormat = moment.utc(value.dateOfReturn).tz('Europe/Warsaw').format('DD/MM/YY HH:mm');

                            return (
                                <Row className={`py-2 border-bottom text-center justify-content-between`} key={value.idRenting}>
                                    <Col xs={1}>{value.idRenting}</Col>
                                    <Col xs={1}>{value.firstName}</Col>
                                    <Col xs={2}>{value.lastName}</Col>
                                    <Col xs={2}>{dateRentingFormat}</Col>
                                    <Col xs={2}>{value.nameEquipment}</Col>
                                    <Col xs={2}>{dateOfReturnFormat}</Col>
                                    <Col xs={1}>{value.priceOfDuration}</Col>
                                    <Col xs={1}>{value.daysOfRental}</Col>
                                </Row>
                            );
                        })
                    ) : (
                        <Row>
                            <Col className="text-center">Brak zwróconych wypożyczeń na tę datę.</Col>
                        </Row>
                    )
                } {filteredRentings.length > 0 && (
                <Row className="fw-bold text-center mt-3">
                    <Col xs={8}>Ilość zwróconych wypożyczeń w ciągu dnia:</Col>
                    <Col xs={2}>{totalRentalsCount} wypożyczeń</Col>
                    <Col xs={2}></Col>
                </Row>
            )}
                {filteredRentings.length > 0 && (
                    <Row className="fw-bold text-center mt-3">
                        <Col xs={8}>Suma całkowita:</Col>
                        <Col xs={2}>{totalPrice} PLN</Col>
                        <Col xs={2}></Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default RentingList;