# TravauxMinute — site V1

Cette V1 est volontairement conçue comme un site de conversion / lead generation, pas comme un simple site vitrine.

## Ce qui est déjà fait
- Homepage responsive
- Positionnement centré sur les urgences liées à l’eau et la rénovation à Paris
- Formulaire en 4 étapes
- Capture des UTM / gclid en session
- Pages SEO de services
- Meta title / description / canonical
- Données structurées Organization + Website + Service
- Sitemap + robots.txt
- Mentions légales / confidentialité / conditions en brouillon
- Design mobile-first
- Aucune fausse note, aucun faux avis, aucune promesse de délai inventée

## AVANT MISE EN LIGNE
1. Remplacer les champs juridiques dans `mentions-legales.html`.
2. Faire valider le modèle juridique, la politique de confidentialité et les conditions.
3. Connecter le formulaire à un vrai endpoint CRM / Make / Zapier / HubSpot / Pipedrive.
4. Ajouter upload de photos (Cloudinary/S3 ou formulaire CRM).
5. Ajouter votre numéro tracké si vous voulez un CTA téléphone.
6. Installer GA4 + Google Tag Manager + consentement cookies adapté.
7. Ajouter Search Console.
8. Remplacer les contenus génériques par les vrais services réellement couverts.
9. Ajouter uniquement de vraies réalisations et de vrais avis.
10. Confirmer les zones et horaires avant de les afficher.
11. Adapter impérativement l'affichage prix / devis / CGV au modèle juridique et commercial réellement retenu avant lancement.

## Stratégie recommandée
Ne pas générer 20 pages d'arrondissement quasi identiques. Commencer par des pages services fortes, obtenir des données,
puis créer des pages locales utiles uniquement lorsqu'il existe du contenu réellement spécifique.

## Formulaire
Le formulaire est en mode démonstration. Dans `script.js`, remplacer le bloc `console.log(...)`
par un POST vers votre automatisation / CRM.

## Lancer en local
Ouvrir `index.html` dans un navigateur, ou servir le dossier via un serveur statique.

## Déploiement
Compatible avec Netlify, Vercel, Cloudflare Pages ou un hébergement statique classique.


## Mise à jour V3
- Couverture annoncée : toute l’Île-de-France (75, 77, 78, 91, 92, 93, 94, 95)
- Formulaire accepte les codes postaux franciliens
- Grille tarifaire plomberie/dépannage ajoutée sur la page d’accueil
- Déplacement hors secteur affiché à 0,80 € HT/km
- Majorations urgence / soir-samedi / dimanche-jour férié ajoutées
