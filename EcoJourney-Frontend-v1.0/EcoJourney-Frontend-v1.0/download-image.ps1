# PowerShell script to download a scenic 'road surrounded by trees' image from Pexels
# Requires internet. Save and run in the project root (as Administrator if necessary).
$imgUrl = "https://images.pexels.com/photos/34950/pexels-photo.jpg"  # example image URL (change if you prefer)
$dest = Join-Path -Path (Get-Location) -ChildPath "public/assets/dashboard-bg.jpg"
New-Item -ItemType Directory -Path (Split-Path $dest) -Force | Out-Null
Write-Host "Downloading image from $imgUrl ..."
try {
  Invoke-WebRequest -Uri $imgUrl -OutFile $dest -UseBasicParsing
  Write-Host "Saved to $dest"
} catch {
  Write-Error "Download failed. Please download the image manually and place it at public/assets/dashboard-bg.jpg"
}
