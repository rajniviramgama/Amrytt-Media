import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { TextEditor } from "../../TextEditor";
import ImageDropzone from "../../DragDropImage";
import Image from "next/image";
import axiosInstance from "@/hook/axios";

const ProductFields = ({
  editProductData,
  setIsOpenAddProduct,
  getProducts,
  setIntialValues,
  initialValues
}) => {
 

  const validationSchema = Yup.object({
    productName: Yup.string().required("Product Name is required"),
    productDescription: Yup.string().required("Description is required"),
    photo: Yup.mixed().required("Photo is required"),
    basePrice: Yup.number().required("Base Price is required"),
    discountPrecentage: Yup.number().required(
      "Discount Precentage is required"
    ),
    taxClass: Yup.string().required("Tax Class is required"),
    discountType: Yup.string().required("Discount Type is required"),
    vatAmount: Yup.number().required("VAT Amount is required"),
    sku: Yup.number().required("SKU is required"),
    barcode: Yup.number().required("Barcode is required"),
    quantity: Yup.number().required("Quantity is required"),
    height: Yup.number().required("Height is required"),
    weight: Yup.number().required("Weight is required"),
    lenght: Yup.number().required("Length is required"),
    width: Yup.number().required("Width is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editProductData?._id) {
        const response = await axiosInstance(
          `products/${editProductData._id}`,
          "PUT",
          values
        );
      } else {
        const response = await axiosInstance("products", "POST", values);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    setIsOpenAddProduct(false);
    setSubmitting(false);
    getProducts(  );
    setIntialValues(initialValues)
  };

  return (
    <Formik
      initialValues={editProductData?._id ? editProductData : initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values, errors }) => {
        return (
          <Form className="py-6 space-y-4">
            <div className="grid grid-cols-12 ">
              <div className="col-span-12 md:p-6 lg:col-span-8 ">
                <div className="p-6 bg-white rounded-md shadow-lg">
                  <div className="text-xl semi-bold text-black-500">
                    General Information
                  </div>
                  <div className="grid grid-cols-1 gap-4 pt-[14px]">
                    <div>
                      <label
                        htmlFor="productName"
                        className="block text-black-300 medium text-m"
                      >
                        Product Name
                      </label>
                      <Field
                        name="productName"
                        type="text"
                        placeholder="Type product name here. . ."
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      />
                      <ErrorMessage
                        name="productName"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div className="h-60">
                      <label
                        htmlFor="productDescription"
                        className="block text-m medium text-black-300"
                      >
                        Description
                      </label>
                      <Field
                        name="productDescription"
                        render={({ field, form }) => (
                          <TextEditor
                            name={field.name}
                            value={field.value}
                            onChange={setFieldValue}
                          />
                        )}
                      />
                      <ErrorMessage
                        name="productDescription"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-md shadow-lg mt-44 md:mt-6">
                  <div className="text-xl semi-bold text-black-500">Media</div>
                  <div className="grid grid-cols-1 gap-4 pt-[14px]">
                    <label
                      htmlFor="photo"
                      className="block text-black-300 medium text-m"
                    >
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

                <div className="p-6 mt-6 bg-white rounded-md shadow-lg">
                  <div className="text-xl semi-bold text-black-500">
                    Pricing
                  </div>
                  <div className="grid grid-cols-1 gap-4 pt-[14px]">
                    <div>
                      <label
                        htmlFor="basePrice"
                        className="block text-black-300 medium text-m"
                      >
                        Base Price
                      </label>
                      <Field
                        name="basePrice"
                        type="text"
                        placeholder="$ Type base price here. . ."
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      />
                      <ErrorMessage
                        name="basePrice"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-[14px]">
                      <div>
                        <label
                          htmlFor="discountPrecentage"
                          className="block text-black-300 medium text-m"
                        >
                          Discount Precentage (%)
                        </label>
                        <Field
                          name="discountPrecentage"
                          type="text"
                          placeholder="Type discount precentage. . ."
                          className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                        />
                        <ErrorMessage
                          name="discountPrecentage"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="taxClass"
                          className="block text-black-300 medium text-m"
                        >
                          Tax Class
                        </label>
                        <Field
                          as="select"
                          name="taxClass"
                          className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                        >
                          <option value="" disabled>
                            Select a tax class...
                          </option>{" "}
                          <option value="standard">Standard</option>
                          <option value="reduced">Reduced Rate</option>
                          <option value="zero">Zero Rate</option>
                          <option value="freeTax">Free Tax</option>
                          <option value="exempt">Exempt</option>
                        </Field>
                        <ErrorMessage
                          name="taxClass"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="discountType"
                          className="block text-black-300 medium text-m"
                        >
                          Discount Type
                        </label>
                        <Field
                          as="select"
                          name="discountType"
                          className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                        >
                          <option value="" disabled>
                            Select Discount Type
                          </option>{" "}
                          <option value="noDiscount">No Discount</option>
                          <option value="percentage">Percentage</option>
                          <option value="fixed">Fixed Amount</option>
                          <option value="buyOneGetOne">Buy One Get One</option>
                        </Field>
                        <ErrorMessage
                          name="discountType"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="vatAmount"
                          className="block text-black-300 medium text-m"
                        >
                          VAT Amount (%)
                        </label>
                        <Field
                          name="vatAmount"
                          type="number"
                          className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                        />
                        <ErrorMessage
                          name="discountType"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 mt-6 bg-white rounded-md shadow-lg">
                  <div className="text-xl semi-bold text-black-500">
                    Inventory
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-[14px]">
                    <div>
                      <label
                        htmlFor="sku"
                        className="block text-black-300 medium text-m"
                      >
                        SKU
                      </label>
                      <Field
                        name="sku"
                        type="text"
                        placeholder="Type product SKU here. . ."
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      />
                      <ErrorMessage
                        name="sku"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="barcode"
                        className="block text-black-300 medium text-m"
                      >
                        Barcode
                      </label>
                      <Field
                        name="barcode"
                        type="text"
                        placeholder="Product barcode. . ."
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      />
                      <ErrorMessage
                        name="barcode"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-black-300 medium text-m"
                      >
                        Quantity
                      </label>
                      <Field
                        name="quantity"
                        type="number"
                        placeholder="Type product quantity here. . ."
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 mt-6 bg-white rounded-md shadow-lg">
                  <div className="text-xl semi-bold text-black-500">
                    Variation
                  </div>
                  <FieldArray name="variations">
                    {({ insert, remove, push }) => (
                      <div>
                        {values?.variations?.length > 0 &&
                          values.variations.map((variation, index) => (
                            <div
                              className="grid grid-col-1 md:grid-cols-2 gap-4 pt-[14px] items-center"
                              key={index}
                            >
                              <div>
                                <label
                                  htmlFor={`variations.${index}.variationType`}
                                  className="block text-black-300 medium text-m"
                                >
                                  Variation Type
                                </label>
                                <Field
                                  as="select"
                                  name={`variations.${index}.variationType`}
                                  className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                                >
                                  <option value="" disabled>
                                    Select a variation type...
                                  </option>
                                  <option value="color">Color</option>
                                  <option value="size">Size</option>
                                  <option value="material">Material</option>
                                  <option value="style">Style</option>
                                </Field>
                                <ErrorMessage
                                  name={`variations.${index}.variationType`}
                                  component="div"
                                  className="text-sm text-red-500"
                                />
                              </div>

                              <div className="flex items-center w-full gap-2">
                                <div>
                                  <label
                                    htmlFor={`variations.${index}.variation`}
                                    className="block text-black-300 medium text-m"
                                  >
                                    Variation
                                  </label>
                                  <Field
                                    name={`variations.${index}.variation`}
                                    type="text"
                                    placeholder="Variation. . ."
                                    className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                                  />
                                  <ErrorMessage
                                    name={`variations.${index}.variation`}
                                    component="div"
                                    className="text-sm text-red-500"
                                  />
                                </div>
                                <div className="pt-5">
                                  <Image
                                    src="/svg/red-plus.svg"
                                    alt="plus icon"
                                    width={40}
                                    height={40}
                                    className="cursor-pointer"
                                    onClick={() =>
                                      push({ variationType: "", variation: "" })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                        <div className="pt-4">
                          <button
                            type="button"
                            className="px-4 py-2 rounded text-cyan-600 bg-cyan-50"
                            onClick={() =>
                              push({ variationType: "", variation: "" })
                            }
                          >
                            + Add Variation
                          </button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="p-6 mt-6 bg-white rounded-md shadow-lg">
                  <div className="text-xl semi-bold text-black-500">
                    Shipping
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-[14px]">
                    <div>
                      <label
                        htmlFor="height"
                        className="block text-black-300 medium text-m"
                      >
                        Height
                      </label>
                      <Field
                        name="height"
                        type="text"
                        placeholder="Type product height here. . ."
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      />
                      <ErrorMessage
                        name="height"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="weight"
                        className="block text-black-300 medium text-m"
                      >
                        Weight
                      </label>
                      <Field
                        name="weight"
                        type="text"
                        placeholder="Product weight. . ."
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      />
                      <ErrorMessage
                        name="weight"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lenght"
                        className="block text-black-300 medium text-m"
                      >
                        Length
                      </label>
                      <Field
                        name="lenght"
                        type="number"
                        placeholder="Type product lenght here. . ."
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      />
                      <ErrorMessage
                        name="lenght"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="width"
                        className="block text-black-300 medium text-m"
                      >
                        Width
                      </label>
                      <Field
                        name="width"
                        type="number"
                        placeholder="Type product width here. . ."
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      />
                      <ErrorMessage
                        name="width"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div className="col-span-12 md:p-6 lg:col-span-4">
                <div className="grid grid-cols-1 shadow-lg gap-4 pt-[14px]">
                  <div className="p-6 bg-white ">
                    <div className="text-xl semi-bold text-black-500">
                      Category
                    </div>
                    <div>
                      <label
                        htmlFor={`category`}
                        className="block text-black-300 medium text-m"
                      >
                        Category
                      </label>
                      <Field
                        as="select"
                        name="category"
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        <option value="watch">Watch</option>
                        <option value="bag">Bag</option>
                      </Field>
                      <ErrorMessage
                        name={`category`}
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="pt-3">
                      <label
                        htmlFor={`product_tags`}
                        className="block text-black-300 medium text-m"
                      >
                        Product Tags
                      </label>
                      <Field
                        as="select"
                        name={`product_tags`}
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      >
                        <option value="" disabled>
                          Select tags
                        </option>
                        <option value="color">Color</option>
                        <option value="size">Size</option>
                        <option value="material">Material</option>
                        <option value="style">Style</option>
                      </Field>
                      <ErrorMessage
                        name={`product_tags`}
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-[14px]">
                  <div className="p-6 bg-white shadow-lg">
                    <div className="text-xl semi-bold text-black-500">
                      Status
                    </div>
                    <div>
                      <label
                        htmlFor={`status`}
                        className="block text-black-300 medium text-m"
                      >
                        Product Status
                      </label>
                      <Field
                        as="select"
                        name="status"
                        className="w-full h-10 px-2 py-1 border border-gray-100 rounded-md bg-gray-50"
                      >
                        <option value="" disabled>
                          Select status
                        </option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="outofstock">Out of Stock</option>
                        <option value="lowstock">Low Stock</option>
                      </Field>
                      <ErrorMessage
                        name={`category`}
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductFields;
