import React from 'react';
import { Field } from 'formik';

const FieldFileInput = ({classes, ...rest}) => {
  const { 
    fileUploadContainer, labelClass, fileNameClass, fileInput,
  } = classes;

  return (
    <Field name={rest.name}>
      {({
        field,
        form,
        meta
      }) => {
        const handleChange = (event) => {
          const file = event.currentTarget.files[0];
          form.setFieldValue(rest.name, file)
        };

        const getFileName = () => {
          if (form.values[rest.name]) {
            return form.values[rest.name].name;
          }
          return '';
        };

        return (
          <div className={fileUploadContainer}>
            <label htmlFor="fileInput" className={labelClass}>
              Choose file
            </label>
            <span id="fileNameContainer" className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              id = "fileInput"
              name = {rest.name}
              type = "file"
              className= {fileInput}
              onChange={handleChange}
              onBlur={field.onBlur}
            />
            {meta.touched && meta.error && (
              <div className={classes.warning}>{meta.error}</div>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
