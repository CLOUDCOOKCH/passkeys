import type { Lang } from '../i18n/home'

interface Route {
  choice: string
  result: string
  explanation: string
  projected: string
}

interface Round {
  scene: string
  question: string
  context: string
  projected: string
  routes: readonly [Route, Route]
}

interface WorkshopCopy {
  title: string
  intro: string
  start: string
  present: string
  presenter: string
  exit: string
  round: string
  pause: string
  vote: string
  reveal: string
  compare: string
  chosen: string
  alternate: string
  next: string
  finish: string
  restart: string
  complete: string
  takeaway: string
  card: string
  rounds: readonly Round[]
}

export const liveWorkshop: Record<Lang, WorkshopCopy> = {
  de: {
    title: 'Live-Workshop',
    intro: 'Drei Situationen für die ganze Gruppe. Zeige die zwei Wege, sammle Handzeichen und decke gemeinsam mit der Gruppe die Folgen auf.',
    start: 'Workshop starten',
    present: 'Präsentationsansicht',
    presenter: 'Präsentationsansicht des Workshops',
    exit: 'Präsentationsansicht beenden',
    round: 'Runde',
    pause: 'Per Handzeichen abstimmen',
    vote: 'Wer ist für A, wer für B? Wähle als Moderation den Weg der Gruppe.',
    reveal: 'Folge aufdecken',
    compare: 'Beide Wege vergleichen',
    chosen: 'Eure Wahl',
    alternate: 'Der andere Weg',
    next: 'Nächste Runde',
    finish: 'Workshop abschliessen',
    restart: 'Workshop neu starten',
    complete: 'Was nehmt ihr mit?',
    takeaway: 'Welche Ersatzmethode steht eurem Team zur Verfügung? Haltet den ersten Schritt und den IT-Kontakt auf einer Startkarte fest.',
    card: 'Startkarte für den ersten Tag gestalten',
    rounds: [
      {
        scene: 'Freitag · vor dem Wochenende',
        question: 'Was macht Mika mit dem Ersatzschlüssel?',
        context: 'Mikas einziger Passkey fürs Geschäftskonto ist ans Handy gebunden. Die IT hat einen zweiten, zugelassenen Sicherheitsschlüssel mitgegeben.',
        projected: 'Mikas einziger Arbeitspasskey ist ans Handy gebunden. Ein zugelassener Ersatzschlüssel liegt bereit.',
        routes: [
          {
            choice: 'Den Ersatzschlüssel heute registrieren und testen.',
            result: 'Am Montag funktioniert der Ersatz.',
            explanation: 'Das Handy fehlt. Mika meldet sich mit dem separat registrierten Schlüssel an. Der Passkey auf dem verlorenen Handy wird dafür nicht gebraucht.',
            projected: 'Das Handy fehlt. Mika kann sich mit dem separat registrierten Schlüssel anmelden.',
          },
          {
            choice: 'Den Schlüssel bis zum ersten Einsatz aufbewahren.',
            result: 'Ein unbenutzter Schlüssel öffnet kein Konto.',
            explanation: 'Das Handy fehlt. Der neue Schlüssel ist noch nicht mit dem Konto verknüpft. Mika braucht einen anderen zugelassenen Anmeldeweg oder die Identitätsprüfung durch die IT.',
            projected: 'Das Handy fehlt. Mika braucht eine andere zugelassene Methode oder Hilfe von der IT.',
          },
        ],
      },
      {
        scene: 'Gerätewechsel · gesperrter Tresor',
        question: 'Wie kommt Mika ins persönliche Konto?',
        context: 'Der Passkey ist im Passwortmanager synchronisiert. Auf dem neuen Handy ist der Tresor gesperrt. Mika hat sowohl den Wiederherstellungsweg des Anbieters als auch eine Ersatzmethode für die Website.',
        projected: 'Neues Handy, gesperrter synchronisierter Tresor. Mika hat einen Wiederherstellungsweg beim Anbieter und eine Ersatzmethode für die Website.',
        routes: [
          {
            choice: 'Den bisherigen Passwortmanager wieder entsperren.',
            result: 'Der synchronisierte Passkey ist wieder da.',
            explanation: 'Mika bestätigt das neue Handy beim Anbieter und entsperrt den synchronisierten Tresor. Damit steht dessen Passkey für die Website wieder zur Verfügung.',
            projected: 'Mika bestätigt das neue Gerät beim Anbieter und entsperrt den synchronisierten Tresor.',
          },
          {
            choice: 'Die Ersatzmethode der Website verwenden.',
            result: 'Das Konto ist offen, der Tresor bleibt gesperrt.',
            explanation: 'Nach der Anmeldung kann Mika einen neuen Passkey bei einem verfügbaren Anbieter registrieren und testen. Dieser Weg stellt den alten Tresor nicht wieder her.',
            projected: 'Mika kann auf der Website einen neuen Passkey registrieren und testen. Der alte Tresor bleibt gesperrt.',
          },
        ],
      },
      {
        scene: 'Support · zwei Geschäftskonten',
        question: 'Der Schlüssel passt nicht. Was prüft ihr zuerst?',
        context: 'Mika hat den Schlüssel fürs Atelier registriert. Der Browser bietet aber das Konto der Fabrik an. Für dieses Konto findet er keinen passenden Passkey.',
        projected: 'Der Schlüssel gehört zum Atelier. Der Browser zeigt das Fabrik-Konto und meldet: «Kein passender Passkey».',
        routes: [
          {
            choice: 'Das gewählte Konto prüfen und zum Atelier wechseln.',
            result: 'Konto und Schlüssel passen zusammen.',
            explanation: 'Mika wählt das Atelier-Konto und meldet sich mit dem registrierten Schlüssel an. Für das Fabrik-Konto wäre eine eigene Registrierung nötig.',
            projected: 'Der Wechsel zum Atelier genügt, weil der Schlüssel für dieses Konto registriert ist.',
          },
          {
            choice: 'Den Sicherheitsschlüssel zurücksetzen lassen.',
            result: 'Ein Reset würde auch den Atelier-Passkey löschen.',
            explanation: 'Das falsche Konto bliebe ausgewählt. Stoppt vor einem Reset, prüft die Kontoauswahl und klärt bei Bedarf mit der IT den Ersatzweg.',
            projected: 'Ein Reset löscht die FIDO-Zugangsdaten auf dem Schlüssel. Erst die Kontoauswahl prüfen und bei Bedarf die IT fragen.',
          },
        ],
      },
    ],
  },
  en: {
    title: 'Live workshop',
    intro: 'Three situations for the room. Show both routes, take a show of hands, then reveal what happens next.',
    start: 'Start workshop',
    present: 'Presenter view',
    presenter: 'Workshop presenter view',
    exit: 'Exit presenter view',
    round: 'Round',
    pause: 'Pause for a vote',
    vote: 'Hands up for A or B. As facilitator, select the route the room chose.',
    reveal: 'Reveal outcome',
    compare: 'Compare both routes',
    chosen: 'Your choice',
    alternate: 'The other route',
    next: 'Next round',
    finish: 'Finish workshop',
    restart: 'Restart workshop',
    complete: 'What will you take back?',
    takeaway: 'Which backup method can your team use? Put the first step and your IT contact on a card to take away.',
    card: 'Make a first-day card',
    rounds: [
      {
        scene: 'Friday · before the weekend',
        question: 'What should Mika do with the spare key?',
        context: 'Mika’s only work passkey is bound to a phone. IT has supplied a second approved security key.',
        projected: 'Mika’s only work passkey is bound to the phone. An approved spare key is ready.',
        routes: [
          {
            choice: 'Register and test the spare key today.',
            result: 'On Monday, the spare works.',
            explanation: 'The phone is missing. Mika signs in with the separately registered key. The passkey on the lost phone is never needed for this sign-in.',
            projected: 'The phone is missing. Mika can sign in using the separately registered key.',
          },
          {
            choice: 'Put the key away until it’s needed.',
            result: 'An unused key can’t open the account.',
            explanation: 'The phone is missing. The spare hasn’t been linked to the account. Mika needs another approved sign-in method or an identity check with IT.',
            projected: 'The phone is missing. Mika needs another approved method or help from IT.',
          },
        ],
      },
      {
        scene: 'New phone · locked vault',
        question: 'How can Mika get into a personal account?',
        context: 'The passkey is synced in a password manager. Its vault is locked on the new phone. Mika has both the provider’s recovery method and a backup way into the website.',
        projected: 'New phone, locked synced vault. Mika can recover the provider account or use the website’s backup sign-in method.',
        routes: [
          {
            choice: 'Regain access to the original password manager.',
            result: 'The synced passkey is available again.',
            explanation: 'Mika authorises the new phone with the provider and unlocks the synced vault. Its passkey is available to sign in to the website.',
            projected: 'Mika authorises the new device with the provider and unlocks the synced vault.',
          },
          {
            choice: 'Use the website’s backup sign-in method.',
            result: 'The account opens. The vault stays locked.',
            explanation: 'Once signed in, Mika can register and test a new passkey with an available provider. Recovering the website account does not recover the old vault.',
            projected: 'Mika can register and test a new passkey on the website. The old vault stays locked.',
          },
        ],
      },
      {
        scene: 'Help desk · two work accounts',
        question: 'The key doesn’t match. What do you check first?',
        context: 'Mika registered the key for the studio. The browser is offering the factory account instead. It can’t find a matching passkey for that account.',
        projected: 'The key is registered with the studio. The browser offers the factory account and finds no matching passkey.',
        routes: [
          {
            choice: 'Check the account and switch to the studio.',
            result: 'The account and key match.',
            explanation: 'Mika chooses the studio account and signs in with the registered key. The factory account would need its own registration.',
            projected: 'Switching to the studio works because the key is registered to that account.',
          },
          {
            choice: 'Ask to have the security key reset.',
            result: 'A reset would erase the studio passkey too.',
            explanation: 'The wrong account would still be selected. Stop before a reset, check the account picker, and ask IT about a backup route if needed.',
            projected: 'Resetting erases FIDO credentials from the key. Check the account picker first and ask IT if needed.',
          },
        ],
      },
    ],
  },
}
