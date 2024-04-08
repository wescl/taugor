import React, { useRef } from 'react';
import { Modal, Backdrop, Fade, Box } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { styled } from '@mui/material';
import './Modal.scss';

const ModalComponent = ({ isOpen, onClose, children, maxWidth }) => {
  const classes = styled(Modal, {
    name: 'Modal',
  })({
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
      top: 8,
      right: 8,
    },
  });

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