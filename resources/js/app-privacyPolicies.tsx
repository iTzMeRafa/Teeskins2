import * as React from 'react';
import ReactDOM from 'react-dom';
import Wireframe from './components/Wireframe';

// Interfaces
/* eslint-disable-next-line no-unused-vars */
import { IDataInterface } from './interfaces/IDataInterface';

require('./bootstrap');

/*
 * This global variable comes from the page associated controller
 * and contains all necessary data for its view and the wireframe
 */
declare var data: IDataInterface;

export default class PrivacyPolicies extends React.Component {
  public render () {
    return (
      <Wireframe totalItemsCount={data.globalData.totalItemsCount}>
        {this.renderPrivacyPoliciesText()}
      </Wireframe>
    );
  }

  private renderPrivacyPoliciesText () {
    return (
      <div>
        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert,
          wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
        </p>
        <h3>Datenerfassung auf unserer Website</h3>
        <p>
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
        </p>

        <p>
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
          Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
        </p>

        <p>
          <strong>Wie erfassen wir Ihre Daten?</strong>
        </p>

        <p>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
          Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
        </p>

        <p>
          Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst.
          Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.
        </p>

        <p>
          <strong>Wofür nutzen wir Ihre Daten?</strong>
        </p>

        <p>
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
          Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
        </p>

        <p>
          <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
        </p>

        <p>
          Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft,
          Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
          Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.
          Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen
          Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
        </p>

        <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
          Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften
          sowie dieser Datenschutzerklärung.
        </p>

        <p>
          Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
          Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.
          Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen.
          Sie erläutert auch, wie und zu welchem Zweck das geschieht.
        </p>

        <p>
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken
          aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
        </p>
        <h3>Hinweis zur verantwortlichen Stelle</h3>
        <p>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
        </p>

        <p>
          [Name und Anschrift der verantwortlichen Stelle]
        </p>
        <p>
          Telefon: [Telefonnummer der verantwortlichen Stelle] <br />
          E-Mail: [E-Mail-Adresse der verantwortlichen Stelle]
        </p>
        <p>
          Verantwortliche Stelle ist die natürliche oder juristische Person,
          die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten
          (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
        </p>
        <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
        <p>
          Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich.
          Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
          Dazu reicht eine formlose Mitteilung per E-Mail an uns.
          Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
        </p>
        <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
        <p>
          Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
          Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes,
          in dem unser Unternehmen seinen Sitz hat.
          Eine Liste der Datenschutzbeauftragten sowie deren Kontaktdaten können folgendem Link entnommen werden:
          <a
            href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
            target="_blank"
            className="externalURL"
            rel="nofollow noopener noreferrer"
          >
            https://www.bfdi.bund.de/DE/In…schriften_links-node.html
          </a>.
        </p>
        <h3>Recht auf Datenübertragbarkeit</h3>
        <p>
          Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten,
          an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
          Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur,
          soweit es technisch machbar ist.
        </p>
        <h3>Auskunft, Sperrung, Löschung</h3>
        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre
          gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf.
          ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
          Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum
          angegebenen Adresse an uns wenden.
        </p>
        <h3>Widerspruch gegen Werbe-Mails</h3>
        <p>
          Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich
          angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen.
          Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von
          Werbeinformationen, etwa durch Spam-E-Mails, vor.
        </p>

        <h2>3. Datenerfassung auf unserer Website</h2>
        <h3>Cookies</h3>
        <p>
          Die Internetseiten verwenden teilweise so genannte Cookies.
          Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren.
          Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
          Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
        </p>

        <p>
          Die meisten der von uns verwendeten Cookies sind so genannte “Session-Cookies”.
          Sie werden nach Ende Ihres Besuchs automatisch gelöscht.
          Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen.
          Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
        </p>

        <p>
          Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall
          erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies
          beim Schließen des Browser aktivieren.
          Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
        </p>

        <p>
          Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur Bereitstellung bestimmter,
          von Ihnen erwünschter Funktionen (z.B. Warenkorbfunktion) erforderlich sind,
          werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert.
          Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und
          optimierten Bereitstellung seiner Dienste.
          Soweit andere Cookies (z.B. Cookies zur Analyse Ihres Surfverhaltens) gespeichert werden,
          werden diese in dieser Datenschutzerklärung gesondert behandelt.
        </p>
        <h3>Server-Log-Dateien</h3>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
          die Ihr Browser automatisch an uns übermittelt. Dies sind:
        </p>
        <ul>
          <li>
            Browsertyp und Browserversion
          </li>
          <li>
            verwendetes Betriebssystem
          </li>
          <li>
            Referrer URL
          </li>
          <li>
            Hostname des zugreifenden Rechners
          </li>
          <li>
            Uhrzeit der Serveranfrage
          </li>
          <li>
            IP-Adresse
          </li>
        </ul>
        <p>
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
        </p>

        <p>
          Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO,
          der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
        </p>
        <h3>Registrierung auf dieser Website</h3>
        <p>
          Sie können sich auf unserer Website registrieren, um zusätzliche Funktionen auf der Seite zu nutzen.
          Die dazu eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes,
          für den Sie sich registriert haben. Die bei der Registrierung abgefragten Pflichtangaben müssen vollständig angegeben werden.
          Anderenfalls werden wir die Registrierung ablehnen.
        </p>

        <p>
          Für wichtige Änderungen etwa beim Angebotsumfang oder bei technisch notwendigen Änderungen nutzen wir die bei der
          Registrierung angegebene E-Mail-Adresse, um Sie auf diesem Wege zu informieren.
        </p>

        <p>
          Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt auf Grundlage Ihrer Einwilligung
          (Art. 6 Abs. 1 lit. a DSGVO). Sie können eine von Ihnen erteilte Einwilligung jederzeit widerrufen.
          Dazu reicht eine formlose Mitteilung per E-Mail an uns.
          Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
        </p>

        <p>
          Die bei der Registrierung erfassten Daten werden von uns gespeichert,
          solange Sie auf unserer Website registriert sind und werden anschließend gelöscht.
          Gesetzliche Aufbewahrungsfristen bleiben unberührt.
        </p>
        <h3>Datenübermittlung bei Vertragsschluss für Dienstleistungen und digitale Inhalte</h3>
        <p>
          Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies im Rahmen der Vertragsabwicklung notwendig ist,
          etwa an das mit der Zahlungsabwicklung beauftragte Kreditinstitut.
        </p>

        <p>
          Eine weitergehende Übermittlung der Daten erfolgt nicht bzw. nur dann, wenn Sie der Übermittlung ausdrücklich zugestimmt haben.
          Eine Weitergabe Ihrer Daten an Dritte ohne ausdrückliche Einwilligung, etwa zu Zwecken der Werbung, erfolgt nicht.
        </p>

        <p>
          Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO,
          der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
        </p>
      </div>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<PrivacyPolicies />, document.getElementById('app'));
}
