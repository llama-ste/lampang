import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategoryInProducts, getProducts } from "../../../api/product";

const useGetProducts = (sort = "idDesc", categoryId = null) => {
  return useInfiniteQuery(
    ["useGetProducts", sort, categoryId],
    ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        order: sort,
      };

      return categoryId
        ? getCategoryInProducts({ ...params, categoryId })
        : getProducts(params);
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.data.pagination.isLastPage)
          return lastPage.data.pagination.nextPage;
        return false;
      },
      cacheTime: 0,
    }
  );
};

export default useGetProducts;
