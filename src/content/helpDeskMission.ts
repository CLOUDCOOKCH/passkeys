import { words } from './resources'

export const caseIds = ['account', 'provider', 'key'] as const
export type CaseId = (typeof caseIds)[number]
type Copy = ReturnType<typeof words>

interface Ticket {
  name: string
  number: string
  clues: Record<CaseId, Copy>
  resolved: Copy
  supportingClue: Copy
}

export const tickets: Record<CaseId, Ticket> = {
  account: {
    name: 'Mika',
    number: '01',
    clues: {
      account: words(
        '«Die Kontoauswahl zeigt mein früheres Geschäftskonto. Die Einladung ging aber an mein neues Konto.»',
        '“The account picker shows my old work account. The invitation was sent to my new one.”',
      ),
      provider: words(
        '«Mein Tresor ist entsperrt. Den Passkey für das neue Geschäftskonto sehe ich dort.»',
        '“My vault is unlocked. I can see the passkey for my new work account in it.”',
      ),
      key: words(
        '«Für diesen Zugang nutze ich den Tresor auf dem Laptop. Einen USB-Schlüssel brauche ich dafür nicht.»',
        '“I use the vault on my laptop for this sign-in. It doesn’t use a USB key.”',
      ),
    },
    supportingClue: words(
      'Kläre, welches Konto bei der Anmeldung ausgewählt ist.',
      'Find out which account the sign-in screen selected.',
    ),
    resolved: words(
      'Mika wählt in der Kontoauswahl das neue Geschäftskonto und den dazugehörigen Passkey. Jetzt öffnet sich der richtige Arbeitsbereich.',
      'Mika selects the new work account and its matching passkey. The correct workspace opens.',
    ),
  },
  provider: {
    name: 'Alex',
    number: '02',
    clues: {
      account: words(
        '«Die geschäftliche Adresse in der Kontoauswahl stimmt mit der Einladung überein.»',
        '“The work address in the account picker matches the invitation.”',
      ),
      provider: words(
        '«Seit dem Neustart zeigt mein Passwortmanager ein Schloss. Meine Einträge sehe ich erst nach dem Entsperren.»',
        '“Since the restart, my password manager shows a lock. It asks me to unlock it before I can see my items.”',
      ),
      key: words(
        '«Ich melde mich über den Tresor an. Für dieses Konto verwende ich keinen separaten Sicherheitsschlüssel.»',
        '“I sign in through my vault. I don’t use a separate security key for this account.”',
      ),
    },
    supportingClue: words(
      'Prüfe, ob Alex den Tresor auf diesem Gerät öffnen kann.',
      'Check whether Alex can open the vault on this device.',
    ),
    resolved: words(
      'Alex entsperrt den Passwortmanager in der vertrauten App und startet die Anmeldung erneut. Der Tresor bietet den vorhandenen Passkey an.',
      'Alex unlocks the password manager in its own app and tries signing in again. The vault offers the existing passkey.',
    ),
  },
  key: {
    name: 'Jo',
    number: '03',
    clues: {
      account: words(
        '«Das Portal zeigt mein übliches Geschäftskonto. Die Adresse ist richtig.»',
        '“The portal shows my usual work account. The address is right.”',
      ),
      provider: words(
        '«Meinen Passwortmanager kann ich öffnen. Diesen Passkey habe ich dort nie gespeichert.»',
        '“I can open my password manager. This passkey was never saved in it.”',
      ),
      key: words(
        '«Mein USB-Schlüssel ging unterwegs verloren. Im Büro liegt noch der zweite Schlüssel, den ich für dasselbe Konto registriert habe.»',
        '“I lost my USB key on the way here. My second key is at the office. I registered it for the same account.”',
      ),
    },
    supportingClue: words(
      'Kläre, ob der registrierte Schlüssel da ist und ob ein Ersatz existiert.',
      'Find out whether Jo has the registered key or a registered spare.',
    ),
    resolved: words(
      'Jo meldet den Verlust der IT und nutzt den registrierten Ersatzschlüssel. Gemeinsam prüfen sie, welcher verlorene Schlüssel aus dem Konto entfernt werden muss. Ohne registrierten Ersatz wäre die Wiederherstellung durch die IT der nächste Schritt.',
      'Jo reports the loss to IT and signs in with the registered spare. Together they identify the lost key registration to remove. Without a registered backup, the next step would be the organisation’s account recovery process.',
    ),
  },
}

export const questions: Record<CaseId, Copy> = {
  account: words('Welches Konto ist ausgewählt?', 'Which account is selected?'),
  provider: words(
    'Kannst du deinen Passkey-Anbieter öffnen?',
    'Can you open your passkey provider?',
  ),
  key: words('Wo ist dein Sicherheitsschlüssel?', 'Where is your security key?'),
}

export const causes: Record<CaseId, Copy> = {
  account: words('Falsches Geschäftskonto', 'Wrong work account'),
  provider: words('Passkey-Anbieter gesperrt', 'Locked passkey provider'),
  key: words('Sicherheitsschlüssel verloren', 'Lost hardware key'),
}

export const remedies: Record<CaseId, Copy> = {
  account: words('Das vorgesehene Geschäftskonto wählen', 'Select the intended work account'),
  provider: words('Den Anbieter auf diesem Gerät entsperren', 'Unlock the provider on this device'),
  key: words(
    'Registrierten Ersatz nutzen und Verlust melden',
    'Use the registered spare and report the loss',
  ),
}

export const wrongRemedy: Record<CaseId, Copy> = {
  account: words(
    'Ein Kontowechsel hilft, wenn die falsche Identität ausgewählt ist. Prüfe, ob das zu deiner Diagnose passt.',
    'Switching accounts helps when the wrong identity is selected. Check whether that matches your diagnosis.',
  ),
  provider: words(
    'Das Entsperren hilft, wenn der benötigte Passkey in diesem Tresor liegt und der Tresor gesperrt ist. Trifft das hier zu?',
    'Unlocking helps when the required passkey is inside a locked vault. Is that what the clues showed?',
  ),
  key: words(
    'Ein Ersatzschlüssel hilft beim Verlust des registrierten Schlüssels. Wurde hier ein solcher Verlust festgestellt?',
    'A registered spare helps after the original key is lost. Did the clues establish a loss here?',
  ),
}

export const deskCopy = {
  title: words('Dein Einsatz am Helpdesk', 'Your shift at the help desk'),
  intro: words(
    'Drei fiktive Tickets beginnen mit derselben Meldung. Befrage die Person, stelle eine Diagnose und wähle den nächsten Schritt.',
    'Three fictional tickets start with the same message. Interview the caller, diagnose the cause and choose the next step.',
  ),
  symptom: words(
    '«Ich kann mich mit meinem Passkey nicht anmelden.»',
    '“I can’t sign in with my passkey.”',
  ),
  choose: words('Ticket auswählen', 'Choose a ticket'),
  facts: words('Gesprächsnotizen', 'Call notes'),
  questions: words('Was möchtest du wissen?', 'What will you ask?'),
  diagnosis: words('Welche Ursache passt zu den Hinweisen?', 'Which cause fits the clues?'),
  action: words('Was empfiehlst du als Nächstes?', 'What will you recommend next?'),
  done: words('Ticket gelöst', 'Ticket resolved'),
  diagnose: words('Diagnose stellen', 'Make a diagnosis'),
  ask: words('Weitere Frage stellen', 'Ask another question'),
  empty: words(
    'Hier erscheinen die Antworten auf deine Fragen.',
    'The caller’s answers will appear here.',
  ),
  unsupported: words(
    'Für diese Diagnose fehlt noch ein Hinweis.',
    'You need more evidence for that diagnosis.',
  ),
  mismatch: words(
    'Diese Diagnose erklärt den Fall noch nicht. Vergleiche die Antworten oder frage weiter.',
    'That diagnosis does not explain this case. Compare the answers or ask another question.',
  ),
  review: words('Deine Diagnose', 'Your diagnosis'),
  next: words('Nächstes offenes Ticket', 'Next open ticket'),
  restart: words('Einsatz neu starten', 'Restart mission'),
  solved: words('Tickets gelöst', 'tickets resolved'),
}
