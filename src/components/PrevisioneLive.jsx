import { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import withRouter from '../helpers/withRouter';
import ModalDays from './ModalDays';
import ModaleLive from './ModaleLive';


class PrevisioneLive extends Component {
    state = {
        city: '',
        weather: null,
        toggle: true,
        takeMore: false,
    }
    setStateOut = (keyProp, valueProp) => {
        this.setState({ [keyProp]: valueProp })
    }
    fetchWeather = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},it&APPID=c257347b25e5e8b03eb83e2d6b5ae1d1&lang=IT`);
            if (response.ok) {

                const data = await response.json();

                this.setState({
                    weather: data,
                    toggle: false,
                })
                console.log(data);

            } else {
                console.log('somewhere is not a valid weather')
            }

        } catch (e) {
            console.log(e);
        }
    }
    render() {
        console.log(this.state)
        return (
            <Container>
                {
                    this.state.toggle ? (

                        <Row >
                            <Col>
                                <h1>PREVISIONI LIVE</h1>
                                <form onSubmit={this.fetchWeather}>
                                    <Form.Group>
                                        <Form.Control
                                            className='text-center'
                                            value={this.state.city}
                                            onChange={(e) => this.setState({ city: e.target.value })}
                                            type='text'
                                            placeholder='Inserisci la città' />
                                    </Form.Group>
                                    <Button
                                        type='submit'
                                        className='btn-dark'>Take weather</Button>
                                </form>
                            </Col>
                        </Row>
                    ) : !this.state.takeMore ? (
                        <ModaleLive setStateOut={this.setStateOut} takeMore={this.state.takeMore} weather={this.state.weather} />
                    ) : <ModalDays setStateOut={this.setStateOut} city={this.state.city} />
                }
            </Container>
        )
    }
}

export default withRouter(PrevisioneLive);