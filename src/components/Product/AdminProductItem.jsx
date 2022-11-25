import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";

import usePutProduct from "../../hooks/mutation/product/usePutProduct";
import useDeleteProduct from "../../hooks/mutation/product/useDeleteProduct";

const AdminProductItem = ({
  image,
  title,
  price,
  description,
  affiliateUrl,
  productId,
}) => {
  const priceFormatter = new Intl.NumberFormat(navigator.language);
  const [isEdit, setIsEdit] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const offEditHandler = () => setIsEdit(false);
  const { mutate: putMutate } = usePutProduct(offEditHandler);
  const { mutate: deleteMutate } = useDeleteProduct();

  return (
    <Card
      sx={{
        minWidth: "230px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea onClick={() => window.open(affiliateUrl, "_blank")}>
        <CardMedia
          sx={{ objectFit: "contain", padding: "1px", minWidth: "260px" }}
          component="img"
          height="200"
          image={image}
          alt="상품사진"
        />
      </CardActionArea>
      <CardContent sx={{ height: "100%", paddingBottom: "0px" }}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
        <Typography
          sx={{
            textAlign: "end",
            margin: "10px 0px",
            color: "#000000CC",
            fontWeight: 600,
          }}
          variant="subtitle2"
        >
          {priceFormatter.format(price)}원
        </Typography>
        {isEdit ? (
          <TextField
            label="설명"
            fullWidth
            onChange={(e) => setEditDescription(e.target.value)}
            value={editDescription}
          />
        ) : (
          <Typography variant="body2">{description}</Typography>
        )}
      </CardContent>
      <CardActions sx={{ padding: "16px", justifyContent: "end" }}>
        {isEdit ? (
          <>
            <Button
              sx={{ minWidth: "50px" }}
              size="small"
              color="error"
              variant="outlined"
              onClick={offEditHandler}
            >
              취소
            </Button>
            <Button
              onClick={() =>
                putMutate({ id: productId, description: editDescription })
              }
              sx={{ minWidth: "50px" }}
              size="small"
              variant="outlined"
            >
              완료
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => deleteMutate(productId)}
              sx={{ minWidth: "50px" }}
              size="small"
              color="error"
              variant="outlined"
            >
              삭제
            </Button>
            <Button
              onClick={() => {
                setEditDescription(description);
                setIsEdit(true);
              }}
              sx={{ minWidth: "50px" }}
              size="small"
              variant="outlined"
            >
              수정
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default AdminProductItem;
