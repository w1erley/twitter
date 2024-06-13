'use client';

import { useRouter } from "next/navigation";

const Modal = ({children}) => {
  const router = useRouter();

  const handleClose = () => {
    router.back()
  }

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-space')) {
      handleClose();
    }
  };

  return (
    // <div>
    //   <button onClick={goBack} className="modal-space">
    //    {children}
    //   </button>
    // </div>

    <div className="modal-space" onClick={handleOutsideClick}>
      <div className="modal-in-content">
        {children}
      </div>
    </div>
    )
}

export default Modal
