import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategoryInProducts, getProducts } from "../../../api/product";

const useGetProducts = (sort = "latest", categoryId = null) => {
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
        if (!lastPage.data.pagination.is_last_page)
          return lastPage.data.pagination.next_page;
        return false;
      },
    }
  );
};

export default useGetProducts;
