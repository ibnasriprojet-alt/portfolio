# NOTES — Mémoire du projet Portfolio HLN

> Ce fichier sert de « mémoire » au projet : toutes les décisions et préférences y sont notées
> pour ne rien perdre entre les sessions.

## Identité
- **Nom** : Héléna Boirard (initiales HLN)
- **Formation** : BUT Information & Communication (Info-Com)
- **E-mail** : h.boirard@orange.fr
- **LinkedIn** : https://www.linkedin.com/in/helenaboirard
- **Instagram** : https://www.instagram.com/hln.brd/ (@hln.brd)
- **Langues** : français (langue paternelle), anglais B2, espagnol A2, shimaore (langue maternelle)
  — formulation voulue par Héléna, ne pas « corriger » en langue maternelle pour le français.

## Historique des décisions
1. Première version construite par l'assistant : minimaliste sombre (fond quasi noir, accent violet).
2. Héléna a ensuite écrit son propre code : site multi-pages, fond gris `#5f5f5f`, gros titre
   900 uppercase, photo de droite, boutons « pills » à bordure noire qui s'inversent au survol.
3. **Décision finale : fusion des deux** — le style visuel d'Héléna (néo-brutaliste : gris,
   bordures noires épaisses, ombres dures, pills) + les sections complètes (À propos,
   Projets, Compétences, Contact avec formulaire Netlify). Site one-page avec ancres.
4. **Composants portés en vanilla** (Héléna a fourni des composants React/Tailwind, mais le
   site reste HTML/CSS/JS pur — les effets ont été recréés à l'identique) :
   - Navbar « tubelight » : pilule flottante en verre dépoli (`tube-nav`), la lueur blanche
     glisse entre les liens avec un rebond (`tube-lamp` animé via JS + cubic-bezier).
     En bas de l'écran sur mobile avec icônes seules, en haut sur desktop. Le sélecteur
     FR/EN est devenu une petite pilule fixe séparée en haut à droite (`lang-pill`).
   - Boutons « liquid glass » : `.btn-glass` avec reflets internes (box-shadow inset),
     brillance haute, zoom au survol et distorsion SVG `#container-glass` (définie dans un
     `<svg>` caché en fin de page, appliquée en `backdrop-filter` quand le navigateur le
     supporte). Utilisés pour : CTAs du hero, bouton CV, bouton d'envoi du formulaire.

## Choix techniques actuels
| Élément | Décision |
|---|---|
| Stack | HTML / CSS / JS pur (aucun framework) |
| Style | Néo-brutaliste : fond `#5f5f5f`, cartes `#454545`, bordures `#161616` 3px, ombres dures, boutons pills |
| Typo | Archivo (Google Fonts), graisse 900 pour les titres uppercase |
| Structure | One-page FR (`index.html`) + miroir EN (`en/index.html`) |
| Sections | Accueil (nom centré + photo à gauche + gros boutons à droite), À propos, Mes projets, Compétences, Contact (formulaire fonctionnel) |
| JS | Lampe tube-nav, apparitions au scroll, lien de nav actif, année auto, formulaire FormSubmit, mascote Bloub (yeux + penché + frisson), bascule de thème |
| Déploiement | **GitHub** (`ibnasriprojet-alt/portfolio`) → **Vercel**, redeploiement auto à chaque push |

## Thème « fraise » (bascule au clic sur Bloub)
- Palette Color Hunt : `#F6D8BD` fond crème · `#F39399` cartes corail · `#CF4173` accents framboise · `#5D3140` contours/texte prune.
- Implémenté via variables CSS (`[data-theme="fraise"]` sur `<html>`), transition douce 0,4 s.
- Choix **mémorisé** dans `localStorage("theme")`.
- Photos propres à chaque thème : gris = `hero.jpg`/`about.jpg`, fraise = `hero-fraise.jpg`/`about-fraise.jpg`
  (échange automatique via attribut `data-fraise` sur les `<img>`).
- Originaux lourds protégés par `.gitignore` (`IMG_*.jpeg`, `docs/papy'z/`, etc.).

## Mascote Bloub 🫠
- SVG dessiné en code (pas de gif) : capsule grise `#9a9a9a`, contour noir, ombre dure.
- Yeux qui suivent la souris (pupilles) **et** corps qui se penche vers le curseur (`.bloub-lean`).
- Cligne des yeux (animation CSS), flotte doucement.
- **Clic = frisson** (« comme s'il avait froid ») + petit « brr ! » qui apparaît.
- Le clic déclenche aussi la bascule du thème fraise/gris.
- Caché sous 900 px (place au menu mobile), respecte `prefers-reduced-motion`.

## Formulaire de contact
- **FormSubmit.co** (pas Netlify — le site est sur Vercel) → les messages arrivent sur h.boirard@orange.fr.
- Envoi en AJAX (`formsubmit.co/ajax/…`), messages de succès/erreur intégrés à la page (FR/EN).
- Anti-spam : champ `_honey` invisible.
- ⚠️ Première utilisation : cliquer le lien d'activation reçu par e-mail (une seule fois).

## Règle de contenu (très important)
- **Les placeholders sont des consignes conjuguées à la première personne** — Héléna se
  parle à elle-même pour se souvenir de quoi remplir : « J'écris ici mon parcours… »,
  « Je décris ce projet… », « J'écris ma ville ici », etc.
- Ce ne sont PAS des textes de présentation rédigés : c'est le même style d'instruction
  qu'au départ (« Écris ici… ») mais vu par la première personne.
- Textes réels déjà intégrés : présentation « À propos » (BUT 2ᵉ année parcours COMOR,
  spécialisation réseaux sociaux), description Papy'z, invitation Contact.
- La photo du hero est `images/hero.jpg` (optimisée depuis `HLN.PNG`) et celle du About est
  `images/about.jpg` (optimisée depuis `HLN02.png`, 12 Mo → 123 Ko). Les originales restent
  dans `images/` mais ne sont pas utilisées par le site.

## Documents (dossier `docs/`)
- `docs/cv-helena-boirard.pdf` → CV téléchargeable, branché sur les boutons des deux langues.
- `docs/kena-club.pdf` → projet « Kena Club » : magazine (7 pages A4) créé avec Kerene
  Mbokoso pour répertorier les événements culturels parisiens. Optimisé 7,7 Mo → 2 Mo,
  ouvert dans un nouvel onglet depuis la carte projet n°1. Miniature de couverture :
  `images/projet-1.jpg` (générée automatiquement depuis la page 1).
- `docs/papyz-plan-communication.pdf` → projet n°2 « Big Papy'z Burger » : plan de
  communication fictif pour un fast-food de Vitry-sur-Seine (étude de marché, personas,
  SWOT, affichage 4×3). Converti depuis le .docx d'Héléna (8,8 Mo → 832 Ko). Couverture :
  `images/projet-2.jpg` (photo du burger, optimisée). Tags : Plan de communication / Fictif.
- `docs/BOIRARD-magasin.pdf` → original haute qualité du magazine (nom d'origine),
  non utilisé par le site (archive).
- NB : le nom d'origine du CV contenait des accents décomposés ; il a été renommé en
  `cv-helena-boirard.pdf` pour une URL fiable sur le web.
- Dossier `docs/papy'z/` : fichiers bruts d'Héléna (docx + photos) — **ignorés par git**,
  restent sur son PC uniquement.

## À faire plus tard (checklist d'Héléna)
- [x] Déposer ses photos → fait : `hero.jpg` + `about.jpg` (gris), `hero-fraise.jpg` +
      `about-fraise.jpg` (fraise, depuis IMG_9522 et IMG_1276)
- [x] CV ajouté → `docs/cv-helena-boirard.pdf`
- [x] Projet « Kena Club » intégré (carte 1 + PDF + miniature + description réelle)
- [x] Projet « Big Papy'z Burger » intégré (carte 2 + PDF + photo burger + description)
- [ ] Ajouter projets 3 et 4 (cartes placeholder en attente de visuels/titres/descriptions)
- [ ] Remplir le champ « Ville » dans À propos (« J'écris ma ville ici »)
- [x] Liens LinkedIn / Instagram branchés (Contact + footer, nouvelles fenêtres)
- [x] Langues remplies : anglais B2, espagnol A2, shimaore maternelle
- [x] Formulaire de contact fonctionnel → FormSubmit.co vers h.boirard@orange.fr
- [x] Déploiement → GitHub + Vercel, auto à chaque push
