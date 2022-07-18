import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { NavLink, useHistory } from 'react-router-dom';
import { getClosest, getSiblings, slideToggle, slideUp } from "../../../utils";
import { withTranslation } from 'react-i18next';
import { useAuth } from "../../../context/AuthContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const MobileNavMenu = ({ t }) => {
    const { currentUser, signout } = useAuth();
    const history = useHistory();

    const handleSignout = () => {
        MySwal.fire({
            title: t('Logout'),
            text: t("Are you sure"),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('Logout')
        }).then((result) => {
            if (result.isConfirmed) {
                signout();
                history.push('/');
            }
        })
    };

    const onClickHandler = (e) => {
        const target = e.currentTarget;
        const parentEl = target.parentElement;
        if (
            parentEl?.classList.contains("menu-toggle") ||
            target.classList.contains("menu-toggle")
        ) {
            const element = target.classList.contains("icon")
                ? parentEl
                : target;
            const parent = getClosest(element, "li");
            const childNodes = parent.childNodes;
            const parentSiblings = getSiblings(parent);
            parentSiblings.forEach((sibling) => {
                const sibChildNodes = sibling.childNodes;
                sibChildNodes.forEach((child) => {
                    if (child.nodeName === "UL") {
                        slideUp(child, 1000);
                    }
                });
            });
            childNodes.forEach((child) => {
                if (child.nodeName === "UL") {
                    slideToggle(child, 1000);
                }
            });
        }
    };
    return (
        <nav className="site-mobile-menu">
            <ul>
                {
                    currentUser ?
                        <li className="has-children">
                            <NavLink to="#"><span className="menu-text">{currentUser.name ? currentUser.name : currentUser.email}</span></NavLink>
                            <span className="menu-toggle" onClick={onClickHandler}><i className=""><FaAngleDown /></i></span>
                            <ul className="sub-menu">
                                <li><NavLink to={"/Profile"}><span className="menu-text">{t('Profile')}</span></NavLink></li>
                                <li><NavLink to={""} onClick={handleSignout}><span className="menu-text">{t('Logout')}</span></NavLink></li>
                            </ul>
                        </li> : ''
                }
                <li>
                    <NavLink to={"/"}><span className="menu-text">{t('Home')}</span></NavLink>
                </li>
                {
                    !currentUser ?
                        <>
                            <li>
                                <NavLink to={"/Login"}><span className="menu-text">{t('Login')}</span></NavLink>
                            </li>
                            <li>
                                <NavLink to={"/SignUp"}><span className="menu-text">{t('Sign Up')}</span></NavLink>
                            </li>
                        </>:''
                }
                <li>
                    <NavLink to={"/Quizplay"}><span className="menu-text">{t('Quiz Play')}</span></NavLink>
                </li>
                <li>
                    <NavLink to={"/Bookmark"}><span className="menu-text">{t('bookmark')}</span></NavLink>
                </li>
                <li>
                    <NavLink to={"/Invite_friends"}><span className="menu-text">{t('Invite Friends')}</span></NavLink>
                </li>
                <li>
                    <NavLink to={"/Instruction"}><span className="menu-text">{t('Instruction')}</span></NavLink>
                </li>
                <li>
                    <NavLink to={"/Leaderboard"}><span className="menu-text">{t('LeaderBoard')}</span></NavLink>
                </li>
                <li className="has-children">
                    <NavLink to="#"><span className="menu-text">{t('More')}</span></NavLink>
                    <span className="menu-toggle" onClick={onClickHandler}><i className=""><FaAngleDown /></i></span>
                    <ul className="sub-menu">
                        <li><NavLink to={"/contact-us"}><span className="menu-text">{t('Contact Us')}</span></NavLink></li>
                        <li><NavLink to={"/about-us"}><span className="menu-text">{t('About Us')}</span></NavLink></li>
                        <li><NavLink to={"/terms-conditions"}><span className="menu-text">{t('Terms and Conditions')}</span></NavLink></li>
                        <li><NavLink to={"/privacy-policy"}><span className="menu-text">{t('Privacy Policy')}</span></NavLink></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default withTranslation()(MobileNavMenu);