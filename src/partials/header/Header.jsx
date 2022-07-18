import {Fragment, useState, useEffect} from "react";
import Logo from '../../components/logo/Logo';
import NavBar from '../../components/NavBar/NavBar';
import MobileMenu from "../../components/NavBar/MobileMenu"


const Header = () => {

    const [ofcanvasShow, setOffcanvasShow] = useState(false);
    const onCanvasHandler = () => {
        setOffcanvasShow(prev => !prev);
    }

    const [scroll, setScroll] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);

    useEffect(() => {
        const header = document.querySelector(".header-section");
        setHeaderTop(header.offsetTop);
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    return (
        <Fragment>
            <div className={`header-section header-transparent sticky-header section ${scroll > headerTop ? "is-sticky" : ""}`}>
                <div className="header-inner">
                    <div className="container position-relative">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-xl-2 col-auto order-0">
                                <Logo image={process.env.PUBLIC_URL + `/images/logo/logo.png`} />
                            </div>
                            <div className="col-auto col-xl d-flex align-items-center justify-content-xl-center justify-content-end order-2 order-xl-1">
                                <div className="menu-column-area d-none d-xl-block position-static">
                                    <NavBar />
                                </div>

                                <div className="header-mobile-menu-toggle d-xl-none ml-sm-2">
                                    <button type="button" className="toggle" onClick={onCanvasHandler}>
                                        <i className="icon-top"></i>
                                        <i className="icon-middle"></i>
                                        <i className="icon-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MobileMenu show={ofcanvasShow} onClose={onCanvasHandler}/>
        </Fragment>
    )
}

export default Header;