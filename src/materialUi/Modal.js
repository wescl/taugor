import React, { useState, useRef } from 'react';
import { Modal, Backdrop, Fade, IconButton, Typography, Box } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { styled } from '@mui/system';
import './Modal.scss';

const useStyles = styled((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    maxWidth: 1400,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const ModalComponent = ({ isOpen, onClose, children, maxWidth }) => {
  const classes = useStyles();
  const modalRef = useRef(null);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      ref={modalRef}
    >
      <Fade in={isOpen}>
        <Box className={classes.paper}>
          <p style={{ margin: '.8em 0', color: 'transparent' }}>.</p>
          <div id="transition-modal-description" className={`modal-container ${maxWidth}`}>
            <div aria-label="close" className="close-button" onClick={onClose}>
              <IoMdClose />
            </div>
            {children}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
