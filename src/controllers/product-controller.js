import { ProductService } from '../services';
import { AppError, commonErrors } from '../middlewares';

const ITEMS_PER_PAGE = 9;

export const productController = {
  createProduct: async (req, res, next) => {
    const productInfo = { ...req.body };
    const newProduct = await ProductService.createProduct(productInfo);
    return res.status(201).json(newProduct);
  },

  setImageUrl: async (req, res, next) => {
    const imageUrl = req.file.path;
    return res.status(200).json(imageUrl);
  },

  getProducts: async (req, res, next) => {
    const page = Math.abs(+req.query.page) || 1;
    const categoryName = req.query.q;

    if (categoryName) {
      const { totalPage, productCount } =
        await ProductService.getTotalPageByCategory(
          categoryName,
          ITEMS_PER_PAGE,
        );
      if (page > totalPage) {
        throw new AppError('페이지 에러', 400, '올바른 페이지를 입력하세요.');
      }
      const products = await ProductService.getProductsByCategory(
        categoryName,
        page,
        ITEMS_PER_PAGE,
      );
      return res.status(200).json({
        products,
        totalPage,
        productCount,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < productCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
      });
    } else {
      const { totalPage, productCount } = await ProductService.getTotalPage(
        ITEMS_PER_PAGE,
      );
      if (page > totalPage) {
        throw new AppError('페이지 에러', 400, '올바른 페이지를 입력하세요.');
      }
      const products = await ProductService.getProducts(page, ITEMS_PER_PAGE);
      return res.status(200).json({
        products,
        totalPage,
        currentPage: page,
        productCount,
        hasNextPage: ITEMS_PER_PAGE * page < productCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
      });
    }
  },

  getProductsByAdmin: async (req, res, next) => {
    const categoryName = req.query.q;
    console.log(categoryName);
    const products = await ProductService.getProductsByAdmin(categoryName);
    return res.status(200).json({
      products,
    });
  },

  getProudctsByKeyword: async (req, res, next) => {
    const { keyword } = req.query;
    const products = await ProductService.getProudctsByKeyword(keyword);
    return res.status(200).json({ products, productsCount: products.length });
  },

  getProudct: async (req, res, next) => {
    const { productId } = req.params;
    const product = await ProductService.getProduct(productId);
    return res.status(200).json(product);
  },

  updateProduct: async (req, res, next) => {
    const { productId } = req.params;
    console.log(productId);
    const productInfo = { ...req.body, ...req.file };
    console.log(req.body);
    const updatedProduct = await ProductService.updateProduct(
      productId,
      productInfo,
    );
    return res.status(200).json(updatedProduct);
  },

  softDeleteProduct: async (req, res, next) => {
    const { productId } = req.params;
    await ProductService.softDeleteProduct(productId);
    return res.sendStatus(200);
  },

  deleteProduct: async (req, res, next) => {
    const { productId } = req.params;
    const result = await ProductService.deleteProduct(productId);
    return res
      .status(200)
      .json({ message: '상품이 정상적으로 삭제되었습니다 :)' });
  },
};
