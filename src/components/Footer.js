import { NavLink } from "react-router-dom";
import "./component_CSS/footer.css";

function Footer(){
    return(
        <div className="footer-container">
            <div className="useful-links">
                <span><strong>Useful Links</strong></span>
                <NavLink to='/projects'>Projects</NavLink>
                <NavLink to='/employees'>Employees</NavLink>
            </div>

            <div className="vertical-line">
            </div>
            
            <div className="contact-us">
                <div className="phone-number">
                    <span><strong>Phone Number: </strong></span>
                    <span>424-443-3123</span>
                </div>
                <div className="email">
                    <span><strong>Email: </strong></span>
                    <span>support@company.com</span>
                </div>
                <div className="address">
                    <span><strong>Address: </strong></span>
                    <span>124 Conch St., Bikini Bottom, Pacific Ocean</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;