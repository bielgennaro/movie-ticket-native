import React, { useEffect, useState } from "react";
import { TextInput, Text, StyleSheet } from "react-native";

export const Fields = ({ values }) => {
  const [fields, setFields] = useState(values);
  const [error, setError] = useState({});

  const handleFieldChange = (fieldName, fieldProps, text) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: { ...prevFields[fieldName], value: text },
    }));
    validateField(fieldName, fieldProps, text);
  };

  const validateField = (fieldName, fieldProps, fieldValue) => {
    let newError = { ...error };

    if (fieldProps.email) {
      const eRegex = /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/;
      newError[fieldName] = eRegex.test(fieldValue) ? "" : "E-mail inválido";
    }

    if (fieldProps.maxLength && fieldValue.length > fieldProps.maxLength) {
      newError[fieldName] = `Máximo de ${fieldProps.maxLength} caracteres`;
    }

    if (fieldProps.minLength && fieldValue.length > fieldProps.minLength) {
      newError[fieldName] = `Mínimo de ${fieldProps.minLength} caracteres`;
    }

    if (fieldProps.required && fieldValue === "") {
      newError[fieldName] = "Campo obrigatório";
    }

    setError(newError);
  };

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
              secureTextEntry={fieldProps.password}
            />
            <Text style={{ color: "red" }} key={`error[${fieldName}]`}>
              {fieldError}
            </Text>
          </React.Fragment>
        );
      })}
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
