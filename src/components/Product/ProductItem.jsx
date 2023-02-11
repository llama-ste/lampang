import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const ProductItem = ({ image, title, price, description, affiliateUrl }) => {
  const priceFormatter = new Intl.NumberFormat(navigator.language);

  return (
    <CustomCard onClick={() => window.open(affiliateUrl, "_blank")}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          height: "100%",
        }}
      >
        <CustomCardMedia component="img" image={image} alt="상품사진" />
        <CardContent sx={{ width: "100%" }}>
          <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
          <Typography
            sx={{
              margin: "10px 0px",
              color: "#000000CC",
              fontWeight: 600,
            }}
            variant="subtitle2"
          >
            {priceFormatter.format(price)}원
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </CustomCard>
  );
};

const CustomCard = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    minWidth: "230px",
  },
}));

const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  objectFit: "contain",
  padding: "1px",
  minWidth: "260px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "150px",
    width: "100%",
  },
}));

export default ProductItem;
