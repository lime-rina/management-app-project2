import React, { useEffect, useState } from 'react';

export default function ErrorToaster({ message, isVisible, onCloseEvent }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setVisible(true);

            const timer = setTimeout(() => {
                handleClose()
            }, 4000);

        }
    }, [isVisible]);

    const handleClose = () => {
        setVisible(false);
        onCloseEvent()
    };

    return (
        <div>
            {visible && (
                <div className="text-red-700 text-sm card bg-red-100 p-3 w-2/3 flex justify-between rounded animate-fade">
                    <p >{message}</p>
                    <button onClick={handleClose} className='cursor-pointer'>X</button>
                </div>
            )}
        </div>
    );
};
