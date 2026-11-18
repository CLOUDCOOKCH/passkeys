import { words } from './resources'

export const microsoft365 = {
  title: words('Mit einem Sicherheitsschlüssel bei Microsoft 365 anmelden', 'Use a security key with Microsoft 365'),
  intro: words(
    'Du hast von deiner Firma einen FIDO2-Schlüssel bekommen? Mit seiner PIN entsperrst du den Schlüssel. Den Passkey für dein Geschäftskonto erstellst du danach im Microsoft-Portal.',
    'Got a FIDO2 key from work? Its PIN unlocks the key. You’ll create the passkey for your work account in Microsoft’s portal.',
  ),
  prerequisite: words(
    'Halte deine geschäftliche E-Mail-Adresse, eine bestehende Anmeldemethode für die mehrstufige Authentifizierung (MFA) und einen von deiner IT zugelassenen Schlüssel bereit. Ist dies deine erste Anmeldung, frage die IT nach einem befristeten Zugriffspass (Temporary Access Pass).',
    'Have your work email address, an existing multifactor authentication (MFA) method and an IT-approved key ready. If this is your first sign-in, ask IT whether they can issue a Temporary Access Pass.',
  ),
  steps: [
    {
      title: words('Die PIN auf dem Schlüssel einrichten', 'Set the PIN on your key'),
      items: [
        words('Öffne unter Windows 11 Einstellungen → Konten → Anmeldeoptionen → Sicherheitsschlüssel → Verwalten. Stecke den USB-Schlüssel ein oder halte den NFC-Schlüssel an ein kompatibles Lesegerät. Berühre den Schlüssel, wenn du dazu aufgefordert wirst.', 'On Windows 11, open Settings → Accounts → Sign-in options → Security Key → Manage. Insert the USB key or tap the NFC key on a compatible reader. Touch the key when prompted.'),
        words('Wähle unter «Sicherheitsschlüssel-PIN» die Option «Hinzufügen». Gib eine neue PIN ein und bestätige sie. Hast du bereits eine Schlüssel-PIN, verwende sie bei der Registrierung weiter. Ein Zurücksetzen löscht die gespeicherten FIDO-Anmeldedaten.', 'Under Security Key PIN, choose Add. Enter a new PIN and confirm it. If the key already has a PIN, use it during registration. Resetting the key erases its FIDO credentials.'),
        words('Auf einem anderen Betriebssystem kannst du die PIN bei der Registrierung festlegen, wenn der Systemdialog dies anbietet. Andernfalls nutze das von deiner IT empfohlene Werkzeug des Schlüsselherstellers.', 'On another operating system, you can set the PIN during registration if the system prompts you. Otherwise, use the key manufacturer’s tool recommended by IT.'),
      ],
    },
    {
      title: words('Den Schlüssel im Microsoft-Portal registrieren', 'Register the key in Microsoft’s portal'),
      items: [
        words('Öffne «Sicherheitsinformationen» und melde dich mit deinem Geschäfts- oder Schulkonto an. Bestätige deine Identität mit deiner bisherigen MFA-Methode oder dem Zugriffspass deiner IT.', 'Open Security info and sign in with your work or school account. Verify your identity with your existing MFA method or the Temporary Access Pass issued by IT.'),
        words('Wähle «Anmeldemethode hinzufügen» → «Passkey» → «Weiter». Wähle im nächsten Dialog «Sicherheitsschlüssel». Wird zuerst dein Computer oder Handy angeboten, öffne «Weitere Optionen» oder «Anderes Gerät verwenden».', 'Select Add sign-in method → Passkey → Next. In the following prompt, choose Security key. If your computer or phone is offered first, choose More options or Use another device.'),
        words('Verbinde den Schlüssel. Gib die Schlüssel-PIN im Sicherheitsdialog deines Geräts ein und berühre den Schlüssel, wenn er dazu auffordert. Gib ihm im Portal einen erkennbaren Namen, etwa «Büroschlüssel», und schliesse die Registrierung ab. Prüfe, ob der Eintrag unter «Sicherheitsinformationen» erscheint.', 'Connect the key. Enter its PIN in your device’s security prompt and touch the key when asked. Give it a recognisable name such as “Office key” in the portal and finish registration. Check that it appears in Security info.'),
      ],
    },
    {
      title: words('Die erste Anmeldung testen', 'Test your first sign-in'),
      items: [
        words('Lass das Portal offen. Öffne Microsoft 365 in einem privaten Browserfenster. Wähle bei der Anmeldung «Anmeldeoptionen» → «Gesicht, Fingerabdruck, PIN oder Sicherheitsschlüssel» und dann «Sicherheitsschlüssel».', 'Keep the portal open. Open Microsoft 365 in a private browser window. At sign-in, choose Sign-in options → Face, fingerprint, PIN, or security key, then Security key.'),
        words('Verbinde den Schlüssel und bestätige die Anmeldung mit seiner PIN oder seinem Fingerabdrucksensor. Prüfe, ob dein Geschäftskonto geöffnet wird. Behalte eine zweite von der IT zugelassene Methode für den Fall, dass du den Schlüssel verlierst.', 'Connect the key and approve the sign-in using its PIN or fingerprint sensor. Check that your work account opens. Keep a second IT-approved sign-in method in case you lose the key.'),
      ],
    },
  ],
  portal: words('Sicherheitsinformationen in neuem Tab öffnen', 'Open Security info in a new tab'),
  symptoms: [
    {
      id: 'missing-passkey',
      title: words('«Passkey» fehlt im Portal.', 'Passkey is missing from Security info.'),
      action: words('Prüfe im Kontomenü die geschäftliche E-Mail-Adresse. Öffne für dieses Konto «Sicherheitsinformationen» → «Anmeldemethode hinzufügen».', 'Check the work email address in the account menu. For that account, open Security info → Add sign-in method.'),
      escalation: words('Fehlt «Passkey» weiterhin, frage die IT, ob «Passkey (FIDO2)» für deine Gruppe aktiviert ist und du dich selbst registrieren darfst.', 'If Passkey is still missing, ask IT whether Passkey (FIDO2) is enabled for your group and whether you can register it yourself.'),
    },
    {
      id: 'phone-only',
      title: words('Mir wird nur mein Handy angeboten.', 'I only see my phone.'),
      action: words('Gehe im Auswahldialog einen Schritt zurück. Wähle «Weitere Optionen» oder «Anderes Gerät verwenden», dann «Sicherheitsschlüssel». Verbinde den Schlüssel erst, wenn der Dialog dich dazu auffordert.', 'Go back one step in the device picker. Choose More options or Use another device, then Security key. Connect the key when prompted.'),
      escalation: words('Fehlt die Auswahl auch im empfohlenen Firmenbrowser, nenne der IT dein Betriebssystem, den Browser und das Schlüsselmodell.', 'If that choice is also missing in your company’s recommended browser, tell IT your operating system, browser and key model.'),
    },
    {
      id: 'forgot-pin',
      title: words('Ich habe die Schlüssel-PIN vergessen.', 'I forgot my security key PIN.'),
      action: words('Beende die PIN-Abfrage. Weitere Fehlversuche können den Schlüssel sperren. Melde dich mit deiner Ersatzmethode an und lass eine offene Sitzung bestehen.', 'Cancel the PIN prompt. Repeated guesses can block the key. Use your backup sign-in method and keep any existing session open.'),
      escalation: words('Kontaktiere die IT, bevor du den Schlüssel zurücksetzt. Ein FIDO2-Reset löscht seine Passkeys für alle Konten. Kläre zuerst für jedes Konto den Ersatzweg.', 'Contact IT before resetting the key. A FIDO2 reset erases its passkeys for every account. Confirm you have a way back into each account first.'),
    },
    {
      id: 'key-rejected',
      title: words('Mein Sicherheitsschlüssel wird abgelehnt.', 'My security key is rejected.'),
      action: words('Prüfe, ob du den von deiner Firma freigegebenen FIDO2-Schlüssel verwendest. Bei einem Anmeldeversuch brauchst du den Schlüssel, den du für genau dieses Konto registriert hast.', 'Check that you’re using a FIDO2 key approved by your company. For sign-in, use the specific key you registered to this account.'),
      escalation: words('Wird er weiter abgelehnt, gib der IT den Wortlaut der Fehlermeldung und das Schlüsselmodell. Sie kann die Richtlinie für dein Konto prüfen.', 'If it’s still rejected, give IT the error message and the key model so they can check the policy for your account.'),
    },
  ],
  source: words('Microsoft Learn · Registrierung mit einem Sicherheitsschlüssel', 'Microsoft Learn · Register a passkey with a security key'),
  lastReviewed: '2026-11-18',
}
