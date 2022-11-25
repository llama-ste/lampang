import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductItem = ({ image, title, price, description, affiliateUrl }) => {
  const priceFormatter = new Intl.NumberFormat(navigator.language);

  return (
    <Card
      sx={{ minWidth: "230px" }}
      onClick={() => window.open(affiliateUrl, "_blank")}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          height: "100%",
        }}
      >
        <CardMedia
          sx={{ objectFit: "contain", padding: "1px", minWidth: "260px" }}
          component="img"
          height="200"
          image={image}
          alt="상품사진"
        />
        <CardContent>
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
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;
