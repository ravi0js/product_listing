'use client';
import ProductCard from "@/components/productCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setloading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        let res = await fetch("https://fakestoreapi.com/products");
        if (res.status === 200) {
          let data = await res.json();
          setData(data);
          setFilteredData(data);
          setloading(false)
        } else {
          setData([]);
        }
      } catch (er) {
        console.log("er", er);
        setloading(false)
      }
    }
    getData();
  }, []);



  useEffect(() => {
    let filteredResults = data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedCategory) {
      filteredResults = filteredResults.filter(
        (product) => product.category === selectedCategory
      );
    }
    setFilteredData(filteredResults);
  }, [searchTerm, selectedCategory, data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Loading...</h1>
    </div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-6xl w-full font-mono text-sm">
        <div className="mb-8 border-b border-black">
          <p className="text-center text-2xl font-bold">All Product</p>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/3">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Filter by Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border border-gray-300 rounded px-3 py-1 w-full"
            >
              <option value="">All Categories</option>
              {Array.from(new Set(data.map((product) => product.category))).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        {filteredData.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {filteredData.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div> : <p className="text-center text-xl mt-10">No products found.</p>}
      </div>
    </main>
  );
}
