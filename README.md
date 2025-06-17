# Portfolio Alex Dubois - Designer Graphique & Illustrateur Digital

Un portfolio artistique moderne et interactif créé avec des technologies web natives (HTML5, CSS3, JavaScript ES6+).

## 🎨 Aperçu

Ce portfolio présente le travail d'Alex Dubois, designer graphique et illustrateur digital passionné par l'art numérique depuis 8 ans. Le site met en valeur ses créations à travers une interface moderne, fluide et interactive.

## ✨ Fonctionnalités

### Navigation Horizontale Avancée
- **Scroll horizontal fluide** entre les sections principales
- Navigation par **touches fléchées** et **molette de souris**
- **Touch gestures** optimisés pour mobile et tablette
- **Indicateur de progression** visuel
- **Boutons de navigation** avec états désactivés

### Animations Sophistiquées
- **Intersection Observer API** pour les animations au scroll
- **Effets de parallaxe** sur les images de fond
- **Compteurs animés** (ex: "50+ projets réalisés")
- **Morphing fluide** entre les sections et pages
- **Animations d'apparition** avec délais échelonnés

### Menu Contextuel Personnalisé
- **Menu sur-mesure** au clic droit
- Options contextuelles : "Voir en grand", "Télécharger", "Partager"
- **Design personnalisé** (remplace le menu natif)
- **Positionnement intelligent** selon la position du curseur

### Interface Responsive
- **Adaptation automatique** de la navigation horizontale en verticale sur mobile
- **Menu hamburger** fonctionnel avec animations
- **Grille responsive** pour la galerie de projets
- **Touch gestures** optimisés pour l'expérience mobile

### Fonctionnalités Interactives
- **Système de filtres** pour la galerie de projets
- **Modals détaillées** pour chaque projet
- **Formulaire de contact** avec validation en temps réel
- **FAQ interactive** avec animations d'ouverture/fermeture
- **Barres de progression** pour les compétences

## 🏗️ Structure du Projet

\`\`\`
portfolio/
├── index.html                 # Page d'accueil avec scroll horizontal
├── pages/
│   ├── projets.html          # Galerie des projets avec filtres
│   ├── apropos.html          # Biographie et parcours
│   ├── processus.html        # Méthodologie créative
│   └── contact.html          # Formulaire et informations
├── assets/
│   ├── css/
│   │   └── style.css         # Styles principaux (CSS natif)
│   └── js/
│       └── script.js         # JavaScript principal (ES6+)
└── README.md                 # Documentation
\`\`\`

## 🎯 Pages du Portfolio

### 1. **Accueil** (`index.html`)
- Hero section avec présentation d'Alex Dubois
- Aperçu des projets récents
- Section compétences avec compteurs animés
- Contact rapide avec informations essentielles

### 2. **Projets** (`pages/projets.html`)
- **Projets principaux** :
  - Identité visuelle "Tech Start"
  - Illustration série "Urban Dreams"
  - Packaging "Bio Nature"
  - Web design "Fashion Hub"
- Système de filtres par catégorie
- Modals détaillées pour chaque projet

### 3. **À propos** (`pages/apropos.html`)
- Biographie complète d'Alex Dubois
- Timeline du parcours professionnel
- Compétences détaillées avec barres de progression
- Outils et technologies utilisés
- Philosophie créative

### 4. **Processus** (`pages/processus.html`)
- Méthodologie de travail en 5 étapes
- Timeline détaillée du processus créatif
- Exemples concrets de projets
- Méthodologies et outils utilisés

### 5. **Contact** (`pages/contact.html`)
- Formulaire de contact complet avec validation
- Informations de contact (email, téléphone, localisation)
- FAQ interactive
- Liens vers les réseaux sociaux

## 🛠️ Technologies Utilisées

### Technologies Autorisées UNIQUEMENT
- **HTML5** sémantique avec structure claire
- **CSS3** natif avec Grid, Flexbox, animations, custom properties
- **JavaScript ES6+** natif avec APIs modernes
- **APIs natives** : Intersection Observer, requestAnimationFrame, etc.

### APIs et Fonctionnalités Avancées
- **Intersection Observer API** pour les animations au scroll
- **Touch Events API** pour les gestures mobiles
- **RequestAnimationFrame** pour les animations fluides
- **CSS Custom Properties** pour la gestion des thèmes
- **CSS Grid & Flexbox** pour les layouts responsives

## 🚀 Installation et Utilisation

### Prérequis
- Navigateur moderne (Chrome 90+, Firefox 85+, Safari 14+)
- Serveur web local (optionnel pour le développement)

### Installation
1. **Télécharger** ou cloner le projet
2. **Ouvrir** `index.html` dans un navigateur moderne
3. **Naviguer** entre les pages via le menu principal

### Développement Local
\`\`\`bash
# Serveur Python simple
python -m http.server 8000

# Serveur Node.js avec live-server
npx live-server

# Ou ouvrir directement index.html
\`\`\`

## 🎮 Utilisation

### Navigation Horizontale (Page d'accueil)
- **Flèches gauche/droite** : Navigation entre sections
- **Molette de souris** : Scroll horizontal ou vertical
- **Touch gestures** : Swipe gauche/droite sur mobile
- **Boutons de navigation** : Clic sur les flèches à l'écran

### Fonctionnalités Interactives
- **Clic droit** : Ouvre le menu contextuel personnalisé
- **Filtres projets** : Clic sur les boutons de catégorie
- **Modals** : Clic sur "Voir le projet" dans la galerie
- **FAQ** : Clic sur les questions pour déplier les réponses

### Responsive Design
- **Desktop** : Navigation horizontale complète
- **Tablette** : Adaptation avec touch gestures
- **Mobile** : Navigation verticale avec menu hamburger

## 🎨 Personnalisation

### Couleurs et Thème
Les couleurs sont définies dans les variables CSS (`style.css`) :
\`\`\`css
:root {
  --primary-color: #6366f1;
  --secondary-color: #f59e0b;
  --accent-color: #ec4899;
  /* ... autres variables */
}
\`\`\`

### Images
- **Unsplash** : `https://source.unsplash.com/800x600/?design`
- **Placeholder** : `https://via.placeholder.com/800x600/333/fff?text=Projet`

### Contenu
Modifier directement dans les fichiers HTML :
- Informations personnelles dans `index.html`
- Projets dans `pages/projets.html`
- Biographie dans `pages/apropos.html`

## 📱 Compatibilité

### Navigateurs Supportés
- **Chrome/Edge** 90+
- **Firefox** 85+
- **Safari** 14+
- **Mobile** iOS Safari, Chrome Mobile

### Fonctionnalités Progressives
- **Intersection Observer** : Fallback gracieux
- **Touch Events** : Détection automatique
- **CSS Grid** : Fallback Flexbox
- **Custom Properties** : Fallback couleurs statiques

## 🔧 Fonctionnalités Techniques

### Performance
- **Lazy loading** des images
- **Préchargement** des pages importantes
- **Debouncing** des événements de scroll
- **RequestAnimationFrame** pour les animations

### Accessibilité
- **HTML sémantique** avec rôles ARIA
- **Navigation au clavier** complète
- **Contrastes** respectant les standards WCAG
- **Textes alternatifs** pour toutes les images

### SEO
- **Meta tags** optimisés
- **Structure HTML** sémantique
- **URLs** propres et descriptives
- **Performance** optimisée

## 📞 Contact

**Alex Dubois**  
Designer Graphique & Illustrateur Digital

- **Email** : alex.dubois@email.com
- **Téléphone** : +33 6 12 34 56 78
- **Localisation** : Paris, France

## 📄 Licence

Ce projet est créé à des fins éducatives et de démonstration. Tous les droits sont réservés à Alex Dubois.

---

*Portfolio créé avec passion en utilisant uniquement des technologies web natives pour une performance et une compatibilité optimales.*
