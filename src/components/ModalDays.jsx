import { Col, Row, Card, Button } from "react-bootstrap"
import { } from 'react-icons/fa'
import { useEffect, useState } from "react"
import { detTempC } from "./ModaleLive"
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'


const ModalDays = (props) => {
    const [days, setDays] = useState(null)

    useEffect(() => {
        fetchDays()
    }, [])

    const takeOnlyDate = (string) => {
        let stringArr = string.split('')
        let newArr = []
        for (let i = 0; i < stringArr.length; i++) {
            if (i >= 6) {
                newArr.push(string.substring(i, i + 1))
            }
        }
        return newArr.join('')
    }
    const fetchDays = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city},it&APPID=c257347b25e5e8b03eb83e2d6b5ae1d1&lang=IT`);
            if (response.ok) {

                const data = await response.json();
                console.log(data);
                setDays(data);

            } else {
                console.log('somewhere is not a valid weather')
            }

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Row>
            {
                days && (
                    <Col>

                        <Card className='d-flex justify-content-between' style={{ width: '100%', flexDirection: 'row', backgroundColor: '#282c34', borderColor: 'gainsboro' }}>
                            <Button onClick={() => {
                                props.setStateOut('takeMore', false)
                                props.setStateOut('toggle', false)

                            }} className="btn-dark text-danger"><FaRegArrowAltCircleLeft /></Button>
                            <Row className="text-center" style={{ width: '95%' }}>
                                {
                                    days.list.map((day, i) => {
                                        return (
                                            <Col xs={12} md={6} lg={6} key={i} className="d-flex justify-content-between align-items-center">
                                                <Col>
                                                    {takeOnlyDate(day.dt_txt)}
                                                </Col>

                                                <Col style={{ borderBottom: '1px solid white', height: '100%' }}>
                                                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt='' />
                                                </Col>
                                                <Col style={{ borderBottom: '1px solid white', height: '100%' }} className='d-flex flex-column justify-content-center align-items-center'>
                                                    <div>{day.weather[0].description}</div>
                                                    <div>{detTempC(day.main.temp).toFixed(2)} °C</div>
                                                </Col>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Card>
                    </Col>
                )
            }

        </Row >
    )
}

export default ModalDays;