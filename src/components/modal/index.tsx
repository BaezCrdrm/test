import React from 'react';
import { Box, Modal as ReactModal } from '@mui/material';
import { CallbackFunction } from '../utils/definitions';

interface ITreeModalProps
{
    open: boolean,
    title: string,
    children: JSX.Element,
    onAccept?: CallbackFunction,
    onCancel?: CallbackFunction,
    onClose?: CallbackFunction
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Modal = (props: ITreeModalProps) => {
    const onClose = () => {
        if(props.onClose)
            props.onClose();
    };

    return (
        <ReactModal
            open={props.open}
            onClose={onClose}>
            <Box sx={style}>
                <h2 id="parent-modal-title">{props.title}</h2>
                {props.children}
            </Box>
        </ReactModal>
    )
}

export default Modal;
