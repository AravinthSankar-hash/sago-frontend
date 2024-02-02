import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRef, useMemo, useState } from 'react';
import login_logo from '../assets/images/8gate_logo.svg';
import slide_one from '../assets/images/slide1.svg';
import slide_two from '../assets/images/slide2.svg';
import login_bg from '../assets/images/login_bg.svg';
import Carousel from 'react-bootstrap/Carousel';
import GenericService from '../services/generic.api.js';
import Toaster from '../components/helper/Snackbar.jsx';

export default function Login({ setToken }) {
  const [toasterBackground, setToasterBackground] = useState(null);
  const [toasterMsg, setToasterMsg] = useState('Procurement data saved');
  const [shouldShowToaster, setShouldShowToaster] = useState(false);

  const fontHeader = { font: 'Roboto', fontSize: '26px' };
  const inputStyle = {
    background: 'linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(0deg, #DFE1E6, #DFE1E6)'
  };
  const containerRef = useRef();
  const gridStyle = useMemo(
    () => ({
      width: '100%',
      overflowY: 'auto',
      fontSize: '14px',
      fontFamily: 'Roboto'
    }),
    []
  );
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    invokeLoginAPI({
      username: data.username,
      password: btoa(data.password)
    });
  };

  function invokeLoginAPI(payload) {
    GenericService.login(payload)
      .then((response) => {
        invokeToaster('Login success');
        setToken(response?.data?.token || null);
      })
      .catch((error) => {
        invokeToaster('Invalid Credentials', 'red');
        console.log('Error in user login', error);
      });
  }

  const invokeToaster = (msg, backgroundClr = null) => {
    if (msg) {
      setToasterMsg(msg);
    }
    if (backgroundClr) {
      setToasterBackground(backgroundClr);
      setShouldShowToaster(Math.random());
    }
    setShouldShowToaster(Math.random());
  };
  return (
    <Container ref={containerRef} className="ag-theme-alpine mt-4" style={{ ...gridStyle }}>
      <Row>
        <Col lg={5} style={{ marginTop: '150px' }}>
          <Row>
            {' '}
            <div className="d-flex align-items-center">
              <img src={login_logo}></img>
            </div>
          </Row>
          <Row>
            <div className="mt-5">
              <p style={fontHeader} className="mb-0">
                Login
              </p>
              <text style={{ fontSize: '15px', color: 'grey' }}>
                See your dashboard by logging in!
              </text>
            </div>
          </Row>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mt-4">
              <Form.Group as={Col} lg={6}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  style={inputStyle}
                  {...register('username', {
                    required: 'Required'
                  })}
                />
                {errors.username && (
                  <Form.Text className="text-danger">{errors.username.message}</Form.Text>
                )}
              </Form.Group>
            </Row>
            <Row className="mt-4">
              <Form.Group as={Col} lg={6}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  style={inputStyle}
                  {...register('password', {
                    required: 'Required'
                  })}
                />
                {errors.username && (
                  <Form.Text className="text-danger">{errors.password.message}</Form.Text>
                )}
              </Form.Group>
            </Row>
            <Row className="mt-4">
              <div>
                <Button
                  type="submit"
                  style={{
                    width: '250px',
                    color: '#FFFFFF',
                    border: 'none',
                    backgroundColor: '#00B7FF'
                  }}>
                  Login
                </Button>
              </div>
            </Row>
          </Form>
          <Row></Row>
          <Row className="mt-5" style={{ fontSize: '12px', color: 'grey' }}>
            {' '}
            <div>© 2022 ERP, All Rights Reserved</div>
          </Row>
        </Col>
        <Col lg={7} style={{ backgroundImage: `url(${login_bg})` }} className="mt-5">
          <Carousel>
            <Carousel.Item>
              <div style={{ position: 'relative' }}>
                <img src={slide_one} alt="First slide" style={{ width: '100%', height: '100%' }} />
                <Carousel.Caption
                  style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}></Carousel.Caption>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={{ position: 'relative' }}>
                <img src={slide_two} alt="First slide" style={{ width: '100%', height: '100%' }} />
                <Carousel.Caption
                  style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}></Carousel.Caption>
              </div>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Toaster
        shouldOpen={shouldShowToaster}
        message={toasterMsg}
        backgroundColor={toasterBackground}></Toaster>
    </Container>
  );
}
