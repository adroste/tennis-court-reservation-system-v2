import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';

export const appContext = React.createContext();

const texts = {
    reservationPrice: `
<div>
    15,- Euro pro Wertmarke<br />
    145,- Euro pro 10 Wertmarken
</div>`,
    reservationTos: `
<ul>
    <li>
        Zur Nutzung benötigen Sie Wertmarken und einen Zugangscode. Diese erhalten Sie bei unserern Partnern: <br />
relexa hotel Harz-Wald Braunlage, Karl-Röhrig Str. 5a, Tel. 05520/8070 <br />
BTG Braunlage (Tourist-Information), Elbingeröderstr. 17, Tel. 05520/93070 <br />
    </li>
    <li>
        Am Eingang der Halle ist ein Codeschloß angebracht, in das ein 4-stelliger Zahlencode eingegeben werden muß, um den Türöffner zu betätigen.
    </li>
    <li>
        Auf den Plätzen befindet sich für jeden Platz ein Wertmarkenautomat. Eine Wertmarke schaltet für 1 Stunde (+ etwas Nachlauf) das Licht ein und gibt die Heizungssteuerung frei.
    </li>
    <li>
        Eine Nutzung nach 22.00 und vor 8.00 Uhr ist ohne Reservierung möglich.
    </li>
    <li>
        Aus dem Reservierungssystem können keine Rechtsansprüche abgeleitet werden.
    </li>
</ul>`,
    infoPage: `
<h1>Allgemeine Informationen zur Hallennutzung</h1><div><br><ul><li>Es handelt sich hier um ein Reservierungssystem und nicht um ein Buchungssystem.</li><li>Eine verbindliche Buchung kommt erst durch Einwurf der Wertmarke in den Wertmarkenautomaten zustande.</li><li>Aus dem Reservierungssystem können keine Rechtsansprüche abgeleitet werden.</li><li>Sie müssen dieses Reservierungssystem nicht nutzen. Sie können die Halle auch ohne Reservierung nutzen, bitte beachten Sie aber, daß Reservierungen Vorrang haben.</li><li>Es ist auch eine Nutzung nach 22.00 und vor 8.00 möglich. Diese Zeiten werden nur selten nachgefragt und sind deshalb wegen der Übersichtlichkeit nicht im Reservierungsplan aufgeführt.</li><li>Am Eingang der Halle ist ein Codeschloß angebracht, in das ein 4-stelliger Zahlencode eingegeben werden muß, um den Türöffner zu betätigen.</li><li>Auf den Plätzen befindet sich für jeden Platz ein Wertmarkenautomat. Eine Wertmarke schaltet für 1 Stunde (+ etwas Nachlauf) das Licht ein und gibt die Heizungssteuerung frei.</li><li>Sie bekommen die Wertmarken und den Zugangscode bei unserern Partnern:</li><li>relexa hotel Harz-Wald Braunlage, Karl-Röhrig Str. 5a, Tel. 05520/8070</li><li>BTG Braunlage (Tourist-Information), Elbingeröderstr. 17, Tel. 05520/93070</li><li>Eine Wertmarke kostet 15,- Euro</li><li>10 Wertmarken kosten 145,- Euro</li><li>Ein Abo im eigentlichen Sinn gibt es nicht, nur den Rabatt ab 10 Wertmarken.</li><li>Bei wesentlich höherem Bedarf, z.B. Buchung der ganzen Halle für ein Wochenende setzen Sie sich bitte mit uns in Verbindung.</li></ul></div><div><br></div><h1>Nutzung des Reservierungssystems</h1><div><ul><li>Neu hier?<br>Bevor sie das Reservierungssystem nutzen können, müssen sie sich registrieren.</li><li>Wie reserviere ich eine Stunde?<br>Klicken Sie die gewünschte Stunde einfach an. Falls Sie nicht angemeldet sind erscheint die Anmeldemaske. Melden Sie sich an, dann können Sie die gewünschte Stunde durch einfaches anklicken reservieren.</li><li>Wie storniere ich eine Reservierung?<br>Sie können Reservierungen einfach durch anklicken der Reservierung wieder stornieren. Sie können nur ihre eigenen Reservierungen stornieren. Sie müssen dazu angemeldet sein.</li><li>Welche Einschränkungen gibt es für Reservierungen?<br>Reservierungen können maximal 3 Monate im voraus getätigt werden.</li><li>Passwort, E-Mail oder Nutzername ändern<br>Sie können ihre Daten unter "Mein Benutzerkonto" ändern.</li><li>DSGVO: Daten löschen / anfordern<br>Sie können all ihre Daten unter "Mein Benutzerkonto" anfordern.</li></ul></div>`,
    legalPrivacy: `
<h1>Impressum</h1><h1>Datenschutzerklärung</h1>`,
};

const mailTemplates = {
    reservationConfirmation: {
        subject: 'Reservierungsbestätigung',
        body:
            `"Hallo " . $user_name . ",<br><br>Sie haben soeben folgende Reservierung getätigt:<br><br>" . date_get($year, $week, $day) . " " . get_court($court) . " (" . $time . " Uhr)" . "<br><br>Eine verbindliche Buchung kommt erst durch Einwurf der Wertmarke in den Wertmarkenautomaten zustande.<br>Aus dem Reservierungssystem können keine Rechtsansprüche abgeleitet werden.<br><br>Sie bekommen die Wertmarken und den Zugangscode bei unserern Partnern:<br>relexa hotel Harz-Wald Braunlage, Karl-Röhrig Str. 5a, Tel. 05520/8070<br>BTG Braunlage (Tourist-Information), Elbingeröderstr. 17, Tel. 05520/93070<br><br><a href=\"" . global_url . "#help" . "\">Allgemeine Informationen zur Hallennutzung</a><br><br>Möchten Sie keine Erinnerungen oder Reservierungsbestätigungen mehr erhalten, können sie dies im Kontrollzentrum ändern.<br><br><a href=\"" . global_url . "\">" . global_url . "</a><br><br>Dies ist eine automatisch generierte Nachricht. Bitte antworten Sie nicht auf diese E-Mail!";`,
    }
};

export function AppContextProvider({ children }) {

    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            const fromTilHours = [8, 22];
            const visibleHours = [];
            for (let i = fromTilHours[0]; i < fromTilHours[1]; ++i)
                visibleHours.push(i);

            setTimeout(() => 
            setData({
                announcement: "Beispielankündigung: abcdefg bla bla",
                courts: [
                    {
                        courtId: 0,
                        name: 'Platz 1',
                    },
                    {
                        courtId: 1,
                        name: 'Platz 2',
                        disabledFrom: dayjs().subtract(2, 'week'),
                        disabledTil: dayjs().add(4, 'week'),
                        disabledReason: '<hier beliebigen Grund einsetzen>',
                    },
                    // {
                    //     courtId: 2,
                    //     name: 'Platz 3',
                    // }
                ],
                visibleHours,
                title: 'Tennisclub Beispiel',
                texts,
                mailTemplates,
            })
            , 400);
        })();
    }, []);

    return (
        <appContext.Provider value={data}>
            {children}
        </appContext.Provider>
    );
}