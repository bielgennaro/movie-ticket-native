import React, { useEffect, useState } from "react";
import { TextInput, Text, StyleSheet, View } from "react-native";
import moment from "moment";
import { Button } from "../../components/button";
import DropDownPicker from "react-native-dropdown-picker";

export const Fields = ({
  values,
  onChangeFields,
  hasButton = true,
  typeButton = "primary",
  textButton = "Salvar",
  handleSubmit,
  fetchOptions,
}) => {
  const [fields, setFields] = useState(values);
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const hasFieldErrors = !!Object.values(error).length;

  DropDownPicker.setTheme("DARK");

  const convertToISO = (fieldName, fieldValue) => {
    const parsedTime = moment(fieldValue, "HH:mm");
    const isoFormat = parsedTime.toISOString();

    onChangeFields(fieldName, isoFormat);
  };

  const handleFieldChange = (fieldName, fieldProps, text) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: { ...prevFields[fieldName], value: text },
    }));
    validateField(fieldName, fieldProps, text);

    if (fieldProps.date) {
      convertToISO(fieldName, text);
    } else {
      onChangeFields(fieldName, text);
    }
  };

  const validateField = (fieldName, fieldProps, fieldValue) => {
    setError((prevError) => {
      const newError = { ...prevError };

      if (fieldProps.isDropdown && fieldProps.required) {
        if (!fieldValue) {
          newError[fieldName] = "Campo obrigatório";
        } else {
          delete newError[fieldName];
        }
      } else if (fieldProps.required && (fieldValue === "" || !fieldValue)) {
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
        fieldProps.confirmField &&
        fieldValue !== fields[fieldProps.confirmField]?.value
      ) {
        newError[fieldName] = "Confirmação inválida";
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

    if (fetchOptions) {
      fetchOptions()
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setOptions(data);
        })
        .catch((error) => {});
    }
  }, []);

  return (
    <>
      {Object.keys(fields).map((fieldName) => {
        const fieldProps = fields[fieldName];
        const fieldError = error[fieldName];

        if (fieldProps.isDropdown && fieldProps.condition) {
          return (
            <View style={{ zIndex: 1000, width: "80%" }} key={fieldName}>
              <DropDownPicker
                placeholder={fieldProps?.placeholder}
                placeholderStyle={{
                  textAlign: "center",
                }}
                showArrowIcon={false}
                schema={{
                  label: "title",
                  value: "id",
                }}
                autoScroll
                labelStyle={{ textAlign: "center" }}
                open={open}
                value={value}
                items={options}
                setOpen={setOpen}
                setValue={setValue}
                onChangeValue={(value) => {
                  validateField(fieldName, fieldProps, value);
                  onChangeFields(fieldName, value);
                }}
              />
              <Text
                style={{ color: "red", alignSelf: "center" }}
                key={`error[${fieldName}]`}
              >
                {fieldError}
              </Text>
            </View>
          );
        }

        return (
          <React.Fragment key={fieldName}>
            <TextInput
              placeholder={fieldProps?.placeholder}
              style={styles.textInput}
              placeholderTextColor="#fff"
              onChangeText={(text) =>
                handleFieldChange(fieldName, fieldProps, text)
              }
              value={
                !!fieldProps.value ? fieldProps.value : fieldProps.initialValue
              }
              secureTextEntry={fieldProps.isPassword}
            />
            <Text style={{ color: "red" }} key={`error[${fieldName}]`}>
              {fieldError}
            </Text>
          </React.Fragment>
        );
      })}
      {hasButton && (
        <Button
          text={textButton}
          type={typeButton}
          disabled={hasFieldErrors}
          onPress={handleSubmit}
        />
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
