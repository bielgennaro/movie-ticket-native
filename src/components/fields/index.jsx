import React, { useEffect, useState } from "react";
import { TextInput, Text, StyleSheet } from "react-native";
import { Button } from "../../components/button";

export const Fields = ({
  values,
  onChangeFields,
  hasButton = true,
  typeButton = "primary",
  textButton = "Salvar",
}) => {
  const [fields, setFields] = useState(values);
  const [error, setError] = useState({});
  const hasFieldErrors = !!Object.values(error).length;

  const handleFieldChange = (fieldName, fieldProps, text) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: { ...prevFields[fieldName], value: text },
    }));
    validateField(fieldName, fieldProps, text);
    onChangeFields(fieldName, text);
  };

  const validateField = (fieldName, fieldProps, fieldValue) => {
    setError((prevError) => {
      const newError = { ...prevError };

      if (fieldProps.required && (fieldValue === "" || !fieldValue)) {
        newError[fieldName] = "Campo obrigatório";
      } else if (fieldProps.isEmail) {
        const eRegex = /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/;
        const isValidEmail = eRegex.test(fieldValue);

        if (!isValidEmail) {
          newError[fieldName] = "E-mail inválido";
        } else {
          delete newError[fieldName];
        }
      } else if (
        fieldProps.maxLength &&
        fieldValue.length > fieldProps.maxLength
      ) {
        newError[fieldName] = `Máximo de ${fieldProps.maxLength} caracteres`;
      } else if (
        fieldProps.minLength &&
        fieldValue.length < fieldProps.minLength
      ) {
        newError[fieldName] = `Mínimo de ${fieldProps.minLength} caracteres`;
      } else {
        delete newError[fieldName];
      }

      return newError;
    });
  };

  const validateInitialFields = () => {
    Object.keys(fields).forEach((fieldName) => {
      const fieldProps = fields[fieldName];

      validateField(fieldName, fieldProps, fieldProps.initialValue || null);
    });
  };

  useEffect(() => {
    validateInitialFields();
  }, []);

  return (
    <>
      {Object.keys(fields).map((fieldName) => {
        const fieldProps = fields[fieldName];
        const fieldError = error[fieldName];

        return (
          <React.Fragment key={fieldName}>
            <TextInput
              placeholder={fieldProps?.placeholder}
              style={styles.textInput}
              placeholderTextColor="#fff"
              onChangeText={(text) =>
                handleFieldChange(fieldName, fieldProps, text)
              }
              value={fieldProps.initialValue || fieldProps.value}
              secureTextEntry={fieldProps.isPassword}
            />
            <Text style={{ color: "red" }} key={`error[${fieldName}]`}>
              {fieldError}
            </Text>
          </React.Fragment>
        );
      })}
      {hasButton && (
        <Button text={textButton} type={typeButton} disabled={hasFieldErrors} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "transparent",
    color: "#fff",
    textAlign: "center",
    borderBottomColor: "#d9232a",
    borderBottomWidth: 1,
    width: "80%",
    height: 40,
  },
});
