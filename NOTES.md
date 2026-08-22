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
| Style | Néo-brutaliste sombre : fond `#5f5f5f`, cartes `#454545`, bordures noires 3px, ombres dures, boutons pills |
| Typo | Archivo (Google Fonts), graisse 900 pour les titres uppercase |
| Structure | One-page FR (`index.html`) + miroir EN (`en/index.html`) |
| Sections | Accueil (hero nom + photo inclinée), About me, Mes projets (4 cartes), Compétences (3 groupes + langues), Contact (formulaire Netlify + e-mail réel) |
| JS | Header sticky qui s'active au scroll, apparitions au scroll (IntersectionObserver), lien de nav actif, année auto |
| Hébergement prévu | Netlify ou Vercel |

## Règle de contenu (très important)
- **Les placeholders sont des consignes conjuguées à la première personne** — Héléna se
  parle à elle-même pour se souvenir de quoi remplir : « J'écris ici mon parcours… »,
  « Je décris ce projet… », « J'écris ma ville ici », etc.
- Ce ne sont PAS des textes de présentation rédigés : c'est le même style d'instruction
  qu'au départ (« Écris ici… ») mais vu par la première personne.
- La photo du hero est `images/hero.jpg` (optimisée depuis `HLN.PNG`) et celle du About est
  `images/about.jpg` (optimisée depuis `HLN02.png`, 12 Mo → 123 Ko). Les originales restent
  dans `images/` mais ne sont pas utilisées par le site.

## Documents (dossier `docs/`)
- `docs/cv-helena-boirard.pdf` → CV téléchargeable, branché sur les boutons des deux langues.
- `docs/kena-club.pdf` → projet « Kena Club » : magazine (7 pages A4) créé avec Kerene
  Mbokoso pour répertorier les événements culturels parisiens. Optimisé 7,7 Mo → 2 Mo,
  ouvert dans un nouvel onglet depuis la carte projet n°1. Miniature de couverture :
  `images/projet-1.jpg` (générée automatiquement depuis la page 1).
- `docs/BOIRARD-magasin.pdf` → original haute qualité du magazine (nom d'origine),
  non utilisé par le site (archive).
- NB : le nom d'origine du CV contenait des accents décomposés ; il a été renommé en
  `cv-helena-boirard.pdf` pour une URL fiable sur le web.

## À faire plus tard (checklist d'Héléna)
- [x] Déposer ses photos → fait : `hero.jpg` (accueil) + `about.jpg` (About me)
- [x] CV ajouté → `docs/cv-helena-boirard.pdf`
- [x] Projet « Kena Club » intégré (carte 1 + PDF + miniature + description réelle)
- [ ] Ajouter les visuels des projets restants → `images/projet-2.jpg` … `projet-4.jpg`
- [ ] Renommer/personnaliser les titres et tags des projets 2 à 4
- [x] Liens LinkedIn / Instagram branchés (Contact + footer, nouvelles fenêtres)
- [x] Langues remplies : anglais B2, espagnol A2, shimaore maternelle
- [ ] Activer le formulaire sur Netlify (détection automatique au déploiement)
- [ ] Déployer sur Netlify/Vercel (glisser-déposer le dossier ou connecter le repo Git)
