import React, { useState, useEffect } from 'react';
import './modal.scss';
import Icon from '@components/Icon/Icon';

type ModalProps = {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
};

const Modal: React.FC<ModalProps> = (props) => {

    const { title, children, isOpen, setIsOpen } = props;
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setShow(false);
        setIsOpen(false);
    };

    return (
        <>
            {show && (
                <div className="modal" onClick={handleClose}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <span className="btn-close" onClick={handleClose}>
                                    <Icon icon='xmark' className='icon-close' />
                                </span>
                            </div>
                            <div className="modal-body">{children}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
