import { NavLink } from "react-router-dom";
import "./component_CSS/footer.css";

function Footer(){
    return(
        <div className="footer-container">
            <div className="useful-links">
                <span><strong>Useful Links</strong></span>
                <NavLink to="/" className="footer-link">Home</NavLink>
                <NavLink to='/projects' className="footer-link">Projects</NavLink>
                <NavLink to='/employees' className="footer-link">Employees</NavLink>
            </div>

            <div className="vertical-line">
            </div>
            
            <div className="contact-us">
                <div className="phone-number">
                    <span><strong>Phone Number: </strong></span>
                    <span className="phone-number-string">424-443-3123</span>
                </div>
                <div className="email">
                    <span><strong>Email: </strong></span>
                    <span className="email-string">support@company.com</span>
                </div>
                <div className="address">
                    <span><strong>Address: </strong></span>
                    <span className="address-string">124 Conch St., Bikini Bottom, Pacific Ocean</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;