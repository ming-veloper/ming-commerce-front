export type Product = {
  productId: string
  productName: string
  price: number
  thumbnailImageUrl: string
  category: {
    productCategoryId: string
    categoryName: ProductCategory
  }
}

export enum ProductCategory {
  DAIRY_EGGS = 'DAIRY_EGGS',
}
