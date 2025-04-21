import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Color, Border, FontSize } from "../../GlobalStyles";

const DimensionInputContainer = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dimension in FTs (L*W*H)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Length"
          keyboardType="numeric"
          value={values.length}
          onChangeText={handleChange("length")}
          onBlur={handleBlur("length")}
        />
        <Text style={styles.separator}>*</Text>
        <TextInput
          style={styles.input}
          placeholder="Width"
          keyboardType="numeric"
          value={values.width}
          onChangeText={handleChange("width")}
          onBlur={handleBlur("width")}
        />
        <Text style={styles.separator}>*</Text>
        <TextInput
          style={styles.input}
          placeholder="Height"
          keyboardType="numeric"
          value={values.height}
          onChangeText={handleChange("height")}
          onBlur={handleBlur("height")}
        />
      </View>
      {touched.length && errors.length && (
        <Text style={styles.error}>{errors.length}</Text>
      )}
      {touched.width && errors.width && (
        <Text style={styles.error}>{errors.width}</Text>
      )}
      {touched.height && errors.height && (
        <Text style={styles.error}>{errors.height}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderRadius: Border.br_8xs,
    padding: 10,
    width: "100%",
    marginBottom: 10,
  },
  label: {
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    height: 40,
    marginRight: 5,
  },
  separator: {
    color: Color.colorBlack,
    paddingHorizontal: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default DimensionInputContainer;
