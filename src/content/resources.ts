export type Lang = 'de' | 'en'
type Text = Record<Lang, string>
export function words(de: string, en: string): Text {
  return { de, en }
}

interface Entry {
  id: string
  title: Text
  body: Text
}
export const recovery: Entry[] = [
  {
    id: 'lost-phone',
    title: words('Mein Handy ist weg. Was jetzt?', 'I lost my phone. What now?'),
    body: words(
      'Sperre das verlorene Gerät über den Geräteanbieter. Bei synchronisierten Passkeys kannst du dich mit einem anderen freigegebenen Gerät desselben Anbieters anmelden. Lag dein einziger Passkey auf dem verlorenen Gerät, brauchst du einen zweiten Anmeldeweg oder die Kontowiederherstellung des Dienstes. Prüfe danach Geräte, Passkeys und aktive Sitzungen.',
      'Use the device provider’s lost-device controls to lock your phone. A synced passkey may still be available on another approved device from the same provider. If your only passkey was bound to that phone, use a backup sign-in method or the service’s account recovery process. Then review your devices, passkeys, and active sessions.',
    ),
  },
  {
    id: 'new-laptop',
    title: words('Ich habe einen neuen Laptop.', 'I have a new laptop.'),
    body: words(
      'Richte deinen Passkey-Anbieter auf dem neuen Gerät ein. Ein synchronisierter Passkey kann nach der Freigabe erscheinen. Ein gerätegebundener Passkey bleibt am alten Gerät. Melde dich damit oder mit einem Ersatzschlüssel an und registriere den neuen Laptop, bevor du den alten zurücksetzt.',
      'Set up your passkey provider on the new device. Synced passkeys may appear once you approve it. A device-bound passkey stays on the old device. Use it or a backup key to sign in and register the laptop before erasing the old one.',
    ),
  },
  {
    id: 'broken-key',
    title: words('Mein Sicherheitsschlüssel ist kaputt.', 'My security key broke.'),
    body: words(
      'Ein gerätegebundener Passkey lässt sich nicht aus dem defekten Schlüssel kopieren. Nutze einen bereits registrierten Ersatzschlüssel oder die Wiederherstellung des Dienstes. Registriere einen neuen Schlüssel, teste ihn und entferne erst dann den defekten aus dem Konto.',
      'A device-bound passkey cannot be copied from the broken key. Use a previously registered spare or the service’s recovery process. Register and test a replacement, then remove the broken key from the account.',
    ),
  },
  {
    id: 'mixed-devices',
    title: words('Ich nutze Windows und ein iPhone.', 'I use Windows and an iPhone.'),
    body: words(
      'Prüfe, ob dein Anbieter auf beiden Plattformen funktioniert. Bei unterstützten Diensten kannst du dich am Laptop mit dem nahen iPhone per QR-Code und Bluetooth anmelden. Dabei bleibt der Passkey auf dem Telefon. Ein registrierter Sicherheitsschlüssel ist eine weitere Möglichkeit.',
      'Check whether your provider works on both platforms. Supported services can let you use a nearby iPhone to sign in on your laptop using a QR code and Bluetooth. The passkey stays on the phone. A registered security key is another option.',
    ),
  },
  {
    id: 'provider-unavailable',
    title: words(
      'Mein Passwortmanager ist nicht erreichbar.',
      'My password manager is unavailable.',
    ),
    body: words(
      'Prüfe zuerst, ob ein bereits freigegebenes Gerät den Tresor lokal öffnen kann. Der Offline-Zugriff hängt vom Anbieter ab. Falls das nicht klappt, nutze einen separat registrierten Passkey oder die Wiederherstellung des Dienstes. Bewahre Wiederherstellungscodes getrennt vom Tresor auf.',
      'Check whether an approved device can still unlock a local vault. Offline access depends on the provider. Otherwise use a separately registered passkey or the service’s recovery process. Keep recovery codes somewhere independent of the vault.',
    ),
  },
  {
    id: 'stolen',
    title: words('Kann jemand meinen Passkey stehlen?', 'Could someone steal my passkey?'),
    body: words(
      'Beim Anmelden erhält die Website eine Signatur. Sie bekommt den privaten Schlüssel nicht. Ein entsperrtes oder kompromittiertes Gerät, ein übernommenes Anbieterkonto oder eine gestohlene Sitzung bleiben Risiken. Schütze Gerätesperre, Updates und Wiederherstellungswege.',
      'During sign-in, the website receives a signature. It never receives the private key. An unlocked or compromised device, a compromised provider account, or a stolen session can still put you at risk. Protect your screen lock and recovery methods, and keep devices updated.',
    ),
  },
  {
    id: 'no-fingerprint',
    title: words('Geht das auch ohne meinen Fingerabdruck?', 'Can it work without my fingerprint?'),
    body: words(
      'Je nach Gerät bestätigt auch eine lokale PIN deine Identität. Die Website erfährt das Ergebnis der Prüfung, nicht deine PIN oder deinen Fingerabdruck. Wer dein Gerät und die PIN kennt, könnte sich damit anmelden.',
      'Depending on the device, a local PIN can also verify you. The website gets the verification result, never your PIN or fingerprint. Someone who has both your device and its PIN could be able to sign in.',
    ),
  },
  {
    id: 'multiple',
    title: words(
      'Kann ich mehrere Passkeys registrieren?',
      'Can I register more than one passkey?',
    ),
    body: words(
      'Viele Dienste erlauben mehrere Passkeys pro Konto. Registriere zum Beispiel deinen Passwortmanager und einen separaten Sicherheitsschlüssel. Benenne beide verständlich und teste jeden einzeln. Die Optionen hängen vom Dienst ab.',
      'Many services let you register multiple passkeys for one account. You might register a password manager and a separate security key. Give each a clear name and test them individually. Available options depend on the service.',
    ),
  },
  {
    id: 'unhackable',
    title: words('Sind Passkeys unknackbar?', 'Are passkeys unhackable?'),
    body: words(
      'Passkeys schützen gezielt vor dem Abfischen von Anmeldedaten. Sie lösen andere Probleme nicht automatisch. Schwache Ersatzmethoden, Schadsoftware oder eine bereits offene Sitzung können weiterhin den Zugriff auf dein Konto ermöglichen.',
      'Passkeys resist credential phishing. They do not solve every account security problem. Weak fallback methods, malware, or an already open session can still give someone access to an account.',
    ),
  },
]

export const roadmap = [
  [
    words('Vorbereiten', 'Prepare'),
    words(
      'Wähle geeignete Dienste und Geräte aus. Lege fest, wie Mitarbeitende Ersatz erhalten und wer bei einer Kontosperre hilft.',
      'Identify compatible services and devices. Define who supplies replacements and who can help if an employee is locked out.',
    ),
  ],
  [
    words('Pilotieren', 'Run a pilot'),
    words(
      'Teste mit einer kleinen Gruppe typische Arbeitstage, gemeinsam genutzte Geräte und den Zugriff von unterwegs.',
      'Have a small group test ordinary workdays, shared devices, and sign-ins away from the office.',
    ),
  ],
  [
    words('Wiederherstellung üben', 'Rehearse recovery'),
    words(
      'Spiele den Verlust eines Geräts durch. Prüfe Identität, Ersatzregistrierung, Sperrung und den Zugang für Notfälle.',
      'Rehearse losing a device. Test identity checks, replacement registration, revocation, and emergency access.',
    ),
  ],
  [
    words('Schrittweise ausrollen', 'Expand in stages'),
    words(
      'Schule den Support, kommuniziere verständlich und nimm weitere Teams erst nach einem erfolgreichen Pilotversuch auf.',
      'Train support staff, explain the change in plain language, and bring in more teams after a successful pilot.',
    ),
  ],
  [
    words('Auswerten', 'Review adoption'),
    words(
      'Beobachte Anmeldeerfolg, Nutzung und Supportfälle. Reduziere schwächere Methoden erst, wenn der Ersatz zuverlässig funktioniert.',
      'Review sign-in success, adoption, and support cases. Retire weaker methods once the replacement works reliably.',
    ),
  ],
] as const

export const faq: Entry[] = [
  {
    id: 'passkey-password',
    title: words('Muss ich mir einen Passkey merken?', 'Do I have to remember my passkey?'),
    body: words(
      'Nein. Dein Gerät oder Anbieter verwaltet den Passkey. Zum Freigeben nutzt du zum Beispiel deine Gerätesperre. Merke dir die Geräte-PIN und sichere den Zugang zu deinem Anbieterkonto.',
      'No. Your device or provider manages the passkey. You approve its use with a local unlock method. Keep track of your device PIN and how to recover your provider account.',
    ),
  },
  {
    id: 'biometrics',
    title: words(
      'Erhält die Website meine biometrischen Daten?',
      'Does the website receive my biometrics?',
    ),
    body: words(
      'Die Prüfung erfolgt lokal. Die Website erhält einen kryptografischen Nachweis über die Anmeldung. Dein Gesicht, Fingerabdruck und deine Geräte-PIN werden dabei nicht an die Website übertragen.',
      'Verification happens locally. The website receives cryptographic evidence of the sign-in. Your face, fingerprint, and device PIN are not sent to the website during that process.',
    ),
  },
  {
    id: 'all-sites',
    title: words(
      'Funktionieren Passkeys auf jeder Website?',
      'Can I use a passkey on every website?',
    ),
    body: words(
      'Der Dienst muss Passkeys unterstützen. Schau im Bereich Kontosicherheit nach. Welche Optionen erscheinen, hängt auch von Betriebssystem, Browser, Anbieter und bei der Arbeit von der Richtlinie deiner Organisation ab.',
      'The service needs to support passkeys. Check its account security settings. Options also depend on your operating system, browser, provider, and at work, your organisation’s policy.',
    ),
  },
  {
    id: 'extra-factor',
    title: words(
      'Ist ein Sicherheitsschlüssel immer ein Passkey?',
      'Is a security key always a passkey?',
    ),
    body: words(
      'Ein Sicherheitsschlüssel ist ein Gerät. Ein Dienst kann es nach dem Passwort als weiteren Faktor anfordern. Ein geeigneter FIDO2-Schlüssel kann auch gerätegebundene Passkeys speichern und eine Anmeldung ohne Passwort ermöglichen.',
      'A security key is a device. A service might ask for it as another factor after a password. A compatible FIDO2 key can also store device-bound passkeys and enable passwordless sign-in.',
    ),
  },
  {
    id: 'windows-hello',
    title: words('Was hat Windows Hello damit zu tun?', 'How does Windows Hello fit in?'),
    body: words(
      'Windows Hello kann auf einem kompatiblen Windows-Gerät die lokale Freigabe per Gesicht, Fingerabdruck oder PIN übernehmen. WebAuthn beschreibt, wie Browser und Website die Passkey-Anmeldung abwickeln. Die verfügbaren Speicherorte hängen von deinem Setup ab.',
      'Windows Hello can handle local approval with a face, fingerprint, or PIN on a compatible Windows device. WebAuthn defines how browsers and websites handle the passkey exchange. Your setup determines which storage options are available.',
    ),
  },
]
export const glossary: [Text, Text][] = [
  [
    words('Passkey', 'Passkey'),
    words(
      'Ein Anmeldenachweis für einen bestimmten Dienst, der ein kryptografisches Schlüsselpaar nutzt.',
      'A sign-in credential for a particular service that uses a cryptographic key pair.',
    ),
  ],
  [
    words('FIDO2', 'FIDO2'),
    words(
      'Das Zusammenspiel von WebAuthn und CTAP für die Anmeldung mit öffentlichen Schlüsseln.',
      'The combination of WebAuthn and CTAP for public-key authentication.',
    ),
  ],
  [
    words('WebAuthn', 'WebAuthn'),
    words(
      'Der Webstandard, mit dem Websites über den Browser Anmeldenachweise erstellen und verwenden.',
      'The web standard that lets sites create and use public-key credentials through the browser.',
    ),
  ],
  [
    words('CTAP', 'CTAP'),
    words(
      'Das Protokoll, über das ein Client mit einem externen Authentifikator wie einem USB-Schlüssel kommuniziert.',
      'The protocol a client uses to communicate with an external authenticator such as a USB security key.',
    ),
  ],
  [
    words('Öffentlicher Schlüssel', 'Public key'),
    words(
      'Der beim Dienst gespeicherte Schlüssel, mit dem die Website eine Signatur prüft.',
      'The key registered with the service that the website uses to verify a signature.',
    ),
  ],
  [
    words('Privater Schlüssel', 'Private key'),
    words(
      'Der geschützte Teil des Schlüsselpaars, mit dem der Authentifikator eine Anfrage signiert.',
      'The protected half of the key pair that the authenticator uses to sign a challenge.',
    ),
  ],
  [
    words('Authentifikator', 'Authenticator'),
    words(
      'Die Hardware oder Software, die den Nachweis erzeugt und die Anmeldung bestätigt.',
      'The hardware or software that creates the credential and signs the authentication challenge.',
    ),
  ],
  [
    words('Synchronisierter Passkey', 'Synced passkey'),
    words(
      'Ein Passkey, den ein Anbieter geschützt auf weiteren freigegebenen Geräten verfügbar machen kann.',
      'A passkey a provider can securely make available on other approved devices.',
    ),
  ],
  [
    words('Gerätegebundener Passkey', 'Device-bound passkey'),
    words(
      'Ein Passkey, dessen privater Schlüssel an einen einzelnen Authentifikator gebunden bleibt.',
      'A passkey whose private key remains bound to one authenticator.',
    ),
  ],
  [
    words('Phishing-Resistenz', 'Phishing resistance'),
    words(
      'Die Bindung an den legitimen Dienst hindert eine fremde Website daran, dessen Passkey für ihre eigene Domain zu verwenden.',
      'Binding a credential to the legitimate service prevents an unrelated website from using that passkey for its own domain.',
    ),
  ],
]

export const references = [
  ['FIDO Alliance', 'https://fidoalliance.org/passkeys/'],
  ['Apple', 'https://support.apple.com/en-us/109016'],
  ['Google', 'https://support.google.com/chrome/answer/13168025'],
  ['Proton Pass', 'https://proton.me/support/pass-use-passkeys/'],
  ['Bitwarden', 'https://bitwarden.com/help/storing-passkeys/'],
  ['1Password', 'https://support.1password.com/save-use-passkeys/'],
  [
    'Microsoft Entra',
    'https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-passkeys-fido2',
  ],
] as const
