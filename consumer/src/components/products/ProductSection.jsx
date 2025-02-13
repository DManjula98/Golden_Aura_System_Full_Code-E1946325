import React from 'react'
import ShopProducts from "../products/ShopProducts";
import Products from "../products/Products";
import Pagination from "../Pagination";

const ProductSection = ({ products, styles, totalProduct, perPage, pageNumber, setPageNumber }) => {
  return (
  
      <div className="pb-8 ">
        <ShopProducts products={products} styles={styles} />
        <div className="mt-6">
          {totalProduct > perPage && (
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={totalProduct}
              perPage={perPage}
              showItem={Math.ceil(totalProduct / perPage)}
            />
          )}
        </div>
      </div>
 
  )
}

export default ProductSection