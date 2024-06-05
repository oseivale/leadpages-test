import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function Toast({
  handleClose,
  open,
  newSubmission,
  saveLikedFormSubmission,
}) {
  const handleSavedLikedFormSubmission = () => {
    saveLikedFormSubmission(newSubmission)
      .then((data) => {
        console.log(data);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        message={
          <>
            <div style={{ display: "flex" }}>
              <div>
                <p style={{ margin: "0" }}>
                  {newSubmission?.data?.firstName}{" "}
                  {newSubmission?.data?.lastName}
                </p>
                <p style={{ margin: "0" }}>{newSubmission?.data?.email}</p>
              </div>

              <Button
                variant="text"
                onClick={() => handleSavedLikedFormSubmission()}
              >
                LIKE
              </Button>
              <IconButton
                style={{ color: "#fff" }}
                variant="text"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </>
        }
      />
    </Box>
  );
}
