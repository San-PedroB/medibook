import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";

import NameInput from "../formElements/NameInput";
import RutInput from "../formElements/RutInput";
import PhoneInput from "../formElements/PhoneInput";
import EmailInput from "../formElements/EmailInput";
import DateInput from "../formElements/DateInput";
import PrevisionTypeSelect from "../formElements/PrevisionTypeSelect";
import GenderSelect from "../formElements/GenderSelect";
import SubmitButton from "../formElements/SubmitButton";
import ErrorMessage from "../formElements/ErrorMessage";
import CountrySelect from "../formElements/CountrySelect";
import TextInput from "../formElements/TextInput";

import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { validatePatientForm } from "../../utils/validationSchemas";

export default function PatientForm({
  initialValues = {},
  onSubmit,
  isSubmitting,
  errorMessage,
  submitText = "Registrar paciente", // Personaliza el texto del botón
  showObligatoryNote = true,
}) {
  // Hook por cada campo, con valor inicial o vacío
  const firstName     = useFormField(initialValues.firstName ?? "");
  const lastNameP     = useFormField(initialValues.lastNameP ?? "");
  const lastNameM     = useFormField(initialValues.lastNameM ?? "");
  const rut           = useFormField(initialValues.rut ?? "");
  const phone         = useFormField(initialValues.phone ?? "");
  const email         = useFormField(initialValues.email ?? "");
  const birthDate     = useFormField(initialValues.birthDate ?? "");
  const previsionType = useFormField(initialValues.previsionType ?? "");
  const nationality   = useFormField(initialValues.nationality ?? "");
  const address       = useFormField(initialValues.address ?? "");
  const gender        = useFormField(initialValues.gender ?? "");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Si las props iniciales cambian (ej: editando otro paciente), actualiza los campos
  useEffect(() => {
    firstName.setValue(initialValues.firstName ?? "");
    lastNameP.setValue(initialValues.lastNameP ?? "");
    lastNameM.setValue(initialValues.lastNameM ?? "");
    rut.setValue(initialValues.rut ?? "");
    phone.setValue(initialValues.phone ?? "");
    email.setValue(initialValues.email ?? "");
    birthDate.setValue(initialValues.birthDate ?? "");
    previsionType.setValue(initialValues.previsionType ?? "");
    nationality.setValue(initialValues.nationality ?? "");
    address.setValue(initialValues.address ?? "");
    gender.setValue(initialValues.gender ?? "");
    // eslint-disable-next-line
  }, [JSON.stringify(initialValues)]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const valuesToValidate = [
      firstName.value,
      lastNameP.value,
      lastNameM.value,
      rut.value,
      phone.value,
      email.value,
      birthDate.value,
      previsionType.value,
      nationality.value,
      address.value,
      gender.value,
    ];

    if (!validateFields(valuesToValidate)) return;

    const formValues = {
      firstName: firstName.value.trim(),
      lastNameP: lastNameP.value.trim(),
      lastNameM: lastNameM.value.trim(),
      rut: rut.value.trim(),
      phone: phone.value.trim(),
      email: email.value.trim(),
      birthDate: birthDate.value,
      previsionType: previsionType.value,
      nationality: nationality.value.trim(),
      address: address.value.trim(),
      gender: gender.value,
    };

    const errors = validatePatientForm(formValues);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    onSubmit(formValues);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {showObligatoryNote && (
        <div className="mb-3">
          <Form.Text className="text-muted">
            * Todos los campos son obligatorios
          </Form.Text>
        </div>
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <Row className="mb-3">
        <Col md={4}>
          <NameInput
            {...firstName}
            controlId="firstName"
            label="Nombre"
            hasSubmitted={hasSubmitted}
            isInvalid={hasSubmitted && !!fieldErrors.firstName}
            errorMessage={fieldErrors.firstName}
          />
        </Col>
        <Col md={4}>
          <NameInput
            {...lastNameP}
            controlId="lastNameP"
            label="Apellido Paterno"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.lastNameP}
            errorMessage={fieldErrors.lastNameP}
          />
        </Col>
        <Col md={4}>
          <NameInput
            {...lastNameM}
            controlId="lastNameM"
            label="Apellido Materno"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.lastNameM}
            errorMessage={fieldErrors.lastNameM}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <RutInput
            {...rut}
            label="RUT"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.rut}
            errorMessage={fieldErrors.rut}
          />
        </Col>
        <Col md={4}>
          <PhoneInput
            {...phone}
            label="Teléfono"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.phone}
            errorMessage={fieldErrors.phone}
          />
        </Col>
        <Col md={4}>
          <EmailInput
            {...email}
            label="Correo Electrónico"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.email}
            errorMessage={fieldErrors.email}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <DateInput
            {...birthDate}
            label="Fecha de Nacimiento"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.birthDate}
            errorMessage={fieldErrors.birthDate}
          />
        </Col>
        <Col md={4}>
          <PrevisionTypeSelect
            {...previsionType}
            label="Previsión"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.previsionType}
            errorMessage={fieldErrors.previsionType}
          />
        </Col>
        <Col md={4}>
          <GenderSelect
            {...gender}
            label="Género"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.gender}
            errorMessage={fieldErrors.gender}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <CountrySelect
            {...nationality}
            controlId="nationality"
            label="Nacionalidad"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.nationality}
            errorMessage={fieldErrors.nationality}
          />
        </Col>
        <Col md={6}>
          <TextInput
            {...address}
            controlId="address"
            label="Dirección"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.address}
            errorMessage={fieldErrors.address}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} className="d-grid">
          <SubmitButton isSubmitting={isSubmitting} text={submitText} />
        </Col>
      </Row>
    </Form>
  );
}
