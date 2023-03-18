import React, { useState, useEffect } from 'react';
import './modal.scss';
import Icon from '@components/Icon/Icon';
import { IsMobile } from '@utils/Environment/IsMobile';
import Button from '@components/Button/Button';

type ModalProps = {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    footer?: boolean;
    btnContinue?: string;
    btnCancel?: string;
    onContinue?: (event: any) => void;
};
const Modal: React.FC<ModalProps> = (props) => {

    const { title, children, isOpen, setIsOpen, footer, btnContinue, btnCancel, onContinue } = props;
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
                <div
                    className="modal"
                    onClick={IsMobile() ? undefined : handleClose}
                    onTouchEnd={!IsMobile() ? undefined : handleClose}
                >
                    <div
                        className="modal-dialog"
                        onClick={IsMobile() ? undefined : (e) => e.stopPropagation()}
                        onTouchEnd={!IsMobile() ? undefined : (e) => e.stopPropagation()}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <span
                                    className="btn-close"
                                    onClick={IsMobile() ? undefined : handleClose}
                                    onTouchEnd={!IsMobile() ? undefined : handleClose}
                                >
                                    <Icon icon='xmark' className='icon-close' />
                                </span>
                            </div>
                            <div className="modal-body">{children}</div>
                            {/* Terminar botones */}
                            {footer && (
                                <div className='modal-footer'>
                                    <Button
                                        text={btnCancel}
                                        className='btn-grey'
                                        onClick={handleClose}
                                    />
                                    <Button
                                        text={btnContinue}
                                        className='btn-blue'
                                        onClick={onContinue}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
