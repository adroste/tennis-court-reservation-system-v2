import dayjs from 'dayjs';

const today = dayjs().startOf('day');

export const db = {

    config: {
        announcement: "Beispielankündigung: abcdefg bla bla",
        visibleHours: [8, 22],
        orgName: 'Tennisclub Beispiel',
        serverMail: 'abc@def.de',
        url: 'https://reservierung.xyz.de',
        reservationDaysInAdvance: 90,
        reservationMaxActiveCount: 10,
    },

    mailTemplates: {
        reservationConfirmation: {
            subject: 'Reservierungsbestätigung - Tennisclub Beispiel',
            body: `Hallo {{name}}.<div><br>Sie haben soeben folgende Reservierung getätigt:<br><br>{{reservierung}}<br><br>Eine verbindliche Buchung kommt erst durch Einwurf der Wertmarke in den Wertmarkenautomaten zustande.<br>Aus dem Reservierungssystem können keine Rechtsansprüche abgeleitet werden.<br><br>Sie bekommen die Wertmarken und den Zugangscode bei unserern Partnern:<br>xyz<br><br>---</div><div><br></div><div>Tennisclub Beispiel&nbsp;</div>`
        },
        reservationCancelled: {
            subject: 'Stornierung Ihrer Reservierung - Tennisclub Beispiel',
            body: `Hallo {{name}}.<div><br>Ihre Reservierung wurde soeben storniert:<br><br>{{reservierung}}<br><br>Grund der Stornierung:</div><div><br></div><div>{{grund}}<br><br><br>---</div><div><br></div><div>Tennisclub Beispiel&nbsp;</div>`
        },
        confirmMail: {
            subject: 'Registrierung: Bestätigen Sie Ihre E-Mail - Tennisclub Beispiel',
            body: `Hallo {{name}}.<div><br>Bitte bestätigen Sie Ihre E-Mail Adresse, indem Sie auf folgenden Link klicken:<br><br>{{link}}<br></div><div><br></div><div>---</div><div><br></div><div>Tennisclub Beispiel&nbsp;</div>`
        },
        resetPassword: {
            subject: 'Passwort zurücksetzen - Tennisclub Beispiel',
            body: `Hallo {{name}}.<div><br>Klicken Sie auf folgenden Link, um Ihr Passwort zurückzusetzen:<br><br>{{link}}<br><br></div><div>---</div><div><br></div><div>Tennisclub Beispiel&nbsp;</div>`
        },
    },

    templates: {
        reservationPrice: {
            body: `<div>
    15,- Euro pro Wertmarke<br />
    145,- Euro pro 10 Wertmarken
</div>`
        },
        reservationTos: {
            body: `<ul>
    <li>
        Zur Nutzung benötigen Sie Wertmarken und einen Zugangscode. Diese erhalten Sie bei unserern Partnern: <br />
xyz asfdlkafsd, asdfkj 012387878 <br />
xbasdfyz aad, asdfkj 129388 8123 <br />
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
</ul>`
        },
        systemTos: {
            body: `<ul>
    <li>
        Aus dem Reservierungssystem können keine Rechtsansprüche abgeleitet werden.
    </li>
    <li>
        Ihr Anzeigename wird öffentlich auf dem Reservierungskalender angezeigt.
    </li>
    <li>
        Sie sind damit einverstanden, dass eine zu Cookies ähnliche Technologie verwendet wird, um die Funktionalität des Systems zu gewährleisten. Es erfolgt kein Tracking, o.ä.
    </li>
    <li>
        Sie können Ihre gespeicherten Daten (Benutzerkonto, Reservierungen) zu jedem Zeitpunkt einsehen und endgültig löschen.
    </li>
    <li>
        Ihre E-Mail wird dazu verwendet, um Reservierungen zu bestätigen und Sie ggf. zu benachrichtigen. Ihre E-Mail wird nicht mit Dritten geteilt.
    </li>
</ul>`
        },
        infoPage: {
            body: `<h1>Allgemeine Informationen zur Hallennutzung</h1><div><br><ul><li>Es handelt sich hier um ein Reservierungssystem und nicht um ein Buchungssystem.</li><li>Eine verbindliche Buchung kommt erst durch Einwurf der Wertmarke in den Wertmarkenautomaten zustande.</li><li>Aus dem Reservierungssystem können keine Rechtsansprüche abgeleitet werden.</li><li>Sie müssen dieses Reservierungssystem nicht nutzen. Sie können die Halle auch ohne Reservierung nutzen, bitte beachten Sie aber, daß Reservierungen Vorrang haben.</li><li>Es ist auch eine Nutzung nach 22.00 und vor 8.00 möglich. Diese Zeiten werden nur selten nachgefragt und sind deshalb wegen der Übersichtlichkeit nicht im Reservierungsplan aufgeführt.</li><li>Am Eingang der Halle ist ein Codeschloß angebracht, in das ein 4-stelliger Zahlencode eingegeben werden muß, um den Türöffner zu betätigen.</li><li>Auf den Plätzen befindet sich für jeden Platz ein Wertmarkenautomat. Eine Wertmarke schaltet für 1 Stunde (+ etwas Nachlauf) das Licht ein und gibt die Heizungssteuerung frei.</li><li>Sie bekommen die Wertmarken und den Zugangscode bei unserern Partnern:</li><li>relexa hotel Harz-Wald Braunlage, Karl-Röhrig Str. 5a, Tel. 05520/8070</li><li>BTG Braunlage (Tourist-Information), Elbingeröderstr. 17, Tel. 05520/93070</li><li>Eine Wertmarke kostet 15,- Euro</li><li>10 Wertmarken kosten 145,- Euro</li><li>Ein Abo im eigentlichen Sinn gibt es nicht, nur den Rabatt ab 10 Wertmarken.</li><li>Bei wesentlich höherem Bedarf, z.B. Buchung der ganzen Halle für ein Wochenende setzen Sie sich bitte mit uns in Verbindung.</li></ul></div><div><br></div><h1>Nutzung des Reservierungssystems</h1><div><ul><li>Neu hier?<br>Bevor sie das Reservierungssystem nutzen können, müssen sie sich registrieren.</li><li>Wie reserviere ich eine Stunde?<br>Klicken Sie die gewünschte Stunde einfach an. Falls Sie nicht angemeldet sind erscheint die Anmeldemaske. Melden Sie sich an, dann können Sie die gewünschte Stunde durch einfaches anklicken reservieren.</li><li>Wie storniere ich eine Reservierung?<br>Sie können Reservierungen einfach durch anklicken der Reservierung wieder stornieren. Sie können nur ihre eigenen Reservierungen stornieren. Sie müssen dazu angemeldet sein.</li><li>Welche Einschränkungen gibt es für Reservierungen?<br>Reservierungen können maximal 3 Monate im voraus getätigt werden.</li><li>Passwort, E-Mail oder Nutzername ändern<br>Sie können ihre Daten unter "Mein Benutzerkonto" ändern.</li><li>DSGVO: Daten löschen / anfordern<br>Sie können all ihre Daten unter "Mein Benutzerkonto" anfordern.</li></ul></div>`,
        },
        legalPrivacy: {
            body: `<h1>Impressum</h1><h1>Datenschutzerklärung</h1>`,
        },
    },

    courts: [
        {
            courtId: 1,
            name: 'Platz 1',
        },
        {
            courtId: 2,
            name: 'Platz 2',
        },
        // {
        //     courtId: 2,
        //     name: 'Platz 3',
        // }
    ],

    users: [
        {
            userId: 9,
            name: 'Max Mustermann',
            mail: 'max@example.com',
            verified: true,
            admin: false,
        },
        {
            userId: 2,
            name: 'Otto Probiermal',
            mail: 'otto@example.com',
            verified: true,
            admin: true,
        },
        {
            userId: 3,
            name: 'Jürgen M.',
            mail: 'juergen@example.com',
            verified: true,
            admin: false,
        },
        {
            userId: 8,
            name: 'H. Müller',
            mail: 'mueller@example.com',
            verified: true,
            admin: false,
        },
        {
            userId: 661,
            name: 'Nick Sample',
            mail: 'test.franz.mein.mail@franz.de',
            verified: true,
            admin: false,
        },
        {
            userId: 41,
            name: 'Franz Test',
            mail: 'test.franz.mein.mail@franz.de',
            verified: false,
            admin: false,
        }
    ],

    // primary key: courtId x Date
    // foreign key: groupId
    reservations: [
        {
            date: today.add(-1, 'day').hour(11),
            courtId: 1,
            groupId: 1,
            created: today.add(-2, 'day').hour(11),
        },
        {
            date: today.add(3, 'day').hour(20),
            courtId: 1,
            groupId: 3,
            created: today.add(-2, 'day').hour(11),
        },
        {
            date: today.add(-2, 'day').hour(15),
            courtId: 1,
            groupId: 2,
            created: today.add(-4, 'day').hour(11),
        },
        {
            date: today.add(-1, 'day').hour(15),
            courtId: 1,
            groupId: 2,
            created: today.add(-4, 'day').hour(11),
        },
        {
            date: today.add(-0, 'day').hour(15),
            courtId: 1,
            groupId: 2,
            created: today.add(-4, 'day').hour(11),
        },
        {
            date: today.add(1, 'day').hour(15),
            courtId: 1,
            groupId: 2,
            created: today.add(-4, 'day').hour(11),
        },
        {
            date: today.add(0, 'day').hour(17),
            courtId: 1,
            groupId: 4,
            created: today.add(-4, 'day').hour(11),
        },
        {
            date: today.add(7, 'day').hour(17),
            courtId: 1,
            groupId: 4,
            created: today.add(-4, 'day').hour(11),
        },
        {
            date: today.add(14, 'day').hour(17),
            courtId: 1,
            groupId: 4,
            created: today.add(-4, 'day').hour(11),
        },
        {
            date: today.add(21, 'day').hour(17),
            courtId: 1,
            groupId: 4,
            created: today.add(-4, 'day').hour(11),
        },
    ],

    // primary key: groupId auto_inc
    reservationGroups: [
        {
            groupId: 1,
            userId: 9,
            customName: null,
        },
        {
            groupId: 3,
            userId: 9,
            customName: null,
        },
        {
            groupId: 2,
            userId: 3,
            customName: null,
        },
        {
            groupId: 4,
            userId: 2,
            customName: null,
        },
    ]
};

window.getFakeDb = () => {
    return db;
};

window.addFakeReservation = () => {
    db.reservationGroups.push({
        groupId: 999,
        userId: 2,
        customName: 'Fake',
    });

    db.reservations.push({
        date: today.hour(8),
        courtId: 1,
        groupId: 999,
        created: today,
    });
}
