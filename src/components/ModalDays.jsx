import { Col, Row, Card, Button } from "react-bootstrap"
import { FaReact } from 'react-icons/fa'
import { useEffect, useState } from "react"
import { detTempC } from "./ModaleLive"
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im'
import { takeOnlyDate, mixerDays } from "../helpers/PochyDate"


const ModalDays = (props) => {
    const [days, setDays] = useState(null)
    const [dayChose, setDayChose] = useState(1)
    const [backFlag, setBackFlag] = useState(false)
    const [forwardFlag, setForwardFlag] = useState(false)

    const showS = () => {
        if (days?.arrOfInfo.length === 5) {
            if (dayChose === 1) { return takeOnlyDate(days.getDay1()[0].dt_txt).getDate() }
            if (dayChose === 2) { return takeOnlyDate(days.getDay2()[0].dt_txt).getDate() }
            if (dayChose === 3) { return takeOnlyDate(days.getDay3()[0].dt_txt).getDate() }
            if (dayChose === 4) { return takeOnlyDate(days.getDay4()[0].dt_txt).getDate() }
            if (dayChose === 5) { return takeOnlyDate(days.getDay5()[0].dt_txt).getDate() }
            if (dayChose === 6) { return takeOnlyDate(days.getLastDay()[0].dt_txt).getDate() }
        }

        if (days?.arrOfInfo.length === 4) {
            if (dayChose === 1) { return takeOnlyDate(days.getDay1()[0].dt_txt).getDate() }
            if (dayChose === 2) { return takeOnlyDate(days.getDay2()[0].dt_txt).getDate() }
            if (dayChose === 3) { return takeOnlyDate(days.getDay3()[0].dt_txt).getDate() }
            if (dayChose === 4) { return takeOnlyDate(days.getDay4()[0].dt_txt).getDate() }
            if (dayChose === 5) { return takeOnlyDate(days.getLastDay()[0].dt_txt).getDate() }
        }
    }

    const showConditional = () => {
        if (days.arrOfInfo.length === 5) {
            if (dayChose === 1) { return days.getDay1() }
            if (dayChose === 2) { return days.getDay2() }
            if (dayChose === 3) { return days.getDay3() }
            if (dayChose === 4) { return days.getDay4() }
            if (dayChose === 5) { return days.getDay5() }
            if (dayChose === 6) { return days.getLastDay() }
        }

        if (days.arrOfInfo.length === 4) {
            if (dayChose === 1) { return days.getDay1() }
            if (dayChose === 2) { return days.getDay2() }
            if (dayChose === 3) { return days.getDay3() }
            if (dayChose === 4) { return days.getDay4() }
            if (dayChose === 5) { return days.getLastDay() }
        }
    }


    const pointerEventsBack = () => {
        if (backFlag) { return 'none' } else { return 'auto' }
    }
    const pointerEventsForward = () => {
        if (forwardFlag) { return 'none' } else { return 'auto' }
    }

    useEffect(() => {
        fetchDays()
        showS()
        if (dayChose === 1) {
            setBackFlag(true)
        }
    }, [])

    useEffect(() => {
        showS()
        if (dayChose > 1) {
            setBackFlag(false)
        } else if (dayChose === 1) {
            setBackFlag(true)
        }
        if (dayChose === days?.arrOfInfo.length + 1) {
            setForwardFlag(true)
        } else if (dayChose < 6) {
            setForwardFlag(false)
        }
    }, [dayChose])


    const fetchDays = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city},it&APPID=c257347b25e5e8b03eb83e2d6b5ae1d1&lang=IT`);
            if (response.ok) {

                const data = await response.json();

                setDays(mixerDays(data.list));

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
                days ? (
                    <Col>
                        <Card className='d-flex justify-content-between pb-3' style={{ width: '100%', border: 'none', flexDirection: 'row', backgroundColor: '#282c34', borderColor: 'gainsboro' }}>
                            <Button className={`b-noButton ${backFlag ? 'noclick' : ''}`} style={{ pointerEvents: pointerEventsBack() }} onClick={() => {
                                setDayChose(dayChose - 1)
                            }}><ImArrowLeft /></Button>
                            <h2>{showS()}</h2>
                            <Button className={`b-noButton ${forwardFlag ? 'noclick' : ''}`} style={{ pointerEvents: pointerEventsForward() }} onClick={() => {
                                setDayChose(dayChose + 1)
                            }}><ImArrowRight /></Button>
                        </Card>

                        <Card className='d-flex justify-content-between' style={{ width: '100%', flexDirection: 'row', backgroundColor: '#282c34', borderColor: 'gainsboro' }}>
                            <Button onClick={() => {
                                props.setStateOut('takeMore', false)
                                props.setStateOut('toggle', false)

                            }} className="btn-dark text-danger"><FaRegArrowAltCircleLeft /> indietro</Button>
                            <Row className="text-center" style={{ width: '95%' }}>
                                {
                                    showConditional().map((day, i) => {
                                        return (
                                            <Col xs={12} md={6} lg={6} key={i} className="d-flex justify-content-between align-items-center">
                                                <Col>
                                                    {takeOnlyDate(day.dt_txt).getHour()}
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
                ) : (<Col className="mt-5 pt-5">
                    <FaReact className="b-faReact" />
                    <h2>Observing the future...</h2>
                </Col>)
            }

        </Row >
    )
}

export default ModalDays;