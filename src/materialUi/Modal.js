import React, { useState, useRef } from 'react';
import { Modal, makeStyles, Backdrop, Fade, IconButton } from '@material-ui/core';
import { IoMdClose } from "react-icons/io";
import './Modal.scss';

const useStyles = makeStyles((theme) => ({
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
        <div className={classes.paper}>

          <div id="transition-modal-description" className={`modal-container ${maxWidth}`}>
            <div aria-label="close" className="close-button" onClick={onClose}>
              <IoMdClose />
            </div>
            {children}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
