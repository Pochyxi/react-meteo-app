import { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import withRouter from '../helpers/withRouter';
import ModalDays from './ModalDays';
import ModaleLive from './ModaleLive';
import { RiReactjsLine } from 'react-icons/ri'


class PrevisioneLive extends Component {
    state = {
        city: '',
        weather: null,
        toggle: true,
        takeMore: false,
        wrongCity: false,
        formToggle: false,
    }
    setStateOut = (keyProp, valueProp) => {
        this.setState({ [keyProp]: valueProp })
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ formToggle: true })
        }, 3500)
    }
    fetchWeather = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},it&APPID=c257347b25e5e8b03eb83e2d6b5ae1d1&lang=IT`);
            if (response.ok) {

                const data = await response.json();

                this.setState({

                    toggle: false,
                })
                setTimeout(() => {
                    this.setState({
                        weather: data,
                    })
                }, 2000);
                console.log(data);

            } else {
                console.log('somewhere is not a valid weather')
                this.setState({ wrongCity: true });
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
                                {
                                    this.state.formToggle && (
                                        <>
                                            <h1>PREVISIONI LIVE</h1>
                                            {
                                                this.state.wrongCity && (
                                                    <div><RiReactjsLine className='text-danger' /> <span>{this.state.city}</span> non è un nome di città italiana valido! <RiReactjsLine className='text-danger' /></div>
                                                )
                                            }
                                            <form onSubmit={this.fetchWeather}>
                                                <Form.Group>
                                                    <Form.Control
                                                        required
                                                        className='text-center'
                                                        value={this.state.city}
                                                        onChange={(e) => {
                                                            this.setState({ wrongCity: false })
                                                            this.setState({ city: e.target.value })
                                                        }
                                                        }
                                                        type='text'
                                                        placeholder='Inserisci la città' />
                                                </Form.Group>
                                                <Button
                                                    type='submit'
                                                    className='btn-dark'>Vai</Button>
                                            </form>
                                        </>

                                    )
                                }

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