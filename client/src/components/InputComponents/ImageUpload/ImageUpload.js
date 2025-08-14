import React from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

const ImageUpload = (props) => {
  const [field, , helpers] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;

  const [preview, setPreview] = React.useState('');

  React.useEffect(() => {
    if (field.value) {
      if (typeof field.value === 'string') {
        setPreview(field.value);
      } else if (field.value instanceof File) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(field.value);
      }
    } else {
      setPreview('');
    }
  }, [field.value]);

  const onChange = (e) => {
    const file = e.target.files[0];
    const imageType = /image.*/;

    if (!file || !file.type.match(imageType)) {
      e.target.value = '';
      helpers.setValue(null);
      setPreview('');
      return;
    }

    helpers.setValue(file);
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          id="fileInput"
          name={field.name}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Choose file</label>
      </div>
      <img
        id="imagePreview"
        className={classNames({ [imgStyle]: !!preview })}
        alt="preview"
        src={preview}
      />
    </div>
  );
};


export default ImageUpload;
