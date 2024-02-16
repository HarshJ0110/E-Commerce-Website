"use client";
// import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// import { toast } from "react-hot-toast";

export default function CreateProduct() {
    // const router = useRouter();
    const [product, setProduct] = React.useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    })
    const [loading, setLoading] = React.useState(false);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const onCreate = async () => {
        try {
            setLoading(true);
            console.log(product)
            const response = await axios.post("/api/products/createProduct", product);
            console.log(response);
            console.log("Product Created Successfully", response.data);
        } catch (error) {
            console.log("Product Created failed", error.message);
            // toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen" >
            <div className="border-2 border-black rounded-lg p-8" >
                <h1 className="py-4 text-[2vw]">{loading ? "Processing" : "Create Product"}</h1>

                <form>
                    <label htmlFor="username">Product name</label><br />
                    <input
                        className="p-2 mt-2 md:w-[50vw] lg:w-[25vw] border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="productName"
                        type="text"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        placeholder="Product name"
                    /><br />
                    <label htmlFor="description">Description</label><br />
                    <input
                        className="p-2 w-[25vw] mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="description"
                        type="text"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        placeholder="Description"
                    /><br />
                    <label htmlFor="price">Price</label><br />
                    <input
                        className="p-2 w-[25vw] mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="mobileNo"
                        type="Number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        placeholder="Price"
                    /><br />
                    <label htmlFor="category">Category</label><br />
                    <select onChange={(e) => setProduct({...product,category:e.target.value})}>
                        <option value="">Choose Category</option>
                        {categories.map((cate) => (
                            <option key={cate} value={cate}>
                                {cate}
                            </option>
                        ))}
                    </select><br />
                    <label htmlFor="stock">Stock</label><br />
                    <input
                        className="p-2 w-[25vw] mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="stock"
                        type="Number"
                        value={product.stock}
                        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                        placeholder="Stock"
                    /><br />
                    <button
                        onClick={onCreate} type="button"
                        className="p-2 w-[25vw] bg-amber-400 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Create</button>
                </form>
            </div>
        </div>
    )

}