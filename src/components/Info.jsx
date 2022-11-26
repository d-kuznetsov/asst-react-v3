import { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/InfoTwoTone";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function Info({ text }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton aria-describedby={id} size="small" onClick={handleClick}>
        <InfoIcon fontSize="small" color="info" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleClose}
      >
        <Alert severity="info" p={1}>
          <AlertTitle>Hinweis</AlertTitle>
          {text}
        </Alert>
      </Popover>
    </>
  );
}
