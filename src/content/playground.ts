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
      'Steck Mikas Sicherheitsschlüssel ein, prüfe eine Webadresse oder probiere einen Gerätewechsel aus. Jede Station ist eine Simulation mit einem fiktiven Konto.',
    choose: 'Experiment wählen',
    modules: [
      'Sicherheitsschlüssel',
      'Handy entsperren',
      'Echte Domain finden',
      'Reise eines Passkeys',
    ],
    simulation: 'Simulation',
    drag: 'Zieh den Schlüssel zum Laptop oder tippe auf «Schlüssel einstecken».',
    transport: 'Verbindung',
    usb: [
      {
        title: 'Schlüssel einstecken',
        text: 'Mikas Passkey liegt auf dem Sicherheitsschlüssel. Verbinde ihn mit dem Laptop.',
        action: 'Schlüssel einstecken',
      },
      {
        title: 'Schlüssel erkannt',
        text: 'Mika gibt die PIN des Schlüssels ein und berührt das Kontaktfeld. So bestätigt Mika die Anmeldung.',
        action: 'Verifikation simulieren',
      },
      {
        title: 'Anmeldung bestätigt',
        text: 'Das Atelier hat die Signatur geprüft. Mika kann den Schlüssel jetzt abziehen. Der Passkey bleibt darauf gespeichert.',
      },
    ],
    nfc: [
      {
        title: 'Schlüssel ans Handy halten',
        text: 'Mikas Handy und der Schlüssel unterstützen NFC. Für diese Funkverbindung müssen sie ganz nah beieinander sein.',
        action: 'Schlüssel annähern',
      },
      {
        title: 'Schlüssel erkannt',
        text: 'Das Handy hat den Schlüssel über NFC gefunden. Jetzt bestätigt Mika die Anmeldung mit der PIN des Schlüssels.',
        action: 'Verifikation simulieren',
      },
      {
        title: 'Anmeldung bestätigt',
        text: 'Das Handy hat die signierte Antwort erhalten. Der private Teil des Passkeys bleibt auf dem Sicherheitsschlüssel.',
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
        text: 'Das Handy prüft Mikas Fingerabdruck lokal. Tippe unten, um diese Bestätigung nachzuspielen.',
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
        text: 'Mika hat den Passkey bei atelier.example eingerichtet. Bei welcher der beiden Adressen kann der Browser ihn anbieten?',
      },
      {
        title: 'Genau, die Domain passt',
        text: 'atelier.example ist die registrierte Domain. Bei atelier-help.example bietet der Browser Mikas Atelier-Passkey nicht an, selbst wenn die Seite vertraut aussieht.',
      },
    ],
    wrong:
      'Achte auf «-help» in der Adresse. Damit landest du bei einem anderen Dienst. Probier die andere Adresse.',
    kind: 'Speicherart',
    synced: 'Synchronisiert',
    bound: 'Gerätegebunden',
    syncJourney: [
      {
        title: 'Mika richtet einen Passkey ein',
        text: 'Mika speichert den Atelier-Passkey in einem Passwortmanager, der mehrere Geräte unterstützt.',
        action: 'Passkey erstellen',
      },
      {
        title: 'Der öffentliche Schlüssel ist registriert',
        text: 'Das Atelier kann damit später Mikas Signatur überprüfen.',
        action: 'Speicherort zeigen',
      },
      {
        title: 'Der Anbieter synchronisiert',
        text: 'Mikas Passwortmanager synchronisiert den Passkey mit dem Laptop. Welche Geräte man hinzufügen kann und wie man sie bestätigt, hängt vom Anbieter ab.',
        action: 'Anderes Gerät ausprobieren',
      },
      {
        title: 'Auch auf dem Laptop anmelden',
        text: 'Mika entsperrt den Passwortmanager auf dem Laptop. Der Atelier-Passkey ist schon da und kann die Anmeldung bestätigen.',
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
        text: 'Der private Schlüssel bleibt in der Hardware. Wenn Mika den Laptop wechselt, reist der Sicherheitsschlüssel mit.',
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
      'Plug in Mika’s security key, check a web address, or try switching devices. Each experiment is a simulation with a fictional account.',
    choose: 'Choose an experiment',
    modules: ['Security key', 'Phone unlock', 'Find the genuine domain', 'Passkey journey'],
    simulation: 'Simulation',
    drag: 'Drag the key to the laptop or choose “Insert the key”.',
    transport: 'Connection',
    usb: [
      {
        title: 'Plug in the key',
        text: 'Mika’s passkey lives on the security key. Connect it to the laptop.',
        action: 'Insert the key',
      },
      {
        title: 'Security key detected',
        text: 'Mika enters the key’s PIN and touches the contact on its surface to approve the sign-in.',
        action: 'Simulate verification',
      },
      {
        title: 'Sign-in confirmed',
        text: 'The studio verified the signature. Mika can unplug the security key now. The passkey stays on it.',
      },
    ],
    nfc: [
      {
        title: 'Bring the key to the phone',
        text: 'Mika’s phone and key support NFC. This short-range radio connection works when the devices are close together.',
        action: 'Bring the key closer',
      },
      {
        title: 'Security key detected',
        text: 'The phone found the key over NFC. Now Mika enters the key’s PIN to approve the sign-in.',
        action: 'Simulate verification',
      },
      {
        title: 'Sign-in confirmed',
        text: 'The phone received a signed response. The private part of the passkey stays on the security key.',
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
        text: 'Mika created a passkey at atelier.example. At which of these addresses can the browser offer that passkey?',
      },
      {
        title: 'Exactly, the domain matches',
        text: 'atelier.example is the registered domain. At atelier-help.example, the browser won’t offer Mika’s studio passkey, even if the page looks familiar.',
      },
    ],
    wrong: 'Notice “-help” in the address. That takes you to a different service. Try the other address.',
    kind: 'Storage type',
    synced: 'Synced',
    bound: 'Device-bound',
    syncJourney: [
      {
        title: 'Mika creates a passkey',
        text: 'Mika saves the studio passkey in a password manager that works across devices.',
        action: 'Create passkey',
      },
      {
        title: 'The public key is registered',
        text: 'The studio will use it later to verify Mika’s signature.',
        action: 'Show storage',
      },
      {
        title: 'The provider syncs the passkey',
        text: 'Mika’s password manager syncs the passkey to the laptop. Each provider has its own requirements for adding and authorising a new device.',
        action: 'Try another device',
      },
      {
        title: 'Sign in on the laptop too',
        text: 'Mika unlocks the password manager on the laptop. The studio passkey is already there, ready to approve the sign-in.',
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
