# scripts/setup-and-deploy.ps1
# Usage: from repo root run: .\scripts\setup-and-deploy.ps1
# Interactive helper to checkout the NOVAWEB branch, install deps, create a local .env and
# start the dev server or prepare a Vercel deployment.

Write-Host "== NovaWeb: Setup & Deploy helper ==" -ForegroundColor Cyan

# 1) Git: fetch & checkout NOVAWEB
Write-Host "-> Git: fetch and checkout branch NOVAWEB" -ForegroundColor Yellow
git fetch origin
try {
  git rev-parse --verify --quiet NOVAWEB > $null 2>&1
  $hasBranch = $LASTEXITCODE -eq 0
} catch {
  $hasBranch = $false
}
if (-not $hasBranch) {
  git checkout -b NOVAWEB origin/NOVAWEB
} else {
  git checkout NOVAWEB
  git pull origin NOVAWEB
}

# 2) Install dependencies
Write-Host "-> Installing dependencies (npm ci if package-lock present, else npm install)" -ForegroundColor Yellow
if (Test-Path package-lock.json) {
  npm ci
} else {
  npm install
}

# 3) Create .env.local interactively (won't be committed)
$envPath = ".env.local"
if (Test-Path $envPath) {
  Write-Host "Found existing .env.local — backing it up to .env.local.bak" -ForegroundColor Yellow
  Copy-Item $envPath ".env.local.bak" -Force
}

Write-Host ""; Write-Host "Configuration du formulaire : choisis le mode de test:" -ForegroundColor Cyan
Write-Host "  1) Test rapide (Formspree) - pas de serverless nécessaire"
Write-Host "  2) Serverless (SendGrid) - nécessite clés SendGrid et test en local via vercel dev ou déploiement"
$mode = Read-Host "Choix (1 or 2). Tape 1 ou 2 puis Enter"

# Template values
$viteFormspree = ""
$useServerless = "false"
$sendgridApiKey = ""
$sendgridTo = ""
$sendgridFrom = ""

if ($mode -eq "1") {
  $viteFormspree = Read-Host "Entrez ton endpoint Formspree (ex: https://formspree.io/f/xxxxx). Laisse vide pour valeur par défaut (test)"
  if ([string]::IsNullOrWhiteSpace($viteFormspree)) {
    $viteFormspree = "https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT"
    Write-Host "Utilisation de la valeur par défaut Formspree (remplace-la plus tard dans .env.local)" -ForegroundColor Yellow
  }
} elseif ($mode -eq "2") {
  $useServerless = "true"
  $sendgridApiKey = Read-Host "SENDGRID_API_KEY (colle la clé ici)"
  $sendgridTo = Read-Host "SENDGRID_TO (email qui recevra les messages)"
  $sendgridFrom = Read-Host "SENDGRID_FROM (adresse From vérifiée SendGrid)"
  if ([string]::IsNullOrWhiteSpace($sendgridApiKey) -or [string]::IsNullOrWhiteSpace($sendgridTo) -or [string]::IsNullOrWhiteSpace($sendgridFrom)) {
    Write-Host "Attention: tu as choisi serverless mais n'as pas fourni toutes les variables SendGrid." -ForegroundColor Red
    Write-Host "Tu pourras ajouter ces variables plus tard (Vercel dashboard / vercel env add)." -ForegroundColor Yellow
  }
} else {
  Write-Host "Choix invalide, j'utilise Formspree par défaut." -ForegroundColor Yellow
  $viteFormspree = "https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT"
}

# Generate .env.local
$envContents = @()
if (-not [string]::IsNullOrWhiteSpace($viteFormspree)) {
  $envContents += "VITE_FORMSPREE=$viteFormspree"
}
$envContents += "VITE_USE_SERVERLESS=$useServerless"
if ($useServerless -eq "true") {
  if (-not [string]::IsNullOrWhiteSpace($sendgridApiKey)) {
    $envContents += "SENDGRID_API_KEY=$sendgridApiKey"
  }
  if (-not [string]::IsNullOrWhiteSpace($sendgridTo)) {
    $envContents += "SENDGRID_TO=$sendgridTo"
  }
  if (-not [string]::IsNullOrWhiteSpace($sendgridFrom)) {
    $envContents += "SENDGRID_FROM=$sendgridFrom"
  }
}

$envContents | Out-File -FilePath $envPath -Encoding utf8
Write-Host ".env.local créé/écrasé (ne pas committer)." -ForegroundColor Green

# 4) Choix: démarrer le dev server ou vercel dev
Write-Host ""; Write-Host "Que veux-tu faire maintenant ?" -ForegroundColor Cyan
Write-Host "  a) Lancer le dev server Vite (rapide, front-end) -> npm run dev"
Write-Host "  b) Lancer vercel dev (émule serverless /api/local) -> vercel dev (nécessite vercel CLI et login)"
Write-Host "  c) Finir / préparer le déploiement sur Vercel (préparer variables et push)"
$action = Read-Host "Choix (a/b/c)"

if ($action -eq "a") {
  Write-Host "Démarrage Vite dev..." -ForegroundColor Yellow
  Write-Host "Ouvre http://localhost:5173/ (ou URL affichée par Vite) pour tester." -ForegroundColor Green
  npm run dev
} elseif ($action -eq "b") {
  Write-Host "=> vercel dev mode selected. Vérifie que tu as installé vercel CLI: npm i -g vercel" -ForegroundColor Yellow
  Write-Host "Si non connecté, exécute: vercel login" -ForegroundColor Yellow
  Write-Host "Démarrage de vercel dev..." -ForegroundColor Green
  vercel dev
} elseif ($action -eq "c") {
  Write-Host "Préparation du déploiement Vercel..." -ForegroundColor Yellow
  Write-Host "Rappels:" -ForegroundColor Cyan
  Write-Host "- Va sur https://vercel.com/dashboard et crée/importe le projet en liant ton repo GitHub." -ForegroundColor Cyan
  Write-Host "- Ajoute les variables d'environnement (VITE_USE_SERVERLESS, VITE_FORMSPREE, SENDGRID_API_KEY, SENDGRID_TO, SENDGRID_FROM) dans Production (et Preview si tu veux tester)." -ForegroundColor Cyan
  Write-Host ""
  $doPush = Read-Host "Prêt à pousser les changements sur origin/NOVAWEB et déclencher un déploiement Vercel ? (y/N)"
  if ($doPush -eq "y") {
    git add -A
    git commit -m "chore: prepare for vercel deployment (env local changes ignored)"
    git push origin NOVAWEB
    Write-Host "Pushed. Sur Vercel, le déploiement va se déclencher (ou importe le projet manuellement si nécessaire)." -ForegroundColor Green
  } else {
    Write-Host "Ok, pousse manuellement quand tu es prêt." -ForegroundColor Yellow
  }
} else {
  Write-Host "Choix inconnu : fin du script." -ForegroundColor Yellow
}

Write-Host "== Script terminé. Si tu veux, je peux créer ce script dans le repo (non commit .env.local)." -ForegroundColor Cyan
