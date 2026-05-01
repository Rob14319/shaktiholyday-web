# Push changes to GitHub and deploy
git add .
$message = Read-Host -Prompt 'Enter commit message'
if (-not $message) { $message = "Update assets and content" }
git commit -m $message
git push origin main
Write-Host "Changes pushed successfully!" -ForegroundColor Green
Pause
