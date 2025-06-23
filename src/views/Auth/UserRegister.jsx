import React, { useState } from 'react';
import { Form, Card, Row, Col, Button, Container } from 'react-bootstrap';
import { registerAdminWithCompany } from '../../services/userService';



export default function RegisterAdminCompanyForm() {
  // Estado de los campos
  const [admin, setAdmin] = useState({
    firstName: '',
    lastNameP: '',
    lastNameM: '',
    rutAdmin: '',
    phoneAdmin: ''
  });
  const [company, setCompany] = useState({
    name: '',
    businessName: '',
    rutCompany: '',
    industry: '',
    street: '',
    number: '',
    office: '',
    city: '',
    phoneCompany: '',
    website: ''
  });
  const [account, setAccount] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleAdminChange = e => {
    const { name, value } = e.target;
    setAdmin(prev => ({ ...prev, [name]: value }));
  };
  const handleCompanyChange = e => {
    const { name, value } = e.target;
    setCompany(prev => ({ ...prev, [name]: value }));
  };
  const handleAccountChange = e => {
    const { name, value, type, checked } = e.target;
    setAccount(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
  const { uid, companyId } = await registerAdminWithCompany({ admin, company, account });
  // Aquí ya tienes el uid y el companyId creados en Auth y Firestore
  console.log("Registrado:", uid, companyId);
  // Redirige a dashboard o muestra mensaje de éxito
} catch (err) {
  console.error("Error al registrar:", err);
  // Muestra un Alert con err.message
}

    console.log({ admin, company, account });
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Registro de Empresa y Administrador</h2>
      <Form onSubmit={handleSubmit}>
        {/* Datos del Administrador */}
        <Card className="mb-4">
          <Card.Header>Datos del Administrador</Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name="firstName"
                    value={admin.firstName}
                    onChange={handleAdminChange}
                    placeholder="Nombre"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Apellido paterno</Form.Label>
                  <Form.Control
                    name="lastNameP"
                    value={admin.lastNameP}
                    onChange={handleAdminChange}
                    placeholder="Apellido paterno"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Apellido materno</Form.Label>
                  <Form.Control
                    name="lastNameM"
                    value={admin.lastNameM}
                    onChange={handleAdminChange}
                    placeholder="Apellido materno"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>RUT del administrador</Form.Label>
                  <Form.Control
                    name="rutAdmin"
                    value={admin.rutAdmin}
                    onChange={handleAdminChange}
                    placeholder="12.345.678-9"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Teléfono de contacto</Form.Label>
                  <Form.Control
                    name="phoneAdmin"
                    value={admin.phoneAdmin}
                    onChange={handleAdminChange}
                    placeholder="9 1234 5678"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Datos de la Empresa */}
        <Card className="mb-4">
          <Card.Header>Datos de la Empresa</Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nombre de la empresa</Form.Label>
                  <Form.Control
                    name="name"
                    value={company.name}
                    onChange={handleCompanyChange}
                    placeholder="Nombre comercial"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Razón social</Form.Label>
                  <Form.Control
                    name="businessName"
                    value={company.businessName}
                    onChange={handleCompanyChange}
                    placeholder="Razón social"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>RUT de la empresa</Form.Label>
                  <Form.Control
                    name="rutCompany"
                    value={company.rutCompany}
                    onChange={handleCompanyChange}
                    placeholder="12.345.678-9"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Giro / Actividad</Form.Label>
                  <Form.Control
                    name="industry"
                    value={company.industry}
                    onChange={handleCompanyChange}
                    placeholder="Ej: Medicina general"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Teléfono empresa</Form.Label>
                  <Form.Control
                    name="phoneCompany"
                    value={company.phoneCompany}
                    onChange={handleCompanyChange}
                    placeholder="(2) 2345 6789"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    name="street"
                    value={company.street}
                    onChange={handleCompanyChange}
                    placeholder="Nombre de la calle"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    name="number"
                    value={company.number}
                    onChange={handleCompanyChange}
                    placeholder="Número"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Oficina (opcional)</Form.Label>
                  <Form.Control
                    name="office"
                    value={company.office}
                    onChange={handleCompanyChange}
                    placeholder="Oficina, depto, etc."
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ciudad / Comuna</Form.Label>
                  <Form.Control
                    name="city"
                    value={company.city}
                    onChange={handleCompanyChange}
                    placeholder="Ej: Santiago"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Sitio web (opcional)</Form.Label>
                  <Form.Control
                    name="website"
                    value={company.website}
                    onChange={handleCompanyChange}
                    placeholder="https://"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Datos de la Cuenta */}
        <Card className="mb-4">
          <Card.Header>Datos de la Cuenta</Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={account.email}
                    onChange={handleAccountChange}
                    placeholder="correo@dominio.com"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={account.password}
                    onChange={handleAccountChange}
                    placeholder="********"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={account.confirmPassword}
                    onChange={handleAccountChange}
                    placeholder="********"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  name="acceptTerms"
                  checked={account.acceptTerms}
                  onChange={handleAccountChange}
                  label="Acepto términos y condiciones"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Registrarse
          </Button>
        </div>
      </Form>
    </Container>
  );
}
