import * as React from 'react';

export default class Footer extends React.Component {
    render(){
        return(
            <footer>
                <p>&copy; {(new Date().getFullYear())} by Rafael Carneiro. All rights reserved.</p>
                <div className="footer-navigation">
                    <ul>
                        <li><a href="/privacy-policies"> Privacy Policies </a></li>
                        <li><a href="/terms-of-use"> Terms of use </a></li>
                        <li><a href="/faq"> FAQ </a></li>
                    </ul>
                </div>
            </footer>
        );
    }
}