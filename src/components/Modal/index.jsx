// ReusableModal.js
import React from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const ReusableModal = ({ open, onClose, title, children, footer }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={modalStyle}
        style={{
          padding: "20px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Box sx={{ mt: 2 }}>{children}</Box>
        {footer && <Box sx={{ mt: 2 }}>{footer}</Box>}
      </Box>
    </Modal>
  );
};

ReusableModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

export default ReusableModal;
