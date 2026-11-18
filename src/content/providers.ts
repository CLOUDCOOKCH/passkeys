import type { Recommendation } from '../lib/recommend'

export type Language = 'de' | 'en'
type Copy = Record<Language, string>
const t = (de: string, en: string): Copy => ({ de, en })
export type ProviderId =
  'apple' | 'google' | 'windows' | 'proton' | 'bitwarden' | '1password' | 'hardware'
export type Category = 'platform' | 'manager' | 'hardware'

interface Provider {
  id: ProviderId
  name: Copy
  category: Category
  overview: Copy
  tradeoff: Copy
  prepare: Copy
  save: Copy
  troubleshoot: Copy
  url: string
  /** Editorial review of the guidance, not a vendor release or support-page date. */
  lastReviewed: string
}

const reviewed = '2026-11-18'
export const githubGuide =
  'https://docs.github.com/en/authentication/authenticating-with-a-passkey/managing-your-passkeys'

export const providers: Provider[] = [
  {
    id: 'apple',
    name: t('Apple Passwörter', 'Apple Passwords'),
    category: 'platform',
    overview: t(
      'Der iCloud-Schlüsselbund macht Passkeys auf deinen eingerichteten Apple-Geräten verfügbar. Du bestätigst mit Face ID, Touch ID oder deinem Gerätecode.',
      'iCloud Keychain makes passkeys available on your configured Apple devices. Confirm with Face ID, Touch ID or your device passcode.',
    ),
    tradeoff: t(
      'Praktisch für iPhone, iPad und Mac. Plane ein, wie du wieder Zugang zu deinem Apple Account erhältst.',
      'Convenient across iPhone, iPad and Mac. Plan how you would regain access to your Apple Account.',
    ),
    prepare: t(
      'Prüfe auf iPhone, iPad oder Mac, ob der iCloud-Schlüsselbund für deinen Apple Account aktiv ist. Richte eine Gerätesperre ein.',
      'On iPhone, iPad or Mac, check that iCloud Keychain is enabled for your Apple Account. Set up a device lock.',
    ),
    save: t(
      'Wähle beim Erstellen Apple Passwörter als Speicherort. Bestätige auf deinem Gerät mit Face ID, Touch ID oder Gerätecode und warte auf die Rückmeldung der Website.',
      'Choose Apple Passwords when creating the passkey. Confirm on your device with Face ID, Touch ID or your passcode and wait for the website to confirm.',
    ),
    troubleshoot: t(
      'Fehlt der Passkey auf dem zweiten Gerät? Prüfe den Apple Account und die Schlüsselbund-Synchronisierung auf beiden Geräten.',
      'Missing the passkey on a second device? Check the Apple Account and iCloud Keychain sync on both devices.',
    ),
    url: 'https://support.apple.com/en-us/109016',
    lastReviewed: reviewed,
  },
  {
    id: 'google',
    name: t('Google Passwortmanager', 'Google Password Manager'),
    category: 'platform',
    overview: t(
      'Auf unterstützten Android-Geräten und in Chrome verwaltet Google Passwortmanager deine Passkeys. Der Fingerabdruck oder die PIN bestätigt die Verwendung auf deinem Gerät.',
      'Google Password Manager keeps passkeys on supported Android devices and in Chrome. A fingerprint or PIN confirms use on your device.',
    ),
    tradeoff: t(
      'Hilfreich, wenn du Chrome oder Android nutzt. Auf einem neuen Gerät können zusätzliche Schritte zum Entschlüsseln nötig sein.',
      'Useful if you use Chrome or Android. A new device may need an additional step to decrypt your passkeys.',
    ),
    prepare: t(
      'Prüfe auf Android die Displaysperre. Nutzt du Chrome, prüfe dein Google-Konto und ob Google Passwortmanager als Speicherort angeboten wird.',
      'On Android, check that screen lock is enabled. In Chrome, check your Google Account and whether Google Password Manager is offered as a location.',
    ),
    save: t(
      'Wähle Google Passwortmanager, prüfe das Konto und bestätige wie angezeigt. Je nach Gerät verwendest du die lokale Displaysperre oder deine Google-Passwortmanager-PIN.',
      'Choose Google Password Manager, check the account and confirm as prompted. Depending on your device, use the local screen lock or your Google Password Manager PIN.',
    ),
    troubleshoot: t(
      'Wird ein anderer Speicherort angeboten? Prüfe den aktiven Anbieter sowie das Profil und die Version deines Browsers.',
      'Seeing a different destination? Check the active provider and your browser profile and version.',
    ),
    url: 'https://support.google.com/chrome/answer/13168025',
    lastReviewed: reviewed,
  },
  {
    id: 'windows',
    name: t('Windows Hello', 'Windows Hello'),
    category: 'platform',
    overview: t(
      'Windows Hello prüft dein Gesicht, deinen Fingerabdruck oder deine Windows-PIN lokal. Ein WebAuthn-Passkey ist der kryptografische Anmeldenachweis, dessen Nutzung du damit freigeben kannst.',
      'Windows Hello checks your face, fingerprint or Windows PIN locally. A WebAuthn passkey is the cryptographic credential you can authorise it to use.',
    ),
    tradeoff: t(
      'Achte im Windows-Dialog auf den Speicherort. Ein lokal auf diesem PC gespeicherter Passkey braucht einen eigenen Ersatzweg.',
      'Check the destination in the Windows prompt. A passkey saved only on this PC needs a separate backup sign-in method.',
    ),
    prepare: t(
      'Richte Windows Hello ein und prüfe, ob deine Organisation den gewünschten Passkey-Anbieter zulässt.',
      'Set up Windows Hello and check whether your organisation permits the provider you intend to use.',
    ),
    save: t(
      'Wähle den vorgesehenen Speicherort im Windows-Dialog und bestätige mit der verlangten lokalen Geste.',
      'Choose the intended destination in the Windows prompt and confirm with the requested local gesture.',
    ),
    troubleshoot: t(
      'Der Speicherort fehlt? Prüfe Windows-Version und die Richtlinien deines Geräts.',
      'Destination missing? Check your Windows version and device policy.',
    ),
    url: 'https://learn.microsoft.com/windows/security/identity-protection/passkeys/',
    lastReviewed: reviewed,
  },
  {
    id: 'proton',
    name: t('Proton Pass', 'Proton Pass'),
    category: 'manager',
    overview: t(
      'Proton Pass speichert Passkeys in Login-Einträgen deines Tresors. So kannst du sie auf unterstützten Geräten über deinen Anbieter nutzen.',
      'Proton Pass stores passkeys in login items in your vault, making them available through your provider on supported devices.',
    ),
    tradeoff: t(
      'Praktisch für einen bestehenden Proton-Tresor. Prüfe vor einem Gerätewechsel, wie du auch deine verschlüsselten Daten wiederherstellst.',
      'Useful if you already keep a Proton vault. Before changing devices, check how to recover access to your encrypted data.',
    ),
    prepare: t(
      'Entsperre die Proton-Pass-Erweiterung auf deinem Computer. Prüfe auf dem Smartphone, ob Proton Pass als Anbieter für Passkeys eingerichtet ist.',
      'Unlock the Proton Pass extension on your computer. On a phone, check whether Proton Pass is configured as a passkey provider.',
    ),
    save: t(
      'Wenn Proton Pass das Speichern anbietet, prüfe Website, Konto und Tresor. Speichere den Passkey beim passenden Login und warte auf die Bestätigung der Website.',
      'When Proton Pass offers to save, check the site, account and vault. Save the passkey with the matching login and wait for the website to confirm.',
    ),
    troubleshoot: t(
      'Kein Proton-Dialog? Prüfe, ob die Erweiterung für diese Website aktiviert ist. Mobil hängt die Auswahl vom Betriebssystem ab.',
      'No Proton prompt? Check that the extension is enabled for this website. On mobile, provider selection depends on the operating system.',
    ),
    url: 'https://proton.me/support/pass-use-passkeys',
    lastReviewed: reviewed,
  },
  {
    id: 'bitwarden',
    name: t('Bitwarden', 'Bitwarden'),
    category: 'manager',
    overview: t(
      'Bitwarden legt einen Passkey in einem Login-Eintrag ab. Auf kompatiblen Geräten wählst du diesen Eintrag aus dem entsperrten Tresor.',
      'Bitwarden stores a passkey in a login item. On compatible devices, select that item from your unlocked vault.',
    ),
    tradeoff: t(
      'Passt zu gemischten Geräten. Beachte die Zugriffsrechte, bevor du einen Eintrag in einer gemeinsamen Sammlung speicherst.',
      'Useful across different devices. Check access permissions before placing an item in a shared collection.',
    ),
    prepare: t(
      'Entsperre deinen Bitwarden-Tresor. Verwende am Computer die unterstützte Browser-Erweiterung. Prüfe mobil den aktiven Passkey-Anbieter.',
      'Unlock your Bitwarden vault. On a computer, use a supported browser extension. On mobile, check the active passkey provider.',
    ),
    save: t(
      'Wähle im Bitwarden-Dialog den passenden Login-Eintrag oder erstelle einen neuen. Prüfe den Namen der Website, bevor du speicherst.',
      'Select the matching login item in the Bitwarden prompt or create a new one. Check the website name before saving.',
    ),
    troubleshoot: t(
      'Es erscheint nur die Systemabfrage? Prüfe die Einstellungen zur Passkey-Verwaltung in der Erweiterung und ob der Tresor entsperrt ist.',
      'Only seeing the system prompt? Check the extension’s passkey settings and whether your vault is unlocked.',
    ),
    url: 'https://bitwarden.com/help/storing-passkeys/',
    lastReviewed: reviewed,
  },
  {
    id: '1password',
    name: t('1Password', '1Password'),
    category: 'manager',
    overview: t(
      '1Password speichert Passkeys in Login-Objekten. Mit dem passenden Tresor kannst du sie in unterstützten Browsern und Apps verwenden.',
      '1Password saves passkeys in login items. With access to the right vault you can use them in supported browsers and apps.',
    ),
    tradeoff: t(
      'Nützlich für bestehende 1Password-Nutzer. Plane den Zugang zu deinem Konto und gegebenenfalls zum Team-Tresor ein.',
      'Convenient for existing 1Password users. Plan how you will access your account and any team vault you depend on.',
    ),
    prepare: t(
      'Entsperre 1Password im unterstützten Browser. Auf dem Smartphone muss 1Password als Anbieter für die Passkey-Abfrage verfügbar sein.',
      'Unlock 1Password in a supported browser. On a phone, make sure 1Password is available as a provider for the passkey prompt.',
    ),
    save: t(
      'Wähle im 1Password-Dialog den richtigen Login oder lege ein neues Objekt im gewünschten Tresor an. Prüfe danach die Bestätigung der Website.',
      'Choose the correct login in the 1Password prompt or create a new item in the intended vault. Check for the website’s confirmation.',
    ),
    troubleshoot: t(
      'Mehrere Login-Objekte für dieselbe Website? Vergleiche Kontoname und Tresor, bevor du ein Objekt auswählst.',
      'Several login items for one website? Compare the account name and vault before selecting an item.',
    ),
    url: 'https://support.1password.com/save-use-passkeys/',
    lastReviewed: reviewed,
  },
  {
    id: 'hardware',
    name: t('FIDO2-Sicherheitsschlüssel', 'FIDO2 security key'),
    category: 'hardware',
    overview: t(
      'Ein kompatibler Schlüssel, etwa ein YubiKey mit FIDO2, trägt seinen Passkey mit dir. Du verbindest ihn über USB oder bei unterstützten Geräten über NFC.',
      'A compatible key, such as a FIDO2-capable YubiKey, carries its passkey with you. Connect over USB or use NFC with a supported device.',
    ),
    tradeoff: t(
      'Der Passkey bleibt an diesen Schlüssel gebunden. Eine Registrierung als zweiter Faktor nach dem Passwort ist ein anderer Modus. Richte einen zweiten Schlüssel separat ein.',
      'The passkey stays bound to that key. Registering it as a second factor after a password is a different mode. Register a second key separately.',
    ),
    prepare: t(
      'Prüfe FIDO2-Unterstützung, freien Speicher und USB-Anschluss oder NFC. Halte deine Schlüssel-PIN und eine zweite Anmeldemethode bereit.',
      'Check FIDO2 support, spare credential capacity and your USB connector or NFC. Have your key’s PIN and a second sign-in method ready.',
    ),
    save: t(
      'Wähle den Sicherheitsschlüssel als Ziel. Stecke ihn ein oder halte ihn ans NFC-Lesefeld, wenn du dazu aufgefordert wirst. Bestätige mit seiner PIN oder Biometrie und berühre ihn bei Aufforderung.',
      'Select the security key as the destination. Insert it or hold it near the NFC reader when prompted. Verify with its PIN or biometrics and touch the key if requested.',
    ),
    troubleshoot: t(
      'Der Schlüssel wird nur als zweiter Faktor angeboten? Prüfe, ob Dienst und Schlüssel gerätegebundene Passkeys unterstützen. Setze den Schlüssel nicht als ersten Lösungsversuch zurück.',
      'Only offered as a second factor? Check whether the service and key support device-bound passkeys. Avoid resetting the key as a first troubleshooting step.',
    ),
    url: 'https://developers.yubico.com/Passkeys/',
    lastReviewed: reviewed,
  },
]

export const categoryLabels = {
  platform: t('Geräteanbieter', 'Device providers'),
  manager: t('Passwortmanager', 'Password managers'),
  hardware: t('Sicherheitsschlüssel', 'Security keys'),
}

export const categoryDescriptions = {
  platform: t(
    'Mit der Gerätesperre bestätigen. Wo der Passkey gespeichert und synchronisiert wird, hängt vom gewählten Anbieter ab.',
    'Confirm with your device lock. Where the passkey is saved and synced depends on the provider you choose.',
  ),
  manager: t(
    'Ein Tresor begleitet dich über Systemgrenzen hinweg. Prüfe die Unterstützung für deinen Browser und dein Smartphone.',
    'One vault can travel across platforms. Check support for your browser and phone.',
  ),
  hardware: t(
    'Ein physischer Schlüssel für mehrere Geräte. Transportiere ihn wie einen Hausschlüssel und plane einen Ersatz ein.',
    'One physical key can work across devices. Carry it like a house key and arrange a spare.',
  ),
}

export const reasoning: Record<Recommendation, Copy> = {
  hardware: t(
    'Ein kompatibler FIDO2-Schlüssel passt zu deinem Wunsch nach separater Hardware. Er lässt sich mitnehmen, synchronisiert aber nicht. Registriere einen Ersatzschlüssel.',
    'A compatible FIDO2 key fits your preference for dedicated hardware. You can carry it between devices, but it does not sync. Register a spare key.',
  ),
  manager: t(
    'Ein kompatibler Passwortmanager bündelt deine Passkeys in einem Tresor. Vergleiche zuerst die Unterstützung für deine eigenen Geräte und die Wiederherstellung des Tresors.',
    'A compatible password manager keeps your passkeys in one vault. First compare support for your own devices and how you would recover the vault.',
  ),
  apple: t(
    'Apple Passwörter ist auf deinen Apple-Geräten naheliegend. Mit iCloud-Schlüsselbund sind Passkeys auf deinen eingerichteten Geräten verfügbar. Plane die Wiederherstellung des Apple Accounts.',
    'Apple Passwords fits the Apple devices you use. iCloud Keychain makes passkeys available on your configured devices. Plan for Apple Account recovery.',
  ),
  google: t(
    'Google Passwortmanager passt zu Android und unterstützten Chrome-Profilen. Halte die nötigen Entsperr- und Wiederherstellungsmethoden für ein neues Gerät bereit.',
    'Google Password Manager fits Android and supported Chrome profiles. Keep the unlock and recovery methods you would need for a new device available.',
  ),
  windows: t(
    'Windows Hello kann die Verwendung eines auf deinem PC gespeicherten Passkeys freigeben. Prüfe den gewählten Speicherort und registriere eine zweite Methode für einen Gerätewechsel.',
    'Windows Hello can authorise a passkey saved on your PC. Check the chosen storage location and register another method before changing devices.',
  ),
}
