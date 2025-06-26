import React, { useState } from "react";
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

export default function EditPatientForm({ formData, onSubmit, isSubmitting, errorMessage }) {
  const firstName = useFormField(formData.firstName);
  const lastNameP = useFormField(formData.lastNameP);
  const lastNameM = useFormField(formData.lastNameM);
  const rut = useFormField(formData.rut);
  const phone = useFormField(formData.phone);
  const email = useFormField(formData.email);
  const birthDate = useFormField(formData.birthDate);
  const previsionType = useFormField(formData.previsionType);
  const nationality = useFormField(formData.nationality || "");
  const address = useFormField(formData.address);
  const gender = useFormField(formData.gender);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

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
            label="Apellido Paterno"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.lastNameP}
            errorMessage={fieldErrors.lastNameP}
          />
        </Col>
        <Col md={4}>
          <NameInput
            {...lastNameM}
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
            label="Dirección"
            hasSubmitted={hasSubmitted}
            isInvalid={!!fieldErrors.address}
            errorMessage={fieldErrors.address}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} className="d-grid">
          <SubmitButton isSubmitting={isSubmitting} text="Guardar Cambios" />
        </Col>
      </Row>
    </Form>
  );
}
