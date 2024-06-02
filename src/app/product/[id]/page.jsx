"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function ProductDetailPage({params}) {
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
     try{
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();

      if (!data.id) {
        router.push('/404');
        return;
      }
      setProduct(data);
     }catch(er){console.log("er",er)}
    };

    fetchData();

    return () => setProduct(null);
  }, [id]);

  if (!id || !product) {
    return  <div className="flex items-center justify-center h-screen">
    <h1 className="text-4xl font-bold">Loading...</h1>
  </div>;
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex justify-between items-center mb-4 ">
        <Link href="/"className="text-blue-500 hover:underline">Back
        </Link>
        <h1 className="text-2xl font-bold">Product Details</h1>
        <div></div>
      </div>
      <div className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="object-fill rounded h-[500px]"
          />
        </div>
        <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-900 font-semibold mb-4">${product.price}</p>
          <div className="text-sm text-gray-600 mb-4">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
