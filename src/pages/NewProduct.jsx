import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

import { getCoupangItem } from "../api/admin";
import usePostProduct from "../hooks/mutation/product/usePostProduct";
import useGetCategories from "../hooks/query/category/useGetCategories";

const NewProduct = () => {
  const navigate = useNavigate();
  const { mutate: productMutate } = usePostProduct(navigate);
  const { data } = useGetCategories();
  const [coupangItem, setCoupangItem] = useState({});
  const isEmpty = Object.keys(coupangItem).length === 0;

  const { handleSubmit, control, reset } = useForm({ mode: "onChange" });

  const submitHandler = async ({ url, description, categoryId }) => {
    if (url.length > 0) {
      try {
        const { data } = await getCoupangItem(encodeURIComponent(url));
        setCoupangItem(data);
        reset((values) => ({ ...values, url: "" }));
      } catch (err) {
        reset((values) => ({ ...values, url: "" }));
        toast.error("제품 조회에 실패했습니다.");
      }
      return;
    }

    productMutate({ ...coupangItem, category_id: categoryId, description });
  };

  return (
    data && (
      <Container onSubmit={handleSubmit(submitHandler)}>
        {isEmpty ? (
          <>
            <Title>쿠팡 제품조회</Title>
            <Controller
              name="url"
              control={control}
              defaultValue=""
              rules={{
                required: "url을 입력해주세요.",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  sx={{ width: "300px" }}
                  label="Coupang URL"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ fontWeight: "bold" }}
            >
              조회
            </Button>
          </>
        ) : (
          <>
            <Title>제품등록</Title>
            <ImageListItem>
              <img
                style={{
                  objectFit: "cover",
                  width: "350px",
                  height: "200px",
                  marginBottom: "10px",
                }}
                src={coupangItem.image_url}
                alt="itemImage"
              />
              <ImageListItemBar
                sx={{ width: "350px" }}
                title={coupangItem.name}
                subtitle={`${Number(coupangItem.price).toLocaleString(
                  "ko-KR"
                )}원`}
                position="below"
              />
            </ImageListItem>
            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              rules={{
                required: "카테고리를 선택해주세요.",
              }}
              render={({ field, fieldState: { error } }) => (
                <FormControl sx={{ width: "350px" }}>
                  <InputLabel error={!!error}>카테고리</InputLabel>
                  <Select error={!!error} {...field} label="카테고리">
                    {data?.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={!!error}>
                    {error ? error.message : null}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: "제품에 대해 적어주세요.",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  multiline
                  rows={4}
                  sx={{ width: "350px" }}
                  label="설명"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ fontWeight: "bold", width: "100px" }}
            >
              등록
            </Button>
          </>
        )}
      </Container>
    )
  );
};

const Container = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  minHeight: "100vh",

  ".MuiImageListItemBar-title": {
    whiteSpace: "pre-wrap",
    fontWeight: "bold",
    marginBottom: "16px",
  },

  ".MuiImageListItemBar-subtitle": {
    textAlign: "end",
    fontSize: "14px",
    fontWeight: 600,
  },
}));

const Title = styled("h1")(() => ({
  fontSize: "24px",
  fontWeight: "bold",
}));

export default NewProduct;
