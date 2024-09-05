import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextEditor } from "../../TextEditor";
import ImageDropzone from "../../DragDropImage";
import axiosInstance from "@/hook/axios";

const AddCategory = ({
  editCategoryData,
  setIsOpenCategoryPart,
  getCategories,
  setIntialValues,
  initialValues,
}) => {
  const validationSchema = Yup.object({
    photo: Yup.mixed().required("Photo is required"),
    name: Yup.string().required("Category Name is required"),
    description: Yup.string().required("Category Description is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editCategoryData?._id) {
        await axiosInstance(
          `categories/${editCategoryData._id}`,
          "PUT",
          values
        );
      } else {
        await axiosInstance("categories", "POST", values);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    setIsOpenCategoryPart(false);
    setSubmitting(false);
    getCategories();
    setIntialValues(initialValues);
  };

  return (
    <Formik
      initialValues={editCategoryData?._id ? editCategoryData : initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values, errors }) => (
        <Form className="py-6 space-y-4">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:p-6 lg:col-span-4">
              <div className="p-6 bg-white rounded-md shadow-lg">
                <div className="text-xl semi-bold text-black-500">
                  Thumbnail
                </div>
                <div className="grid h-56 grid-cols-1 gap-4">
                  <label htmlFor="photo" className="block text-black-300">
                    Photo
                  </label>
                  <Field name="photo" component={ImageDropzone} />
                  <ErrorMessage
                    name="photo"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-12 md:p-6 lg:col-span-8">
              <div className="p-6 bg-white rounded-md shadow-lg">
                <div className="text-xl semi-bold text-black-500">Category</div>

                <div className="grid grid-cols-1 gap-4">
                  <label htmlFor="name" className="block text-black-300">
                    Category Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Type category name here..."
                    className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4">
                  <label
                    htmlFor="categoryDescription"
                    className="block text-black-300"
                  >
                    Category Description
                  </label>
                  <Field
                    name="description"
                    as="textarea"
                    placeholder="Type category description here..."
                    className="w-full h-24 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pr-6 mt-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCategory;
