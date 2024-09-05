import React from "react";
import { useDropzone } from "react-dropzone";
import "./style.css";
import Image from "next/image";

const ImageDropzone = ({ field, form }) => {
  const onDrop = (acceptedFiles) => {
    const updatedFiles = [...(field.value || []), ...acceptedFiles];
    form?.setFieldValue(field.name, updatedFiles);
  };

  const removeFile = (file, event) => {
    event.stopPropagation();
    const updatedFiles = field.value.filter((f) => f.name !== file.name);
    form?.setFieldValue(field.name, updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>Drag and drop image here, or click add image</p>
      <div className="bg-gray-100 image-preview-container">
        {field?.value && field.value.length > 0 && (
          <div className="image-previews">
            {field.value.map((file, index) => (
              <>
                <div key={index} className="file-preview">
                  <img
                    src={field.value ? file : URL.createObjectURL(file)}
                    alt={file.name}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                </div>
                <div className="flex gap-2 file-details">
                  <p>{file.name}</p>
                  <Image
                    alt="cancel image"
                    width={16}
                    height={16}
                    src={"/svg/cancel-icon.svg"}
                    onClick={(event) => removeFile(file, event)}
                  />
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDropzone;
