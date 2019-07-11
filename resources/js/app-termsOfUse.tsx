require('./bootstrap');

import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from "./components/Wireframe";
import { IDataInterface } from "./interfaces/IDataInterface";

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class TermsOfUse extends React.Component {
    render(){
        return(
            <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
                {this.renderTermsOfUseText()}
            </Wireframe>
        );
    }

    private renderTermsOfUseText() {
        return (
            <div>
                <h1>Impressum</h1>
                    <p>Angaben gemäß § 5 Telemediengesetz</p>																
	            <h2>Allgemeine Informationen</h2>
	            <dl>
					<dt>Name und Anschrift</dt>
			        <dd>
                        Rafael Carneiro <br />
                        Elsa-Brandström-Str. 11, Bergkamen <br />
                        Teeskins.de - Teeworlds Assets Database
                    </dd>
					<dt>E-Mail-Adresse</dt>
			        <dd>craetical@gmail.com</dd>
					<dt>Telefon</dt>
			        <dd>01724280326</dd>
                </dl>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<TermsOfUse />, document.getElementById('app'));
}