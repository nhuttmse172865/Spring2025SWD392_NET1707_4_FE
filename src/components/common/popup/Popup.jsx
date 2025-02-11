import ReactDOM from "react-dom";

const Popup = ({ children }) => {
  const root = document.body;
  return ReactDOM.createPortal(
    <div className="bg-[rgba(0,0,0,0.15)] absolute w-full h-full top-0 left-0 flex items-center justify-center">
      {children}
    </div>,
    root
  );
};

export default Popup;
