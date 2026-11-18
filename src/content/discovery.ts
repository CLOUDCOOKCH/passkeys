export type DemoLanguage = 'de' | 'en'

export interface DemoStep {
  title: string
  text: string
  action?: string
}
export interface DemoFlow {
  title: string
  steps: DemoStep[]
}

interface DiscoveryCopy {
  compareTitle: string
  compareIntro: string
  simulation: string
  next: string
  back: string
  replay: string
  step: string
  password: DemoFlow
  passkey: DemoFlow
  howTitle: string
  howIntro: string
  howSteps: DemoStep[]
  techTitle: string
  tech: string[]
  source: string
  device: string
  service: string
  pair: string
  registration: string
  signIn: string
  publicKey: string
  privateKey: string
  challenge: string
  signature: string
  confirmed: string
}

export const discovery: Record<DemoLanguage, DiscoveryCopy> = {
  de: {
    compareTitle: 'Zwei Wege zur Anmeldung',
    compareIntro:
      'Mika möchte ins Online-Atelier. Melde das fiktive Konto einmal mit Passwort und einmal mit Passkey an. Wie viele Schritte ein Passwort braucht, hängt von der Website ab.',
    simulation: 'Simulation',
    next: 'Weiter',
    back: 'Zurück',
    replay: 'Noch einmal',
    step: 'Schritt',
    password: {
      title: 'Mit Passwort',
      steps: [
        {
          title: 'Konto angeben',
          text: 'Das Atelier fragt zuerst, wem das Konto gehört. Verwende für diesen Versuch Mikas Namen.',
          action: 'Benutzernamen einsetzen',
        },
        {
          title: 'Passwort eingeben',
          text: 'Jetzt fragt das Atelier nach dem Passwort. Für die Simulation ist schon eines vorbereitet.',
          action: 'Beispielpasswort einsetzen',
        },
        {
          title: 'Zweiten Faktor bestätigen',
          text: 'Beim Atelier gehört ein Einmalcode zur Anmeldung. Bestätige den vorbereiteten Code.',
          action: 'Beispielcode bestätigen',
        },
        {
          title: 'Angemeldet',
          text: 'Das Atelier hat Passwort und Code geprüft. Auf einer nachgebauten Website hätte Mika beides versehentlich an Betrüger weitergeben können.',
        },
      ],
    },
    passkey: {
      title: 'Mit Passkey',
      steps: [
        {
          title: 'Konto auswählen',
          text: 'Mikas Gerät zeigt den Passkey für das Atelier an.',
          action: 'Mikas Konto auswählen',
        },
        {
          title: 'Lokal bestätigen',
          text: 'Mika bestätigt die Anmeldung mit dem Fingerabdruck. Je nach Gerät geht das auch mit Gesichtserkennung oder Geräte-PIN.',
          action: 'Bestätigung simulieren',
        },
        {
          title: 'Angemeldet',
          text: 'Das Atelier hat die digitale Signatur geprüft. Selbst wenn eine fremde Website genauso aussieht, bietet der Browser ihr Mikas Atelier-Passkey nicht an.',
        },
      ],
    },
    howTitle: 'Was beim Anmelden passiert',
    howIntro:
      'Was speichert das Atelier? Und was behält Mika? Folge den beiden Schlüsseln von der Einrichtung bis zur nächsten Anmeldung.',
    howSteps: [
      {
        title: 'Ein Schlüsselpaar entsteht',
        text: 'Mikas Gerät erzeugt für das Atelier zwei Schlüssel. Der private Schlüssel signiert, der öffentliche Schlüssel prüft die Signatur.',
      },
      {
        title: 'Das Atelier erhält den öffentlichen Schlüssel',
        text: 'Das Gerät schickt den öffentlichen Schlüssel zum Atelier. Die Website speichert ihn mit einer Kennung bei Mikas Konto.',
      },
      {
        title: 'Der private Schlüssel bleibt geschützt',
        text: 'Das Atelier erhält ihn nie. Je nach Passkey bleibt er auf einem Gerät oder wird vom Anbieter geschützt auf Mikas weitere Geräte übertragen.',
      },
      {
        title: 'Das Atelier schickt eine neue Aufgabe',
        text: 'Als Mika wiederkommt, erzeugt das Atelier einen Zufallswert. Diese «Challenge» gilt nur für die aktuelle Anmeldung.',
      },
      {
        title: 'Das Gerät signiert die Antwort',
        text: 'Mika bestätigt per Fingerabdruck. Das Gerät signiert die Antwort auf die Challenge mit dem privaten Schlüssel. Der Fingerabdruck bleibt auf dem Gerät.',
      },
      {
        title: 'Das Atelier prüft die Signatur',
        text: 'Das Atelier prüft die Signatur mit dem gespeicherten öffentlichen Schlüssel. Es prüft auch, ob die Antwort zur Website und zur aktuellen Challenge gehört. Dann ist Mika angemeldet.',
      },
    ],
    techTitle: 'Technische Details zu WebAuthn und FIDO2',
    tech: [
      'WebAuthn ist die Browser-Schnittstelle für Public-Key-Anmeldedaten. Der Browser prüft, ob der aufrufende Ursprung die angegebene Relying Party ID (RP ID) nutzen darf. CTAP verbindet eine Plattform mit einem externen Authentifikator, etwa einem FIDO2-Sicherheitsschlüssel.',
      'Bei der Registrierung speichert die Relying Party die Credential-ID und den öffentlichen Schlüssel. Bei der Anmeldung signiert der Authentifikator die Authentifikatordaten und den Hash der Clientdaten. Die Clientdaten enthalten unter anderem Challenge, Vorgangstyp und Origin.',
      'Der Dienst prüft unter anderem Signatur, Challenge, erwarteten Origin, RP-ID-Hash und die erforderlichen Flags für Anwesenheit und Benutzerverifikation. Eine frühere Antwort passt nicht zu einer neuen Challenge.',
    ],
    source: 'WebAuthn beim W3C',
    device: 'Gerät',
    service: 'Atelier',
    pair: 'Schlüsselpaar',
    registration: 'Einrichten',
    signIn: 'Anmelden',
    publicKey: 'Öffentlicher Schlüssel',
    privateKey: 'Privater Schlüssel',
    challenge: 'Challenge',
    signature: 'Signatur',
    confirmed: 'Bestätigt',
  },
  en: {
    compareTitle: 'Two ways to sign in',
    compareIntro:
      'Mika wants to sign in to an online studio. Try a password, then try a passkey, using the same fictional account. Password flows vary by website.',
    simulation: 'Simulation',
    next: 'Next',
    back: 'Back',
    replay: 'Try again',
    step: 'Step',
    password: {
      title: 'With a password',
      steps: [
        {
          title: 'Enter a username',
          text: 'First the studio needs to know whose account to open. Use Mika’s name for this example.',
          action: 'Use example username',
        },
        {
          title: 'Enter a password',
          text: 'Next the studio asks for a password. An example is ready to use.',
          action: 'Use example password',
        },
        {
          title: 'Confirm a second factor',
          text: 'This studio uses a one-time code as a second check. Confirm the sample code to finish.',
          action: 'Confirm example code',
        },
        {
          title: 'Signed in',
          text: 'The studio checked the password and code. On a copycat site, Mika could have handed both to someone else.',
        },
      ],
    },
    passkey: {
      title: 'With a passkey',
      steps: [
        {
          title: 'Choose an account',
          text: 'Mika’s device offers the passkey saved for the studio.',
          action: 'Choose Mika’s account',
        },
        {
          title: 'Confirm locally',
          text: 'Mika uses a fingerprint to approve this sign-in. Depending on the device, face recognition or a device PIN can do the same job.',
          action: 'Simulate confirmation',
        },
        {
          title: 'Signed in',
          text: 'The studio verified a digital signature. Even if another website looks identical, the browser won’t offer it Mika’s studio passkey.',
        },
      ],
    },
    howTitle: 'What happens when you sign in',
    howIntro:
      'What does the studio store? What stays with Mika? Follow the two keys from setup to the next sign-in.',
    howSteps: [
      {
        title: 'A key pair is created',
        text: 'Mika’s device creates two keys for the studio. The private key signs a response. The public key checks its signature.',
      },
      {
        title: 'The studio gets the public key',
        text: 'The device sends the public key to the studio. The website saves it alongside an identifier for Mika’s account.',
      },
      {
        title: 'The private key stays protected',
        text: 'The studio never receives this key. Depending on the passkey, it stays on one device or the provider securely syncs it to Mika’s other devices.',
      },
      {
        title: 'The website issues a challenge',
        text: 'When Mika returns, the studio generates a random value. This “challenge” belongs to this sign-in alone.',
      },
      {
        title: 'The device signs the response',
        text: 'Mika confirms with a fingerprint. The device uses the private key to sign a response to the challenge. The fingerprint stays on the device.',
      },
      {
        title: 'The studio checks the signature',
        text: 'The studio checks the signature with its saved public key. It also verifies that the response belongs to this website and this challenge. Mika is signed in.',
      },
    ],
    techTitle: 'WebAuthn and FIDO2 technical details',
    tech: [
      'WebAuthn is the browser interface for public-key credentials. The browser checks whether the calling origin may use the specified relying party ID (RP ID). CTAP connects a platform to an external authenticator, such as a FIDO2 security key.',
      'At registration the relying party stores the credential ID and public key. At sign-in the authenticator signs the authenticator data and the hash of the client data. The client data includes the challenge, operation type, and origin.',
      'The service checks the signature, challenge, expected origin, RP ID hash, and required user presence and user verification flags, among other checks. An earlier response cannot satisfy a fresh challenge.',
    ],
    source: 'WebAuthn at the W3C',
    device: 'Device',
    service: 'Studio',
    pair: 'Key pair',
    registration: 'Setup',
    signIn: 'Sign-in',
    publicKey: 'Public key',
    privateKey: 'Private key',
    challenge: 'Challenge',
    signature: 'Signature',
    confirmed: 'Verified',
  },
}
