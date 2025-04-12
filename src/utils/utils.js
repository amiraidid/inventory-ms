export const handleFilterFunc = (options, products) => {
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < products.length-i-1; j++) {
      if (options === "low-to-high") {
        if (products[j].sellingPrice > products[j + 1].sellingPrice) {
          [[products[j].sellingPrice], [products[j + 1].sellingPrice]] = [
            [products[j + 1].sellingPrice],
            [products[j].sellingPrice],
          ];
        }
      } else if (options === 'high-to-low') {
        if (products[j].sellingPrice < products[j + 1].sellingPrice) {
            [[products[j].sellingPrice], [products[j + 1].sellingPrice]] = [
              [products[j + 1].sellingPrice],
              [products[j].sellingPrice],
            ];
          }
      }
    }
  }
  return products;
};


// fetch existing categories
export const fetchCategories = (products) => {
  let categories = []
  for (let i = 0; i < products.length; i++) {
    if (!categories.includes(products[i].category)) {
      categories.push(products[i].category)
    }
  }
  return categories
}

export const fetchSupplier = (products) => {
  let suppliers = []
  for (let i = 0; i < products.length; i++) {
    if (!suppliers.includes(products[i].supplier)) {
      suppliers.push(products[i].supplier)
    }
  }
  return suppliers
}

