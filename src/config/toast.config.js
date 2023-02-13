const toastConfig = {
  autoClose: 500,
  bodyStyle: { fontSize: "14px" },
  closeButton: true,
  closeOnClick: true,
  limit: 1,
  pauseOnHover: false,
  position: "top-center",
  progressStyle: {
    background: `linear-gradient(
      to right,
      #4cd964,
      #5ac8fa,
      #007aff,
      #34aadc,
      #5856d6,
      #ff2d55
    )`,
  },
  style: {
    maxWidth: "1000px",
    width: "max-content",
    zIndex: 1000000,
  },
  theme: "light",
};

export default toastConfig;
