"use client";
import React, { useEffect, useMemo, useState } from "react";
import CommonBreadcrum from "../../components/Product/CommonBreadcrum";
import CommonTable from "../../components/Table";
import ProductFields from "../../components/Product/AddProduct";
import axiosInstance from "@/hook/axios";

const Product = () => {
  const [isExport, setIsExport] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProductData, setEditProductData] = useState();
  const [initialValues,setIntialValues]=useState({
    productName: "",
    productDescription: "",
    photo: [],
    basePrice: "",
    discountPrecentage: "",
    taxClass: "",
    discountType: "",
    vatAmount: 0,
    sku: "",
    barcode: "",
    quantity: "",
    variations: [{ variationType: "", variation: "" }],
    height: "",
    weight: "",
    lenght: "",
    width: "",
    product_tags: "",
    category: "",
    status: "",
  });

  const breadcrumb = [
    { label: "Dashboard", href: "#" },
    { label: "Product List", href: "#" },
  ];

  const columns1 = useMemo(
    () => [
      {
        header: "Product Name",
        accessorKey: "productName",
      },
      {
        header: "Base Price",
        accessorKey: "basePrice",
      },
      {
        header: "SKU",
        accessorKey: "sku",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Barcode",
        accessorKey: "barcode",
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

  const getProducts = async () => {
    try {
      const response = await axiosInstance("products", "GET");
      setProducts(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleEditProduct = (product) => {
    setEditProductData(product);
    setIsOpenAddProduct(true);
  };

  const handleDeleteProduct = async(product) => {
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
    }
    finally{
      getProducts()
    }
  };
  

  useEffect(() => {
    getProducts();
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
    setIntialValues(initialValues)
    setEditProductData(null)
    setIsOpenAddProduct(true);
  };

  const handleSaveProduct = () => {};

  const handleCancel = () => {
    setIsOpenAddProduct(false);
  };

  return (
    <div>
      {!isOpenAddProduct ? (
        <>
          <CommonBreadcrum
            title="Product"
            breadcrumb={breadcrumb}
            iconBreadCrum={"/svg/breadcrum-arrow.svg"}
            firstButtonText="Export"
            firstButtonIcon={"/svg/download-icon.svg"}
            secondButtonText="Add Product"
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
            title="Add Product"
            breadcrumb={breadcrumb}
            iconBreadCrum={"/svg/breadcrum-arrow.svg"}
            firstButtonText="Cancel"
            firstButtonIcon={"/svg/cancel-icon.svg"}
            secondButtonText="Add Product"
            secondButtonIcon={"/svg/plus.svg"}
            handleExportData={handleCancel}
            handleSecondButton={handleSecondButton}
          />

          <ProductFields
            editProductData={editProductData}
            setIsOpenAddProduct={setIsOpenAddProduct}
            getProducts={getProducts}
            initialValues={initialValues}
            setIntialValues={setIntialValues}
          />
        </>
      )}
    </div>
  );
};

export default Product;
