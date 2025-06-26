// src/components/patient/CreatePatientForm.jsx
import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import ErrorMessage from "../formElements/ErrorMessage";
import NameInput from "../formElements/NameInput";
import RutInput from "../formElements/RutInput";
import EmailInput from "../formElements/EmailInput";
import PhoneInput from "../formElements/PhoneInput";
import DateInput from "../formElements/DateInput";
import CountrySelect from "../formElements/CountrySelect";
import PrevisionTypeSelect from "../formElements/PrevisionTypeSelect";
import GenderSelect from "../formElements/GenderSelect";
import SubmitButton from "../formElements/SubmitButton";

export default function CreatePatientForm({
  formFields,
  onSubmit,
  isSubmitting,
  errorMessage,
  errorRef
}) {
  const {
    firstName,
    lastNameP,   
    lastNameM,   
    rut,
    phone,
    email,
    birthDate,
    previsionType,
    nationality,
    address,
    gender
  } = formFields;

  return (
    <Form onSubmit={onSubmit}>
      {/* Nota de obligatoriedad */}
      <div className="mb-3">
        <Form.Text className="text-muted">
          * Todos los campos son obligatorios
        </Form.Text>
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <ErrorMessage message={errorMessage} forwardedRef={errorRef} />
      )}

      <Row className="g-3">
        <Col md={6}>
          <NameInput
            {...firstName}
            controlId="firstName"
            label="Nombre"
            placeholder="Ej: Juan"
          />
        </Col>
        <Col md={6}>
          <NameInput
            {...lastNameP}
            controlId="lastNameP"
            label="Apellido paterno"
            placeholder="Ej: González"
          />
        </Col>
        <Col md={6}>
          <NameInput
            {...lastNameM}
            controlId="lastNameM"
            label="Apellido materno"
            placeholder="Ej: Rojas"
          />
        </Col>
        <Col md={6}>
          <RutInput
            {...rut}
            controlId="rut"
            label="RUT"
            placeholder="Ej: 12.345.678-9"
          />
        </Col>
        <Col md={6}>
          <PhoneInput
            {...phone}
            controlId="phone"
            label="Teléfono"
          />
        </Col>
        <Col md={6}>
          <EmailInput
            {...email}
            controlId="email"
            label="Email"
            placeholder="Ej: paciente@mail.com"
          />
        </Col>
        <Col md={6}>
          <DateInput
            {...birthDate}
            controlId="birthDate"
            label="Fecha de nacimiento"
          />
        </Col>
        <Col md={6}>
          <PrevisionTypeSelect
            {...previsionType}
            controlId="previsionType"
            label="Tipo de previsión"
          />
        </Col>
        <Col md={6}>
          <CountrySelect
            {...nationality}
            controlId="nationality"
            label="Nacionalidad"
          />
        </Col>
        <Col md={6}>
          <NameInput
            {...address}
            controlId="address"
            label="Dirección"
            placeholder="Ej: Av. Siempre Viva 123"
          />
        </Col>
        <Col md={6}>
          <GenderSelect
            {...gender}
            controlId="gender"
            label="Sexo/Género"
          />
        </Col>
        <Col md={12} className="d-grid">
          <SubmitButton disabled={isSubmitting}>
            {isSubmitting ? "Cargando..." : "Registrar paciente"}
          </SubmitButton>
        </Col>
      </Row>
    </Form>
  );
}
