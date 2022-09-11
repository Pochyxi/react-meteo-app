import { Col, Row, Card, Button } from "react-bootstrap"
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { BsFillCalendarDayFill } from 'react-icons/bs'

export const detTempC = (kelvin) => kelvin - 273

const ModaleLive = (props) => {

    return (

        <Row>
            <Col>
                <Card className="flex-column flex-md-row" style={{ width: '100%', flexDirection: 'row', backgroundColor: '#282c34', borderColor: 'gainsboro' }}>
                    <div>
                        <Button
                            className="h-100 w-100 btn-dark"
                            onClick={() => {
                                props.setStateOut('toggle', true)
                                props.setStateOut('city', '')
                            }}>
                            <FaRegArrowAltCircleLeft className="text-danger" /> <br />
                            indietro
                        </Button>
                    </div>
                    <div>
                        <Card.Img className="img-fluid mx-auto" variant="top" src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@4x.png`} />
                        <h4>{props.weather.weather[0].description}</h4>
                    </div>
                    <Card.Body className="text-center text-md-start d-flex  flex-md-row flex-wrap align-items-center justify-content-center justify-content-md-evenly">
                        <Card.Title className='b-card-title-margin' style={{ borderBottom: '1px solid white' }}>
                            Temperatura <br />
                            {detTempC(props.weather.main.temp).toFixed(2)} °C
                        </Card.Title>

                        <Card.Title className='b-card-title-margin' style={{ borderBottom: '1px solid white' }}>
                            Percepita <br />
                            {detTempC(props.weather.main.feels_like).toFixed(2)} °C
                        </Card.Title>

                        <Card.Title className='b-card-title-margin' style={{ borderBottom: '1px solid white' }}>
                            Massima <br />
                            {detTempC(props.weather.main.temp_max).toFixed(2)} °C
                        </Card.Title>

                        <Card.Title className='b-card-title-margin' style={{ borderBottom: '1px solid white' }}>
                            Minima <br />
                            {detTempC(props.weather.main.temp_min).toFixed(2)} °C
                        </Card.Title>

                        <Card.Title className='b-card-title-margin' style={{ borderBottom: '1px solid white' }}>
                            Umidità <br />
                            {props.weather.main.humidity}%
                        </Card.Title>
                    </Card.Body>
                    <div>
                        <Button size="lg" onClick={() => props.setStateOut('takeMore', true)} className="h-100 w-100 btn-dark">
                            <BsFillCalendarDayFill /> <br />
                            Più giorni
                        </Button>
                    </div>
                </Card>
            </Col>
        </Row >
    )
}
export default ModaleLive;
