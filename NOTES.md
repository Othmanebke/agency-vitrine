Notes et instructions rapides

- Branche actuelle: NOVAWEB
- Si tu ne peux pas installer Node sur le PC du travail, pas de souci — le code est poussé. Clone et lance sur ton PC perso plus tard.

Commits récents:
- Ajout des composants `Nav` et `Footer`.
- Mise à jour de `Home.jsx` pour utiliser Nav, Hero, services et ContactForm.

Pour récupérer ces changements sur une autre machine:

```powershell
git clone https://github.com/othmanebke/agency-vitrine.git
cd agency-vitrine
git checkout NOVAWEB
npm install
npm run dev
```

Si tu veux que je pousse d'autres commits, je peux continuer et tu pulls ensuite.

Form / contact notes:

- Le formulaire dans `src/components/ContactForm.jsx` peut utiliser une variable d'environnement Vite nommée `VITE_FORMSPREE` qui doit contenir ton endpoint Formspree, par exemple `https://formspree.io/f/xxxxxx`.
- Pour le développement local, crée un fichier `.env` à la racine contenant:

	VITE_FORMSPREE=https://formspree.io/f/your-form-id

	(Vite lit les `.env` au démarrage local; ne commits pas ce fichier si tu mets des secrets.)

 - Sur Vercel: ajoute la variable d'environnement `VITE_FORMSPREE` dans Project Settings → Environment Variables pour la build et le runtime.
 - Serverless option (SendGrid): une function est ajoutée dans `api/contact.js`.

  Pour activer la solution serverless sur Vercel :

  1. Dans Project Settings → Environment Variables, ajoute :
	  - SENDGRID_API_KEY = <ta_clé_sendgrid>
	  - SENDGRID_TO = <ton_email_de_réception>
	  - SENDGRID_FROM = <adresse_from_si_necessaire> (optionnel)
	  - VITE_USE_SERVERLESS = true

  2. Ou en local, crée un fichier `.env` (ne pas committer) :

	  VITE_USE_SERVERLESS=true
	  SENDGRID_API_KEY=your_sendgrid_api_key
	  SENDGRID_TO=you@domain.com
	  SENDGRID_FROM=no-reply@yourdomain.com

  3. Le frontend enverra les données vers `/api/contact` et la function utilisera SendGrid pour envoyer le mail.

  Remarque : si tu préfères ne pas utiliser SendGrid, on peut adapter la function pour utiliser Mailgun, Nodemailer (SMTP) ou un autre fournisseur.

Lottie / animations:

- Le `Hero` intègre maintenant une animation Lottie décorative chargée depuis une URL publique. Si tu veux remplacer par une animation locale (meilleur contrôle), place le JSON dans `src/assets/hero-animation.json` et dans `src/components/Hero.jsx` remplace la constante `LOTTIE_URL` par an import:

	import heroAnim from '../assets/hero-animation.json'

	puis passe `animationData={heroAnim}` au composant `Lottie` ou utilise `LottieWrapper`.

- L'animation respecte la préférence reduced-motion de l'utilisateur.

Vercel quick notes

- `vercel.json` est présent pour guider les builds et exposer les functions sous `/api/`.
- Avant de déployer, ajoute les variables d'environnement dans Project Settings (voir README).
- Si tu veux, je peux aussi créer un alias Vercel et préparer les scripts de déploiement.
