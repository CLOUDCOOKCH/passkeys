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
  helpTitle: words('Der Passkey fehlt oder der Schlüssel wird abgelehnt?', 'Can’t see Passkey, or is your key rejected?'),
  help: words('Prüfe zuerst, ob du im richtigen Geschäftskonto bist. Bitte dann die IT zu prüfen, ob «Passkey (FIDO2)» für deine Gruppe aktiviert und dein Schlüsselmodell zugelassen ist.', 'First check which work account you signed in to. Then ask IT to check that Passkey (FIDO2) is enabled for your group and that your key model is allowed.'),
  source: words('Microsoft Learn · Registrierung mit einem Sicherheitsschlüssel', 'Microsoft Learn · Register a passkey with a security key'),
  lastReviewed: '2026-11-18',
}
