// src/components/RegisterAdminCompanyForm.jsx
import React, { useState } from 'react';
import { Form, Card, Row, Col, Container, Alert } from 'react-bootstrap';
import NameInput from '../formElements/NameInput';
import RutInput from '../formElements/RutInput';
import PhoneInput from '../formElements/PhoneInput';
import EmailInput from '../formElements/EmailInput';
import PasswordInput from '../formElements/PasswordInput';
import TextInput from '../formElements/TextInput';
import SubmitButton from '../formElements/SubmitButton';
import { registerAdminWithCompany } from '../../services/userService';
import { validateRegisterAdminCompanyForm } from '../../utils/validationSchemas';
import { passwordsMatch, isStrongPassword } from '../../utils/passwordUtils';
import { cleanPhoneNumber } from '../../utils/phoneUtils';

async function isRutRegistered(rut) {
  return false;
}

export default function RegisterAdminCompanyForm() {
  const [admin, setAdmin] = useState({ firstName: '', lastNameP: '', lastNameM: '', rutAdmin: '', phoneAdmin: '' });
  const [company, setCompany] = useState({ name: '', businessName: '', rutCompany: '', industry: '', phoneCompany: '', street: '', number: '', office: '', city: '', website: '' });
  const [account, setAccount] = useState({ email: '', password: '', confirmPassword: '', acceptTerms: true });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAdminChange = ({ target }) => {
    setAdmin(prev => ({ ...prev, [target.name]: target.value }));
    setFieldErrors(prev => ({ ...prev, [target.name]: null }));
  };

  const handleCompanyChange = ({ target }) => {
    setCompany(prev => ({ ...prev, [target.name]: target.value }));
    setFieldErrors(prev => ({ ...prev, [target.name]: null }));
  };

  const handleAccountChange = ({ target }) => {
    setAccount(prev => ({ ...prev, [target.name]: target.value }));
    setFieldErrors(prev => ({ ...prev, [target.name]: null }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    const errors = validateRegisterAdminCompanyForm({ admin, company, account });

    if (!isStrongPassword(account.password)) {
      errors.password = 'Debe tener entre 8 y 32 caracteres, incluir mayúsculas, minúsculas, números y símbolos';
    }

    if (!passwordsMatch(account.password, account.confirmPassword)) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!errors.rutAdmin && await isRutRegistered(admin.rutAdmin)) errors.rutAdmin = 'RUT ya registrado';
    if (!errors.rutCompany && await isRutRegistered(company.rutCompany)) errors.rutCompany = 'RUT ya registrado';

    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    try {
      const cleanedAdmin = {
        ...admin,
        phoneAdmin: cleanPhoneNumber(admin.phoneAdmin)
      };

      const cleanedCompany = {
        ...company,
        phoneCompany: cleanPhoneNumber(company.phoneCompany)
      };

      const result = await registerAdminWithCompany({
        admin: cleanedAdmin,
        company: cleanedCompany,
        account
      });

      console.log('✅ Registro exitoso:', result);
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <Container className='my-4'>
      <h2 className='mb-4 text-center'>Registro de Empresa y Administrador</h2>
      {submitError && <Alert variant='danger'>{submitError}</Alert>}
      {submitSuccess && <Alert variant='success'>Registro exitoso.</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Card className='mb-4'>
          <Card.Header>Datos del Administrador</Card.Header>
          <Card.Body>
            <Row className='g-3'>
              <Col md={4}><NameInput name='firstName' label='Nombre' placeholder='Ej: Juan' value={admin.firstName} onChange={handleAdminChange} isInvalid={!!fieldErrors.firstName} errorMessage={fieldErrors.firstName} /></Col>
              <Col md={4}><NameInput name='lastNameP' label='Apellido paterno' placeholder='Ej: Pérez' value={admin.lastNameP} onChange={handleAdminChange} isInvalid={!!fieldErrors.lastNameP} errorMessage={fieldErrors.lastNameP} /></Col>
              <Col md={4}><NameInput name='lastNameM' label='Apellido materno' placeholder='Ej: Soto' value={admin.lastNameM} onChange={handleAdminChange} isInvalid={!!fieldErrors.lastNameM} errorMessage={fieldErrors.lastNameM} /></Col>
            </Row>
            <Row className='g-3 mt-2'>
              <Col md={6}><RutInput name='rutAdmin' label='RUT del administrador' placeholder='Ej: 18529883-3' value={admin.rutAdmin} onChange={handleAdminChange} isInvalid={!!fieldErrors.rutAdmin} errorMessage={fieldErrors.rutAdmin} helpText='Debe ir sin puntos y con guión.'/></Col>
              <Col md={6}><PhoneInput name='phoneAdmin' label='Teléfono de contacto' placeholder='Ej: 56912345678' value={admin.phoneAdmin} onChange={handleAdminChange} isInvalid={!!fieldErrors.phoneAdmin} errorMessage={fieldErrors.phoneAdmin} /></Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className='mb-4'>
          <Card.Header>Datos de la Empresa</Card.Header>
          <Card.Body>
            <Row className='g-3'>
              <Col md={6}><NameInput name='name' label='Nombre de la empresa' placeholder='Ej: Servicios Médicos SPA' value={company.name} onChange={handleCompanyChange} isInvalid={!!fieldErrors.name} errorMessage={fieldErrors.name} /></Col>
              <Col md={6}><NameInput name='businessName' label='Razón social' placeholder='Ej: SERMED S.A.' value={company.businessName} onChange={handleCompanyChange} isInvalid={!!fieldErrors.businessName} errorMessage={fieldErrors.businessName} /></Col>
            </Row>
            <Row className='g-3 mt-2'>
              <Col md={4}><RutInput name='rutCompany' label='RUT de la empresa' placeholder='Ej: 12345678-9' value={company.rutCompany} onChange={handleCompanyChange} isInvalid={!!fieldErrors.rutCompany} errorMessage={fieldErrors.rutCompany} helpText='Debe ir sin puntos y con guión.'/></Col>
              <Col md={4}><NameInput name='industry' label='Giro / Actividad' placeholder='Ej: Servicios de salud' value={company.industry} onChange={handleCompanyChange} isInvalid={!!fieldErrors.industry} errorMessage={fieldErrors.industry} /></Col>
              <Col md={4}><PhoneInput name='phoneCompany' label='Teléfono empresa' placeholder='Ej: 56998765432' value={company.phoneCompany} onChange={handleCompanyChange} isInvalid={!!fieldErrors.phoneCompany} errorMessage={fieldErrors.phoneCompany} /></Col>
            </Row>
            <Row className='g-3 mt-2'>
              <Col md={4}><NameInput name='street' label='Calle' placeholder='Ej: Av. Libertador' value={company.street} onChange={handleCompanyChange} isInvalid={!!fieldErrors.street} errorMessage={fieldErrors.street} /></Col>
              <Col md={4}><NameInput name='number' label='Número' placeholder='Ej: 1234' value={company.number} onChange={handleCompanyChange} isInvalid={!!fieldErrors.number} errorMessage={fieldErrors.number} /></Col>
              <Col md={4}><TextInput name='office' label='Oficina (opcional)' placeholder='Ej: Piso 3, Of. 12B' value={company.office} onChange={handleCompanyChange} isInvalid={!!fieldErrors.office} errorMessage={fieldErrors.office}/></Col>
            </Row>
            <Row className='g-3 mt-2'>
              <Col md={6}><NameInput name='city' label='Ciudad / Comuna' placeholder='Ej: Santiago' value={company.city} onChange={handleCompanyChange} isInvalid={!!fieldErrors.city} errorMessage={fieldErrors.city} /></Col>
              <Col md={6}><EmailInput name='website' label='Sitio web (opcional)' placeholder='https://midominio.cl' value={company.website} onChange={handleCompanyChange} isInvalid={!!fieldErrors.website} errorMessage={fieldErrors.website} /></Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className='mb-4'>
          <Card.Header>Datos de la Cuenta</Card.Header>
          <Card.Body>
            <Row className='g-3'>
              <Col md={6}><EmailInput name='email' label='Correo electrónico' placeholder='correo@dominio.com' value={account.email} onChange={handleAccountChange} isInvalid={!!fieldErrors.email} errorMessage={fieldErrors.email} /></Col>
              <Col md={6}>
                <PasswordInput name='password' label='Contraseña' placeholder='********' value={account.password} onChange={handleAccountChange} isInvalid={!!fieldErrors.password} errorMessage={fieldErrors.password} />
                <small className='text-muted d-block mt-1'>Mínimo 8 y máximo 32 caracteres. Debe incluir mayúsculas, minúsculas, números y símbolos.</small>
              </Col>
            </Row>
            <Row className='g-3 mt-2'>
              <Col md={6}><PasswordInput name='confirmPassword' label='Confirmar contraseña' placeholder='********' value={account.confirmPassword} onChange={handleAccountChange} isInvalid={!!fieldErrors.confirmPassword} errorMessage={fieldErrors.confirmPassword} /></Col>
            </Row>
          </Card.Body>
        </Card>

        <div className='text-center'>
          <SubmitButton />
        </div>
      </Form>
    </Container>
  );
}
