"use client";
import React, { useEffect, useMemo, useState } from "react";
import CommonBreadcrum from "../../components/Product/CommonBreadcrum";
import CommonTable from "../../components/Table";
import ProductFields from "../../components/Product/AddProduct";
import axiosInstance from "@/hook/axios";
import AddCategory from "@/components/Category/AddCategory";

const Categories = () => {
  const [isExport, setIsExport] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isOpenCategoryPart, setIsOpenCategoryPart] = useState(false);
  const [products, setProducts] = useState([]);
  const [editCategoryData, setEditCategoryData] = useState();
  const [initialValues, setIntialValues] = useState({
    photo: [],
    name: "",
    description: ""
  });

  const breadcrumb = [
    { label: "Dashboard", href: "#" },
    { label: "Categories", href: "#" },
  ];

  const addCategories = [...breadcrumb, { label: "Add Category", href: "" }];

  const columns1 = useMemo(
    () => [
      {
        header: "Category Name",
        accessorKey: "name",
      },
      {
        header: "Category Description",
        accessorKey: "description",
      },
      {
        
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleEditProduct(row.original)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeleteProduct(row.original)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const getCategories = async () => {
    try {
      const response = await axiosInstance("categories", "GET");
      setProducts(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditCategoryData(product);
    setIsOpenCategoryPart(true);
  };

  const handleDeleteProduct = async (product) => {
    try {
      if (product?._id) {
        const response = await axiosInstance(
          `products/${product._id}`,
          "DELETE"
        );
      } else {
        const response = await axiosInstance("products", "POST", values);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      getCategories();
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const memoizedProductData = useMemo(() => products, [products]);

  const handleExportData = () => {
    setIsExport(true);
    setTimeout(() => {
      setIsExport(false);
    }, 3000);
  };

  const productData = [
    { id: 1, label: "All Product" },
    { id: 2, label: "Published" },
    { id: 3, label: "Low Stock" },
    { id: 4, label: "Draft" },
  ];

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const handleSecondButton = () => {
    setIntialValues(initialValues);
    setEditCategoryData(null);
    setIsOpenCategoryPart(true);
  };


  const handleCancel = () => {
    setIsOpenCategoryPart(false);
  };

  return (
    <div>
      {!isOpenCategoryPart ? (
        <>
          <CommonBreadcrum
            title="Category"
            breadcrumb={breadcrumb}
            iconBreadCrum={"/svg/breadcrum-arrow.svg"}
            firstButtonText="Export"
            firstButtonIcon={"/svg/download-icon.svg"}
            secondButtonText="Add Category"
            secondButtonIcon={"/svg/plus.svg"}
            handleExportData={handleExportData}
            handleSecondButton={handleSecondButton}
          />
          <CommonTable
            data={memoizedProductData}
            columns={columns1}
            isExportData={isExport}
            productData={productData}
            handleTabChange={handleTabChange}
          />
        </>
      ) : (
        <>
          <CommonBreadcrum
            title="Add Categories"
            breadcrumb={addCategories}
            iconBreadCrum={"/svg/breadcrum-arrow.svg"}
            firstButtonText="Cancel"
            firstButtonIcon={"/svg/cancel-icon.svg"}
            secondButtonText="Add Category"
            secondButtonIcon={"/svg/plus.svg"}
            handleExportData={handleCancel}
            handleSecondButton={handleSecondButton}
          />

          <AddCategory
            editCategoryData={editCategoryData}
            setIsOpenCategoryPart={setIsOpenCategoryPart}
            getCategories={getCategories}
            setIntialValues={setIntialValues}
            initialValues={initialValues}
          />
        </>
      )}
    </div>
  );
};

export default Categories;
