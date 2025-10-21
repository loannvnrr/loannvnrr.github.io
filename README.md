# README.md

## TopRep Chine - Site Statique

Ce dépôt contient un site statique bilingue (FR/EN) pour TopRep Chine, hébergé sur GitHub Pages.

### Structure du Dossier
- `/fr/`: Pages en français (index.html, catalogue.html, faq.html, contact.html, mentions.html, et fiches comme hoodie-xyz.html)
- `/en/`: Pages en anglais (index.html, catalog.html, faq.html, contact.html, legal.html, et fiches comme hoodie-xyz.html)
- `/css/`: main.css (styles partagés)
- `/js/`: main.js (JS pour catalogue et favoris)
- `/data/`: data_fr.json et data_en.json (données produits)
- `/images/`: Placez ici les images placeholders (ex: hoodie-xyz-1.jpg)

### Déploiement sur GitHub Pages
1. Créez un dépôt GitHub nommé `username.github.io` pour hébergement root, ou un dépôt normal et activez Pages sur la branche main.
2. Poussez le contenu du dossier.
3. Dans Settings > Pages, sélectionnez la branche main et le dossier root.
4. Le site sera accessible à https://username.github.io/fr/index.html pour FR, etc.

### Maintenance
- Ajoutez de nouvelles fiches : Créez HTML basé sur template-fiche.html, mettez à jour data.json avec nouveau entry.
- Vérifiez Lighthouse pour scores >90.
- Pas de backend ; formulaires via mailto ou services tiers commentés.

Pour dark mode, il est géré via prefers-color-scheme.

Note : Remplacez placeholders comme emails, liens réels, et ajoutez plus de fiches statiques manuellement.