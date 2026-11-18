import { words } from './resources'

export const authenticatorGuide = {
  title: words(
    'Mit einem Passkey in Microsoft Authenticator anmelden',
    'Use a passkey in Microsoft Authenticator',
  ),
  intro: words(
    'Dein Handy kann der Schlüssel zu deinem Geschäfts- oder Schulkonto sein. Erstelle den Passkey in Microsoft Authenticator und probiere ihn aus, solange deine bisherige Anmeldung noch funktioniert.',
    'Your phone can be the key to your work or school account. Create a passkey in Microsoft Authenticator and try it while you still have another way to sign in.',
  ),
  phoneTitle: words('Welches Handy nutzt du?', 'Which phone do you use?'),
  registerTitle: words('Passkey in der App einrichten', 'Create your passkey in the app'),
  prepare: words(
    'Deine IT muss Passkeys in Authenticator für dein Konto erlauben. Halte deine bisherige MFA-Methode bereit. Falls du noch keine hast, frage die IT nach einem befristeten Zugriffspass (Temporary Access Pass).',
    'Your IT team must allow passkeys in Authenticator for your account. Have your existing MFA method ready. If you have none yet, ask IT whether they can issue a Temporary Access Pass.',
  ),
  account: words(
    'Öffne die aktuelle Authenticator-App. Tippe auf dein Geschäfts- oder Schulkonto und wähle «Passkey erstellen». Fehlt das Konto, füge es über + als Geschäfts- oder Schulkonto hinzu und melde dich an. Bestätige deine Identität wie angefordert.',
    'Open the current Authenticator app. Tap your work or school account, then Create a passkey. If your account is missing, use + to add a work or school account and sign in. Complete the requested identity check.',
  ),
  phones: {
    ios: {
      minimum: words(
        'iOS 17 oder neuer mit eingerichteter Codesperre.',
        'iOS 17 or later with a device passcode set.',
      ),
      provider: words(
        'Öffne über die App die Einstellungen für das automatische Ausfüllen. Unter iOS 17 findest du sie unter Passwörter → Passwortoptionen, unter iOS 18 unter Allgemein → Automatisch ausfüllen & Passwörter. Aktiviere das Ausfüllen von Passwörtern und Passkeys und wähle Authenticator als Anbieter.',
        'Follow the app into AutoFill settings. On iOS 17, use Passwords → Password Options. On iOS 18, use General → AutoFill & Passwords. Turn on AutoFill Passwords and Passkeys and select Authenticator as a provider.',
      ),
      unlock: words(
        'Wähle den Passkey für dein Geschäftskonto im iOS-Dialog. Entsperre ihn mit Face ID, Touch ID oder dem Gerätecode.',
        'In the iOS prompt, choose the passkey for your work account. Unlock it with Face ID, Touch ID or your device passcode.',
      ),
      qr: words(
        'Scanne den angezeigten QR-Code mit der Kamera-App des iPhones. Die Kamera in Authenticator für iOS kann diesen Anmeldecode nicht lesen. Tippe auf die angebotene Passkey-Anmeldung.',
        'Scan the displayed QR code with the iPhone’s Camera app. The camera inside Authenticator on iOS cannot read this sign-in code. Tap the prompt to sign in with a passkey.',
      ),
    },
    android: {
      minimum: words(
        'Android 14 oder neuer mit Displaysperre. Nutzt du ein Arbeitsprofil, richte den Passkey in dem Profil ein, aus dem du dich anmeldest.',
        'Android 14 or later with screen lock. If you use a work profile, create the passkey in the profile you will sign in from.',
      ),
      provider: words(
        'Öffne über die App die Geräteeinstellungen für Passkeys. Suche bei Bedarf nach «Passkey» und aktiviere Authenticator als zusätzlichen Anbieter. Die Menüs unterscheiden sich je nach Hersteller. Lässt dein Android-14-Gerät das nicht zu, empfiehlt Microsoft ein Update auf Android 15.',
        'Follow the app into your device’s passkey settings. Search for “passkey” if needed and enable Authenticator as an additional provider. Menu names vary by manufacturer. If your Android 14 device lacks this option, Microsoft recommends updating to Android 15.',
      ),
      unlock: words(
        'Wähle den Passkey für dein Geschäftskonto im Android-Dialog. Bestätige mit dem Fingerabdruck, der Gesichtserkennung oder deiner Displaysperre.',
        'In the Android prompt, choose the passkey for your work account. Confirm with your fingerprint, face or screen lock.',
      ),
      qr: words(
        'Scanne den angezeigten QR-Code mit der Kamera-App deines Handys. Alternativ kannst du in Authenticator bei deinem Konto unter den Passkey-Details den Scanner öffnen.',
        'Scan the displayed QR code with your phone’s camera. You can also open the scanner in Authenticator from the passkey details for your account.',
      ),
    },
  },
  finish: words(
    'Kehre in Authenticator zurück und schliesse die Einrichtung ab. Öffne dein Konto in der App und prüfe, ob «Passkey» als Anmeldemethode erscheint. Du kannst den Eintrag auch unter «Sicherheitsinformationen» kontrollieren.',
    'Return to Authenticator and finish setup. Open your account in the app and check that Passkey appears as a sign-in method. You can also check the entry in Security info.',
  ),
  portal: words('Sicherheitsinformationen öffnen', 'Open Security info'),
  testTitle: words('Anmeldung testen', 'Test your sign-in'),
  targetTitle: words('Wo meldest du dich an?', 'Where will you sign in?'),
  target: {
    phone: words('Auf diesem Handy', 'On this phone'),
    other: words('Auf einem anderen Gerät', 'On another device'),
  },
  sameStart: words(
    'Öffne Microsoft 365 in einem unterstützten Browser auf diesem Handy. Nutze für den Test ein privates Fenster, damit deine bestehende Sitzung offen bleibt.',
    'Open Microsoft 365 in a supported browser on this phone. Use a private window for the test so your existing session stays open.',
  ),
  otherStart: words(
    'Öffne Microsoft 365 auf dem Computer. Halte dein Handy in der Nähe. Beide Geräte brauchen Internetzugang und eingeschaltetes Bluetooth.',
    'Open Microsoft 365 on the computer and keep your phone nearby. Both devices need an internet connection and Bluetooth turned on.',
  ),
  select: words(
    'Wähle bei der Microsoft-Anmeldung den Passkey. Falls er nicht angeboten wird, öffne die Anmeldeoptionen und wähle die Option für Gesicht, Fingerabdruck, PIN oder Sicherheitsschlüssel.',
    'Choose a passkey at Microsoft sign-in. If it is not offered, open the sign-in options and choose Face, fingerprint, PIN or security key.',
  ),
  choosePhone: words(
    'Wähle im nächsten Dialog ein anderes Gerät, etwa «iPhone, iPad oder Android-Gerät». Der Computer zeigt einen QR-Code für diese Anmeldung.',
    'In the next prompt choose another device, such as “iPhone, iPad or Android device”. The computer displays a QR code for this sign-in.',
  ),
  checkResult: words(
    'Prüfe, ob Microsoft 365 das richtige Geschäftskonto geöffnet hat. Der Passkey bleibt auf dem Handy. Für einen Verlust oder Gerätewechsel brauchst du einen von deiner IT zugelassenen Ersatzweg.',
    'Check that Microsoft 365 opened the right work account. The passkey stays on the phone. Keep an IT-approved backup method in case you lose or replace it.',
  ),
  pushTitle: words('Passkey oder Push-Nachricht?', 'Passkey or push notification?'),
  push: words(
    'Bei einer Push-Anmeldung öffnest du eine Benachrichtigung in Authenticator und bestätigst die Anfrage, oft per Zahlenabgleich. Beim Passkey wählst du den Schlüssel im Systemdialog und entsperrst ihn lokal. Er signiert die Anfrage für den registrierten Dienst.',
    'With push, you open an Authenticator notification and approve the request, often by matching a number. With a passkey, you select the key in the system prompt and unlock it locally. It signs the request for the registered service.',
  ),
  reviewed: '2026-11-18',
  sources: [
    {
      path: 'how-to-register-passkey-authenticator',
      label: words('Registrierung in Authenticator', 'Register in Authenticator'),
    },
    {
      path: 'how-to-sign-in-passkey-authenticator',
      label: words('Mit Authenticator-Passkey anmelden', 'Sign in with an Authenticator passkey'),
    },
  ],
}
