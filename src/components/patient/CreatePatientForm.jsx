// src/components/patient/CreatePatientForm.jsx
import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import ErrorMessage from "../formElements/ErrorMessage";
import NameInput from "../formElements/NameInput";
import EmailInput from "../formElements/EmailInput";
import PhoneInput from "../formElements/PhoneInput";
import DateInput from "../formElements/DateInput";
import CountrySelect from "../formElements/CountrySelect";
import { RutInput } from "../formElements/RutInput";
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
    lastName,
    rutNumber,
    rutDv,
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
        <Form.Text className="text-muted">* Todos los campos son obligatorios</Form.Text>
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <ErrorMessage message={errorMessage} forwardedRef={errorRef} />
      )}

      <Row className="g-3">
        <Col md={6}>
          <NameInput
            field={firstName}
            controlId="firstName"
            label="Nombre"
            placeholder="Ej: Juan"
          />
        </Col>
        <Col md={6}>
          <NameInput
            field={lastName}
            controlId="lastName"
            label="Apellido"
            placeholder="Ej: Pérez"
          />
        </Col>
        <Col md={6}>
          <RutInput
            numberField={rutNumber}
            dvField={rutDv}
            controlId="rut"
            label="Rut"
            placeholderNumber="Ej: 12345678"
            placeholderDv="9"
          />
        </Col>
        <Col md={6}>
          <PhoneInput
            field={phone}
            controlId="phone"
            label="Teléfono"
          />
        </Col>
        <Col md={6}>
          <EmailInput
            field={email}
            controlId="email"
            label="Email"
            placeholder="Ej: paciente@mail.com"
          />
        </Col>
        <Col md={6}>
          <DateInput
            field={birthDate}
            controlId="birthDate"
            label="Fecha de nacimiento"
          />
        </Col>
        <Col md={6}>
          <Form.Group controlId="previsionType" className="mb-3">
            <Form.Label>Tipo de previsión</Form.Label>
            <Form.Select
              value={previsionType.value}
              onChange={previsionType.onChange}
              style={{
                width: "100%",
                height: "calc(1.5em + 0.75rem + 2px)",
                padding: "0.375rem 0.75rem",
                fontSize: "1rem",
                lineHeight: "1.5",
                border: "1px solid #CED4DA",
                borderRadius: ".25rem"
              }}
            >
              <option value="">Seleccione previsión</option>
              <option value="Fonasa">Fonasa</option>
              <option value="Isapre">Isapre</option>
              <option value="Otro">Otro</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <CountrySelect
            field={nationality}
            controlId="nationality"
            label="Nacionalidad"
          />
        </Col>
        <Col md={6}>
          <NameInput
            field={address}
            controlId="address"
            label="Dirección"
            placeholder="Ej: Av. Siempre Viva 123"
          />
        </Col>
        <Col md={6}>
          <Form.Group controlId="gender" className="mb-3">
            <Form.Label>Sexo/Género</Form.Label>
            <Form.Select
              value={gender.value}
              onChange={gender.onChange}
              style={{
                width: "100%",
                height: "calc(1.5em + 0.75rem + 2px)",
                padding: "0.375rem 0.75rem",
                fontSize: "1rem",
                lineHeight: "1.5",
                border: "1px solid #CED4DA",
                borderRadius: ".25rem"
              }}
            >
              <option value="">Seleccione género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </Form.Select>
          </Form.Group>
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
