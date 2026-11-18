import type { Lang } from '../i18n/home'

type Text = Record<Lang, string>
const text = (de: string, en: string): Text => ({ de, en })

export const practiceCopy = {
  title: text('Mit Mikas Büroschlüssel üben', 'Practise with Mika’s office key'),
  intro: text(
    'Spiele die Registrierung und die erste Anmeldung bei Microsoft 365 mit einem fiktiven Geschäftskonto durch. Die Übung läuft ohne echten Schlüssel oder PIN. Die Dialoge auf deinem Gerät können anders aussehen.',
    'Practise registering a key and signing in to Microsoft 365 with a fictional work account. No real key or PIN is needed. The prompts on your own device may look different.',
  ),
  simulation: text('Simulation', 'Simulation'),
  register: text('Registrieren', 'Register'),
  test: text('Anmelden', 'Sign in'),
  phase: text('Abschnitt', 'Stage'),
  tag: text('Büroschlüssel', 'Office key'),
  account: text('Übungskonto', 'Practice account'),
  registered: text('Schlüssel registriert', 'Key registered'),
  tested: text('Anmeldung getestet', 'Sign-in tested'),
}

interface Choice {
  label: Text
  feedback?: Text
}

interface PracticeStep {
  phase: 'register' | 'test'
  title: Text
  body: Text
  choices: Choice[]
}

export const practiceSteps: PracticeStep[] = [
  {
    phase: 'register',
    title: text('Wo soll Mikas Passkey liegen?', 'Where should Mika’s passkey go?'),
    body: text(
      'Mika ist bereits angemeldet und hat unter «Sicherheitsinformationen» einen neuen Passkey gewählt. Der Computer bietet zuerst sich selbst als Speicherort an. Gesucht ist der USB-Schlüssel vom ersten Arbeitstag.',
      'Mika is already signed in and has chosen to add a passkey in Security info. The computer offers to save it on this device. Mika wants to use the USB key supplied on day one.',
    ),
    choices: [
      {
        label: text('Dieses Gerät', 'This device'),
        feedback: text(
          'Damit würdest du den Computer als Speicherort wählen. Öffne «Weitere Optionen», um den USB-Schlüssel zu finden.',
          'That would select the computer as the storage location. Choose More options to find the USB key.',
        ),
      },
      { label: text('Weitere Optionen', 'More options') },
    ],
  },
  {
    phase: 'register',
    title: text('Welches Gerät hast du vor dir?', 'Which device are you holding?'),
    body: text(
      'In dieser Auswahl stehen weitere Speicherorte. Mika hält den physischen Büroschlüssel in der Hand.',
      'The next prompt lists other places to save the passkey. Mika is holding the physical office key.',
    ),
    choices: [
      {
        label: text('Handy oder Tablet', 'Phone or tablet'),
        feedback: text(
          'Das wäre die Anmeldung über ein Mobilgerät. Für den physischen FIDO2-Schlüssel wählst du «Sicherheitsschlüssel».',
          'That would use a mobile device. Choose Security key for the physical FIDO2 key.',
        ),
      },
      { label: text('Sicherheitsschlüssel', 'Security key') },
    ],
  },
  {
    phase: 'register',
    title: text('Den Büroschlüssel freigeben', 'Unlock the office key'),
    body: text(
      'Mika verbindet den Schlüssel, gibt dessen PIN im lokalen Sicherheitsdialog ein und berührt das Kontaktfeld. Spiele diese Bestätigung mit einem Klick nach.',
      'Mika connects the key, enters its PIN in the device’s security prompt, and touches the contact. Use the button to simulate that confirmation.',
    ),
    choices: [{ label: text('PIN und Berührung simulieren', 'Simulate PIN and touch') }],
  },
  {
    phase: 'register',
    title: text('Dem Schlüssel einen Namen geben', 'Give the key a recognisable name'),
    body: text(
      'Der Beispielname «Büroschlüssel» ist schon eingetragen. Schliesse die Registrierung ab, damit der Eintrag unter Mikas Sicherheitsinformationen erscheint.',
      'The example name “Office key” is filled in. Finish registration to see the new entry in Mika’s Security info.',
    ),
    choices: [{ label: text('Registrierung abschliessen', 'Finish registration') }],
  },
  {
    phase: 'register',
    title: text('Der Büroschlüssel ist registriert', 'The office key is registered'),
    body: text(
      'Der Eintrag ist jetzt in Mikas Übungskonto sichtbar. Lass diese Sitzung offen und starte für den Test eine zweite, unabhängige Anmeldung. Die Übung simuliert das private Browserfenster.',
      'The key now appears in Mika’s practice account. Keep that session open and test a second, independent sign-in. The exercise simulates a private browser window.',
    ),
    choices: [{ label: text('Neue Anmeldung starten', 'Start a fresh sign-in') }],
  },
  {
    phase: 'test',
    title: text('Welcher Schlüssel gehört zu diesem Konto?', 'Which key belongs to this account?'),
    body: text(
      'In der neuen Sitzung ist Mika abgemeldet. Unter «Anmeldeoptionen» hat Mika den Sicherheitsschlüssel gewählt. Welchen Schlüssel verbindest du?',
      'Mika is signed out in the fresh session and has selected the security key under Sign-in options. Which key should Mika connect?',
    ),
    choices: [
      {
        label: text('Ersatzschlüssel', 'Spare key'),
        feedback: text(
          'Dieser Ersatzschlüssel ist für Mikas Konto noch nicht registriert. Verwende jetzt den Büroschlüssel. Einen Ersatz kannst du separat registrieren.',
          'This spare key hasn’t been registered for Mika’s account. Use the office key for this test. A spare can be registered separately.',
        ),
      },
      { label: text('Büroschlüssel', 'Office key') },
    ],
  },
  {
    phase: 'test',
    title: text('Die neue Anmeldung bestätigen', 'Approve the fresh sign-in'),
    body: text(
      'Du hast denselben Schlüssel gewählt wie bei der Registrierung. Mika entsperrt ihn mit der Schlüssel-PIN und berührt ihn auf Aufforderung. Der Schlüssel signiert die neue Anfrage.',
      'You chose the same key that Mika registered. Mika unlocks it with the key’s PIN and touches it when prompted. The key signs the new request.',
    ),
    choices: [{ label: text('Anmeldung bestätigen', 'Confirm sign-in') }],
  },
  {
    phase: 'test',
    title: text('Mika ist angemeldet', 'Mika is signed in'),
    body: text(
      'Im neuen Übungsfenster ist jetzt Mikas Geschäftskonto offen. Damit hast du geprüft, dass genau dieser registrierte Schlüssel für die Anmeldung funktioniert.',
      'Mika’s work account is now open in the fresh practice session. You’ve confirmed that this registered key works for sign-in.',
    ),
    choices: [{ label: text('Noch einmal üben', 'Practise again') }],
  },
]
