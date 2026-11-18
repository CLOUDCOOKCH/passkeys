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
      'Probier beide Wege mit dem erfundenen Konto von Mika aus. Die Schritte beim Anmelden mit Passwort können je nach Website variieren.',
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
          text: 'Mika öffnet das Atelier und gibt den Benutzernamen ein.',
          action: 'Benutzernamen einsetzen',
        },
        {
          title: 'Passwort eingeben',
          text: 'Mika füllt das Passwortfeld mit einem Beispielpasswort aus.',
          action: 'Beispielpasswort einsetzen',
        },
        {
          title: 'Zweiten Faktor bestätigen',
          text: 'Dieses Atelier verlangt zusätzlich einen Einmalcode. Mika übernimmt den Beispielcode.',
          action: 'Beispielcode bestätigen',
        },
        {
          title: 'Angemeldet',
          text: 'Das Passwort ist ein geteiltes Geheimnis. Auf einer täuschend ähnlichen Website könnte Mika es versehentlich weitergeben.',
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
          text: 'Mika gibt den Passkey per Fingerabdruck, Gesicht oder Geräte-PIN zur Verwendung frei.',
          action: 'Bestätigung simulieren',
        },
        {
          title: 'Angemeldet',
          text: 'Das Atelier prüft eine digitale Signatur. Der Passkey ist an den Dienst gebunden. Eine fremde Domain kann ihn nicht für sich verwenden.',
        },
      ],
    },
    howTitle: 'Was beim Anmelden passiert',
    howIntro:
      'Begleite einen Passkey von der Erstellung bis zur ersten Anmeldung. Achte darauf, was zwischen Gerät und Website ausgetauscht wird.',
    howSteps: [
      {
        title: 'Ein Schlüsselpaar entsteht',
        text: 'Für Mikas Konto beim Atelier erzeugt der Authentifikator zwei zusammengehörige Schlüssel.',
      },
      {
        title: 'Das Atelier erhält den öffentlichen Schlüssel',
        text: 'Die Website speichert ihn zusammen mit einer Kennung. Damit kann sie später die Signatur prüfen.',
      },
      {
        title: 'Der private Schlüssel bleibt geschützt',
        text: 'Er wird nie an die Website geschickt. Je nach Anbieter bleibt er auf einem Gerät oder wird geschützt synchronisiert.',
      },
      {
        title: 'Die Website stellt eine Aufgabe',
        text: 'Bei der Anmeldung sendet das Atelier eine frische, zufällige Zeichenfolge. Diese Challenge gilt nur für diesen Vorgang.',
      },
      {
        title: 'Das Gerät signiert die Antwort',
        text: 'Mika bestätigt lokal. Der Authentifikator verwendet den privaten Schlüssel, um eine Antwort auf die Challenge zu signieren. Biometrische Daten bleiben auf dem Gerät.',
      },
      {
        title: 'Das Atelier prüft die Signatur',
        text: 'Die Website prüft mit dem öffentlichen Schlüssel die Antwort und kontrolliert unter anderem die Challenge und die Herkunft. Stimmen die Prüfungen, ist Mika angemeldet.',
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
    publicKey: 'Öffentlicher Schlüssel',
    privateKey: 'Privater Schlüssel',
    challenge: 'Challenge',
    signature: 'Signatur',
    confirmed: 'Bestätigt',
  },
  en: {
    compareTitle: 'Two ways to sign in',
    compareIntro:
      'Try both paths with Mika’s fictional account. Password sign-in steps vary between websites.',
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
          text: 'Mika opens the studio website and enters a username.',
          action: 'Use example username',
        },
        {
          title: 'Enter a password',
          text: 'Mika fills in the password field with an example password.',
          action: 'Use example password',
        },
        {
          title: 'Confirm a second factor',
          text: 'This studio also asks for a one-time code. Mika enters the example code.',
          action: 'Confirm example code',
        },
        {
          title: 'Signed in',
          text: 'A password is a shared secret. Mika could accidentally give it to someone on a lookalike website.',
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
          text: 'Mika approves the use of the passkey with a fingerprint, face recognition, or the device PIN.',
          action: 'Simulate confirmation',
        },
        {
          title: 'Signed in',
          text: 'The studio verifies a digital signature. The passkey is bound to the service, so an unrelated domain cannot use it for itself.',
        },
      ],
    },
    howTitle: 'What happens when you sign in',
    howIntro:
      'Follow a passkey from creation to the first sign-in. Watch what travels between the device and the website.',
    howSteps: [
      {
        title: 'A key pair is created',
        text: 'The authenticator generates two matching keys for Mika’s account at the studio.',
      },
      {
        title: 'The studio gets the public key',
        text: 'The website stores it alongside an identifier. It will use the public key later to check a signature.',
      },
      {
        title: 'The private key stays protected',
        text: 'It is never sent to the website. Depending on the provider, it stays on one device or syncs securely.',
      },
      {
        title: 'The website issues a challenge',
        text: 'At sign-in the studio sends a fresh, random value. This challenge belongs to this request alone.',
      },
      {
        title: 'The device signs the response',
        text: 'Mika confirms locally. The authenticator uses the private key to sign a response to the challenge. Biometric data stays on the device.',
      },
      {
        title: 'The studio checks the signature',
        text: 'The website uses the public key to check the response. It also checks details including the challenge and origin. Once the checks pass, Mika is signed in.',
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
    publicKey: 'Public key',
    privateKey: 'Private key',
    challenge: 'Challenge',
    signature: 'Signature',
    confirmed: 'Verified',
  },
}
