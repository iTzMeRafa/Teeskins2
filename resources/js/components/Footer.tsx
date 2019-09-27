import * as React from 'react';

// Services
import { URLS } from '../Services/UrlService';

export default class Footer extends React.Component {
  public render () {
    return (
      <footer id="footer">
        <p>&copy; {(new Date().getFullYear())} by Rafael Carneiro. All rights reserved.</p>
        <div className="footer-navigation">
          <ul>
            <li><a href={URLS.PrivacyPolicies}> Privacy Policies </a></li>
            <li><a href={URLS.TermsOfUse}> Terms of use </a></li>
            <li><a href={URLS.API}> API </a></li>
          </ul>
        </div>
      </footer>
    );
  }
}
