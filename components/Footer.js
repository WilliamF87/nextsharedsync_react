import Link from "next/link";
import { useContext } from "react";
import Modal from "react-modal";
import appContext from "../context/app/appContext";
import ModalContacto from "../components/ModalContacto";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};
  
Modal.setAppElement('#__next');

const Footer = () => {

    const  AppContext = useContext(appContext);
    const { modalContacto, handleChangeModalContacto } = AppContext;

    const gmail = () => {
        handleChangeModalContacto("gmail")
    }

    const facebook = () => {
        handleChangeModalContacto("facebook")
    }
    
    return (
        <>
            <footer className="bg-black py-20">
                <div className="contenedor md:flex md:justify-between">
                    <nav className="flex flex-row justify-center items-center md:gap-8 mb-4 md:mb-0">
                        <button onClick={gmail}>
                            <img
                                className="w-14 h-14 mr-4"
                                src="/logos/gmail-svgrepo-com.svg" alt="logo-gmail"
                            />
                        </button>
                        <Link href="https://www.linkedin.com/">
                            <img
                                className="w-16 h-16 mr-4"
                                src="/logos/linkedin-svgrepo-com.svg" alt="logo-linkedin"
                            />
                        </Link>
                        <Link href="https://github.com/">
                            <img
                                className="w-14 h-14 mr-4 bg-white p-1 rounded-lg"
                                src="/logos/github-142-svgrepo-com.svg" alt="logo-github"
                            />
                        </Link>
                        <button onClick={facebook}>
                            <img
                                className="w-14 h-14 mr-4"
                                src="/logos/facebook-color-svgrepo-com.svg" alt="logo-facebook"
                            />
                        </button>
                    </nav>

                    <p className="text-3xl text-white flex justify-center items-center font-bold text-center">Todos los derechos reservados</p>
                </div>
            </footer>

            <Modal
                isOpen={modalContacto}
                style={customStyles}
            >
                <ModalContacto />
            </Modal>
        </>
    )
}

export default Footer