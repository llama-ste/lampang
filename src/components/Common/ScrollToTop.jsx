import { Fade, Box, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isShow, setIsShow] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);

    return () => window.removeEventListener("scroll", handleShowButton);
  }, []);

  return (
    <Fade in={isShow}>
      <Box
        onClick={handleClick}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <Fab color="primary">
          <KeyboardArrowUpIcon fontSize="large" />
        </Fab>
      </Box>
    </Fade>
  );
};

export default ScrollToTop;
