import Products from "../model/product.model.js";

const getAllProducts = async () => {
  const product = await Products.find();
  return product;
};

const getProductById = (id) => {
  const currentProduct = Products.filter(
    (Product) => Product.id === Number(id)
  );
  if (currentProduct.length) {
    return currentProduct;
  } else {
    return "No existe el producto";
  }
};

const createProduct = async (body) => {
  const { id, name, price, stock } = body;

  if (!id || !name || !price || !stock) {
    return "Faltan datos";
  } else {
    const createdProduct = await Products.create({ id, name, price, stock });
    return createdProduct;
  }
};

const updateProduct = (body) => {
  const { id, name, price, stock } = body;

  if (!id || !name || !price || !stock) {
    return "Faltan datos";
  } else {
    const ProductIndex = Products.findIndex(
      (Product) => Product.id === Number(id)
    );
    Products.splice(ProductIndex, 1, { id: Number(id), name, price, stock });
    return { id, name, price, stock };
  }
};

const deleteProduct = (id) => {
  s;
  const ProductIndex = Products.findIndex(
    (Product) => Product.id === Number(id)
  );
  const deletedProduct = Products.splice(ProductIndex, 1);
  return deletedProduct;
};

export default {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
