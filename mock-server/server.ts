interface IResponceData {
  errors: [];
  data: {
    categories: ICategory[];
    products: IProduct[];
  };
}

const mockData: IResponceData = {
  errors: [],
  data: {
    categories: [
      {
        id: 1,
        name: 'Светильники',
        children: [
          {
            id: 283,
            name: 'Люстры',
          },
          {
            id: 939,
            name: 'Дизайнерские светильники',
          },
          {
            id: 1347,
            name: 'Комнаты',
          },
        ],
      },
      {
        id: 2300,
        name: 'Подборки',
        children: [
          {
            id: 2303,
            name: 'Лофт стиль',
          },
        ],
      },
    ],
    products: [
      {
        id: 844028,
        image: 'url-картинки',
        name: 'Люстра Garda Decor Alpina BD-844928',
        brand: 'Garda Decor',
        vendor_sku: '1512-6P',
        url: '/img2.jpg/',
        price: 28300,
        categories: [283, 1],
      },
      {
        id: 444928,
        image: 'url-картинки',
        name: 'Люстра Garda Decor Alpina BD-844928',
        brand: 'Garda Decor',
        vendor_sku: '1512-6P',
        url: '/img1.jpeg/',
        price: 10200,
        categories: [939, 1],
      },
      {
        id: 847328,
        image: 'url-картинки',
        name: 'Люстра Garda Decor Alpina BD-844928',
        brand: 'Garda Decor',
        vendor_sku: '1512-6P',
        url: '/img2.jpg/',
        price: 3000,
        categories: [1347, 1],
      },
      {
        id: 122928,
        image: 'url-картинки',
        name: 'Люстра Garda Decor Alpina BD-844928',
        brand: 'Garda Decor',
        vendor_sku: '1512-6P',
        url: '/img1.jpeg/',
        price: 9100,
        categories: [2303, 2300],
      },
    ],
  },
};

export const getDataRequest = async (): Promise<IResponceData> => {
  return new Promise((res) => {
    setTimeout(() => res(mockData), 1000);
  });
};

export const removeProductRequest = async (productId: number) => {
  mockData.data.products = mockData.data.products.filter(product => product.id !== productId)
  
  return new Promise((res) => {
    setTimeout(() => res(''), 1000);
  });
};
