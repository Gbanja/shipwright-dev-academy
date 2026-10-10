# Builds index.html (for GitHub Pages and local use) from page.html (the Claude artifact version).
# Run from the repo root:  powershell -ExecutionPolicy Bypass -File tools/build-index.ps1
$root = Split-Path -Parent $PSScriptRoot
$page = [IO.File]::ReadAllText((Join-Path $root 'page.html'))
$headLines = @(); $bodyLines = @()
foreach ($line in $page -split "`n") {
  if ($line -match '^\s*<(title|link)\b') { $headLines += $line } else { $bodyLines += $line }
}
$html = @"
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="An interactive, hands-on software engineering academy: Git, Docker, deployment, frontend, Next.js, PHP, Python, SQL, testing, Linux, security, algorithms, system design, cloud and AI.">
$($headLines -join "`n")
<style>html,body{margin:0}[hidden]{display:none!important}img{max-width:100%}</style>
</head>
<body>
$($bodyLines -join "`n")
</body>
</html>
"@
[IO.File]::WriteAllText((Join-Path $root 'index.html'), $html)
Write-Output "Wrote index.html"