import type { DemoLanguage, DemoStep } from './discovery'

interface PlaygroundCopy {
  title: string
  intro: string
  choose: string
  modules: string[]
  simulation: string
  usb: DemoStep[]
  nfc: DemoStep[]
  drag: string
  transport: string
  phone: DemoStep[]
  domain: DemoStep[]
  wrong: string
  synced: string
  bound: string
  kind: string
  syncJourney: DemoStep[]
  boundJourney: DemoStep[]
  restart: string
}

export const playground: Record<DemoLanguage, PlaygroundCopy> = {
  de: {
    title: 'Passkey-Spielplatz',
    intro:
      'Steck einen Schlüssel ein, entsperre ein Handy oder prüfe eine Adresse. Alles ist simuliert und funktioniert ohne Zugangsdaten.',
    choose: 'Experiment wählen',
    modules: [
      'Sicherheitsschlüssel',
      'Handy entsperren',
      'Echte Domain finden',
      'Reise eines Passkeys',
    ],
    simulation: 'Simulation',
    drag: 'Ziehe den Schlüssel zum Laptop oder nutze die Schaltfläche.',
    transport: 'Verbindung',
    usb: [
      {
        title: 'Schlüssel einstecken',
        text: 'Mikas Passkey liegt auf dem Sicherheitsschlüssel. Verbinde ihn mit dem Laptop.',
        action: 'Schlüssel einstecken',
      },
      {
        title: 'Schlüssel erkannt',
        text: 'Für diesen Beispielschlüssel bestätigt Mika die Verwendung mit einer lokalen PIN und einer Berührung.',
        action: 'Verifikation simulieren',
      },
      {
        title: 'Anmeldung bestätigt',
        text: 'Der Schlüssel hat die Antwort signiert. Danach kann Mika ihn abziehen und sicher aufbewahren.',
      },
    ],
    nfc: [
      {
        title: 'Schlüssel ans Handy halten',
        text: 'Beide Geräte unterstützen NFC. Bringe den Schlüssel nahe an die Rückseite des Handys.',
        action: 'Schlüssel annähern',
      },
      {
        title: 'Schlüssel erkannt',
        text: 'NFC überträgt die Anfrage im Nahbereich. In diesem Beispiel bestätigt Mika die Verwendung des Schlüssels mit seiner PIN.',
        action: 'Verifikation simulieren',
      },
      {
        title: 'Anmeldung bestätigt',
        text: 'Der Sicherheitsschlüssel hat die Antwort signiert. Sein privater Schlüssel bleibt auf dem Schlüssel.',
      },
    ],
    phone: [
      {
        title: 'Eine Anmeldung starten',
        text: 'Auf dem Handy wählt Mika das gespeicherte Konto für das Atelier aus.',
        action: 'Anmeldung starten',
      },
      {
        title: 'Passkey freigeben',
        text: 'Das Handy prüft Mikas Fingerabdruck lokal. Hier genügt ein Klick für die Simulation.',
        action: 'Fingerabdruck simulieren',
      },
      {
        title: 'Das Atelier lässt Mika herein',
        text: 'Das Atelier erhält eine signierte Antwort. Mikas Fingerabdruck bleibt auf dem Handy. Auf unterstützten Geräten kann auch die Geräte-PIN den Passkey freigeben.',
      },
    ],
    domain: [
      {
        title: 'Welche Adresse gehört zum Atelier?',
        text: 'Mika hat einen Passkey für atelier.example. Wähle die Adresse, bei der dieser Passkey für die Anmeldung angeboten werden kann.',
      },
      {
        title: 'Genau, die Domain passt',
        text: 'Der Browser prüft die Bindung an den Dienst. Die andere Adresse gehört zu einer anderen Domain und kann den Atelier-Passkey nicht für ihre Anmeldung anfordern.',
      },
    ],
    wrong:
      'Schau auf den Teil vor «.example»: «atelier-help» ist eine andere Domain. Versuche es noch einmal.',
    kind: 'Speicherart',
    synced: 'Synchronisiert',
    bound: 'Gerätegebunden',
    syncJourney: [
      {
        title: 'Mika richtet einen Passkey ein',
        text: 'Ein synchronisierender Anbieter schützt Mikas Passkey für das Atelier.',
        action: 'Passkey erstellen',
      },
      {
        title: 'Der öffentliche Schlüssel ist registriert',
        text: 'Das Atelier kann damit später Mikas Signatur überprüfen.',
        action: 'Speicherort zeigen',
      },
      {
        title: 'Der Anbieter synchronisiert',
        text: 'Der Anbieter macht den Passkey auf weiteren unterstützten, berechtigten Geräten verfügbar. Die Voraussetzungen hängen vom Anbieter ab.',
        action: 'Anderes Gerät ausprobieren',
      },
      {
        title: 'Auch auf dem Laptop anmelden',
        text: 'Hier ist Mikas Anbieter auf dem Laptop eingerichtet und entsperrt. Mika kann denselben synchronisierten Passkey verwenden.',
      },
    ],
    boundJourney: [
      {
        title: 'Mika richtet einen Passkey ein',
        text: 'Mika wählt einen kompatiblen FIDO2-Sicherheitsschlüssel als Speicherort.',
        action: 'Passkey erstellen',
      },
      {
        title: 'Der öffentliche Schlüssel ist registriert',
        text: 'Das Atelier speichert den öffentlichen Schlüssel. Der private Schlüssel bleibt auf der Hardware.',
        action: 'Speicherort zeigen',
      },
      {
        title: 'Der Passkey bleibt auf dem Schlüssel',
        text: 'Der Laptop erhält keine Kopie. Für eine Anmeldung an einem anderen Gerät nimmt Mika den Schlüssel mit.',
        action: 'Anderes Gerät ausprobieren',
      },
      {
        title: 'Am Laptop mit demselben Schlüssel anmelden',
        text: 'Mika verbindet den Sicherheitsschlüssel mit dem kompatiblen Laptop. Ein separat registrierter Ersatzschlüssel hilft, falls das Original verloren geht.',
      },
    ],
    restart: 'Noch einmal',
  },
  en: {
    title: 'Passkey playground',
    intro:
      'Plug in a key, unlock a phone, or inspect an address. Every experiment is simulated and works without credentials.',
    choose: 'Choose an experiment',
    modules: ['Security key', 'Phone unlock', 'Find the genuine domain', 'Passkey journey'],
    simulation: 'Simulation',
    drag: 'Drag the key to the laptop or use the button.',
    transport: 'Connection',
    usb: [
      {
        title: 'Plug in the key',
        text: 'Mika’s passkey lives on the security key. Connect it to the laptop.',
        action: 'Insert the key',
      },
      {
        title: 'Security key detected',
        text: 'For this example key, Mika approves its use with a local PIN and a touch.',
        action: 'Simulate verification',
      },
      {
        title: 'Sign-in confirmed',
        text: 'The security key signed the response. Mika can unplug the key and put it away.',
      },
    ],
    nfc: [
      {
        title: 'Bring the key to the phone',
        text: 'Both devices support NFC. Bring the security key near the back of the phone.',
        action: 'Bring the key closer',
      },
      {
        title: 'Security key detected',
        text: 'NFC carries the request over a short distance. For this example key, Mika confirms its use with the key’s PIN.',
        action: 'Simulate verification',
      },
      {
        title: 'Sign-in confirmed',
        text: 'The security key signed the response. Its private key stays on the security key.',
      },
    ],
    phone: [
      {
        title: 'Start a sign-in',
        text: 'Mika selects the account saved for the studio on the phone.',
        action: 'Start sign-in',
      },
      {
        title: 'Unlock the passkey',
        text: 'The phone checks Mika’s fingerprint locally. In this simulation, just press the button.',
        action: 'Simulate fingerprint',
      },
      {
        title: 'The studio lets Mika in',
        text: 'The studio receives a signed response. Mika’s fingerprint stays on the phone. On supported devices the device PIN can also unlock the passkey.',
      },
    ],
    domain: [
      {
        title: 'Which address belongs to the studio?',
        text: 'Mika registered a passkey for atelier.example. Choose the address where that passkey can be offered for sign-in.',
      },
      {
        title: 'Exactly, the domain matches',
        text: 'The browser checks the credential’s binding to the service. The other address belongs to a different domain and cannot request the studio passkey for its sign-in.',
      },
    ],
    wrong: 'Look just before “.example”. “atelier-help” is a different domain. Try again.',
    kind: 'Storage type',
    synced: 'Synced',
    bound: 'Device-bound',
    syncJourney: [
      {
        title: 'Mika creates a passkey',
        text: 'A provider that supports syncing protects Mika’s passkey for the studio.',
        action: 'Create passkey',
      },
      {
        title: 'The public key is registered',
        text: 'The studio will use it later to verify Mika’s signature.',
        action: 'Show storage',
      },
      {
        title: 'The provider syncs the passkey',
        text: 'The provider makes the passkey available on other supported and authorised devices. The requirements depend on the provider.',
        action: 'Try another device',
      },
      {
        title: 'Sign in on the laptop too',
        text: 'Here Mika’s provider is set up and unlocked on the laptop. Mika can use the same synced passkey.',
      },
    ],
    boundJourney: [
      {
        title: 'Mika creates a passkey',
        text: 'Mika chooses a compatible FIDO2 security key for storage.',
        action: 'Create passkey',
      },
      {
        title: 'The public key is registered',
        text: 'The studio stores the public key. The private key stays on the hardware.',
        action: 'Show storage',
      },
      {
        title: 'The passkey stays on the key',
        text: 'The laptop receives no copy. To sign in on another device, Mika takes the key along.',
        action: 'Try another device',
      },
      {
        title: 'Use the same key on the laptop',
        text: 'Mika connects the security key to the compatible laptop. A separately registered spare key can help if the original goes missing.',
      },
    ],
    restart: 'Try again',
  },
}
