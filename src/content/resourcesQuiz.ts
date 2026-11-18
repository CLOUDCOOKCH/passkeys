import { words } from './resources'
type Text = ReturnType<typeof words>
interface Question {
  prompt: Text
  choices: [Text, Text, Text]
  answer: number
  explanation: Text
}
export const questions: Question[] = [
  {
    prompt: words(
      'Wo bleibt der private Schlüssel bei der Anmeldung?',
      'Where does the private key stay during sign-in?',
    ),
    choices: [
      words('Im Posteingang', 'In your inbox'),
      words(
        'Geschützt beim Authentifikator oder Passkey-Anbieter',
        'Protected by the authenticator or passkey provider',
      ),
      words('Auf der Website', 'On the website'),
    ],
    answer: 1,
    explanation: words(
      'Der Dienst sendet eine neue Anfrage. Dein Authentifikator signiert sie, und der Dienst prüft die Signatur mit dem öffentlichen Schlüssel.',
      'The service sends a fresh challenge. Your authenticator signs it, and the service checks the signature with the public key.',
    ),
  },
  {
    prompt: words(
      'Was erhält die Website, wenn du Face ID nutzt?',
      'What does the website receive when you use Face ID?',
    ),
    choices: [
      words('Ein Foto deines Gesichts', 'A picture of your face'),
      words('Deine Geräte-PIN', 'Your device PIN'),
      words('Einen signierten Nachweis', 'A signed response'),
    ],
    answer: 2,
    explanation: words(
      'Face ID prüft dich auf dem Gerät. Die Website erhält den signierten Anmeldenachweis und das Ergebnis der lokalen Prüfung.',
      'Face ID checks you on your device. The website receives the signed response and the outcome of local verification.',
    ),
  },
  {
    prompt: words(
      'Warum hilft ein Passkey gegen Phishing?',
      'Why does a passkey help against phishing?',
    ),
    choices: [
      words('Er ist an den legitimen Dienst gebunden', 'It is bound to the legitimate service'),
      words('Er blockiert alle verdächtigen E-Mails', 'It blocks every suspicious email'),
      words('Er wird jeden Tag ersetzt', 'It is replaced every day'),
    ],
    answer: 0,
    explanation: words(
      'Der Browser prüft die Dienstkennung. Eine fremde Domain kann den Passkey des echten Dienstes nicht für sich anfordern.',
      'The browser checks the service identity. An unrelated domain cannot request the legitimate service’s passkey for itself.',
    ),
  },
  {
    prompt: words(
      'Wie bereitest du dich auf einen verlorenen Sicherheitsschlüssel vor?',
      'How can you prepare for losing a security key?',
    ),
    choices: [
      words('Die PIN auf den Schlüssel schreiben', 'Write the PIN on the key'),
      words(
        'Einen unabhängigen Ersatz registrieren und testen',
        'Register and test an independent backup',
      ),
      words('Ein Foto des Schlüssels aufnehmen', 'Take a photo of the key'),
    ],
    answer: 1,
    explanation: words(
      'Ein separat registrierter Ersatz oder ein getesteter Wiederherstellungsweg kann den Zugriff erhalten. Ein gerätegebundener Passkey lässt sich nicht vom verlorenen Schlüssel zurückholen.',
      'A separately registered backup or a tested recovery route can preserve access. A device-bound passkey cannot be retrieved from the missing key.',
    ),
  },
  {
    prompt: words(
      'Kann ein Passwortmanager Passkeys speichern?',
      'Can a password manager store passkeys?',
    ),
    choices: [
      words(
        'Ja, wenn er Passkeys auf deinem Gerät unterstützt',
        'Yes, if it supports passkeys on your device',
      ),
      words('Nur mit einem USB-Schlüssel', 'Only with a USB key'),
      words('Nur für ein einziges Konto', 'Only for one account'),
    ],
    answer: 0,
    explanation: words(
      'Kompatible Passwortmanager verwalten Passkeys. Welche Browser, Geräte und Synchronisationswege sie unterstützen, hängt vom Anbieter ab.',
      'Compatible password managers can manage passkeys. Supported browsers, devices, and sync methods vary by provider.',
    ),
  },
  {
    prompt: words('Was macht einen Passkey gerätegebunden?', 'What makes a passkey device-bound?'),
    choices: [
      words('Er funktioniert nur im Heimnetz', 'It only works on your home network'),
      words('Er wird über das Gerätekonto synchronisiert', 'It syncs through a device account'),
      words(
        'Sein privater Schlüssel bleibt auf einem Authentifikator',
        'Its private key stays on one authenticator',
      ),
    ],
    answer: 2,
    explanation: words(
      'Ein gerätegebundener Passkey bleibt auf diesem Authentifikator. Ein synchronisierter Passkey kann über seinen Anbieter auf weiteren freigegebenen Geräten nutzbar sein.',
      'A device-bound passkey stays on its authenticator. A synced passkey can become available on other approved devices through its provider.',
    ),
  },
]
