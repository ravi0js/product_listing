import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
    return (
        <div key={product.id} className="bg-white p-4 rounded shadow relative">
            <Image
                src={product.image}
                alt={product.title} className="w-full h-40 object-fill rounded mb-4 object-cover"
                width={180}
                height={40}
                priority
                objectFit="fill"
            />
            <div className="h-32">
                <h2 className="text-lg font-bold mb-2 leading-5">{product.title.slice(0, 40)}</h2>

                <div className="flex justify-between mb-8">
                    <p className="text-gray-900 font-semibold">${product.price}</p>
                    <p className="text-sm text-gray-600 "> Rating: {product.rating.rate} </p>
                </div>
            </div>
            <div className=" item-center">
                <Link href={`/product/${product.id}`} className="block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center">View Details
                </Link>
            </div>
        </div>
    )
}
export default ProductCard;