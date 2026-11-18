export const cardContent = {
  key: {
    de: {
      front: {
        title: 'Sicherheitsschlüssel einrichten',
        steps: [
          'Öffne mysignins.microsoft.com/security-info. Melde dich mit deinem Geschäftskonto an.',
          'Wähle «Anmeldemethode hinzufügen» → «Passkey». Suche «Sicherheitsschlüssel» ggf. unter «Weitere Optionen».',
          'Verbinde den Schlüssel. Lege bei Bedarf seine PIN fest, bestätige am Schlüssel und schliesse die Registrierung ab.',
        ],
      },
      back: {
        title: 'Anmeldung testen',
        steps: [
          'Lass das Portal offen. Öffne Microsoft 365 in einem privaten Browserfenster.',
          'Wähle unter den Anmeldeoptionen den Sicherheitsschlüssel. Verbinde den registrierten Schlüssel und bestätige mit seiner PIN.',
          'Prüfe, ob dein Geschäftskonto geöffnet ist. Behalte eine von deiner IT zugelassene Ersatzmethode.',
        ],
      },
    },
    en: {
      front: {
        title: 'Set up your security key',
        steps: [
          'Open mysignins.microsoft.com/security-info. Sign in with your work account.',
          'Choose Add sign-in method → Passkey. Look under More options if Security key is hidden.',
          'Connect the key. Set its PIN if needed, confirm on the key and finish registration.',
        ],
      },
      back: {
        title: 'Test your sign-in',
        steps: [
          'Keep the portal open. Open Microsoft 365 in a private browser window.',
          'Choose the security key in Sign-in options. Connect the registered key and confirm with its PIN.',
          'Check that your work account opens. Keep a backup sign-in method approved by your IT team.',
        ],
      },
    },
  },
  authenticator: {
    de: {
      front: {
        title: 'Authenticator einrichten',
        steps: [
          'Öffne in Microsoft Authenticator dein Geschäftskonto. Fehlt es, füge es über + hinzu.',
          'Wähle «Passkey erstellen» und bestätige deine Identität wie angefordert.',
          'Aktiviere Authenticator bei Bedarf als Passkey-Anbieter auf dem Handy. Schliesse die Einrichtung in der App ab.',
        ],
      },
      back: {
        title: 'Am Computer anmelden',
        steps: [
          'Öffne Microsoft 365 in einem privaten Browserfenster. Wähle die Passkey-Anmeldung und dann ein anderes Gerät.',
          'Halte dein Handy bereit. Aktiviere Bluetooth auf beiden Geräten und scanne den QR-Code am Bildschirm mit der Handykamera.',
          'Entsperre den Passkey auf dem Handy. Prüfe, ob sich am Computer dein Geschäftskonto öffnet.',
        ],
      },
    },
    en: {
      front: {
        title: 'Set up Authenticator',
        steps: [
          'Open your work account in Microsoft Authenticator. If it is missing, use + to add it.',
          'Select Create a passkey and complete the requested identity check.',
          'Enable Authenticator as a passkey provider on your phone if prompted. Return to the app and finish setup.',
        ],
      },
      back: {
        title: 'Sign in on your computer',
        steps: [
          'Open Microsoft 365 in a private browser window. Choose passkey sign-in, then select another device.',
          'Keep your phone nearby. Turn on Bluetooth on both devices. Use the phone camera to scan the QR code on the computer screen.',
          'Unlock the passkey on your phone. Check that your work account opens on the computer.',
        ],
      },
    },
  },
} as const

export const cardLabels = {
  de: { brand: 'Passkeys.', support: 'IT-Support', guide: 'Anleitung und Hilfe', front: 'Vorderseite', back: 'Rückseite' },
  en: { brand: 'Passkeys.', support: 'IT support', guide: 'Guide and help', front: 'Front', back: 'Back' },
} as const
