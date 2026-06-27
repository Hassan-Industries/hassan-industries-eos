$ErrorActionPreference = "Stop"

Write-Host "HIEOS shell standardization cleanup starting..." -ForegroundColor Cyan

$projectRoot = (Get-Location).Path

$tsxFiles = Get-ChildItem -Path ".\app", ".\components" -Recurse -Include "*.tsx" | Where-Object {
    $_.FullName -notlike "*\app\layout.tsx" `
    -and $_.FullName -notlike "*\components\layout\Sidebar.tsx" `
    -and $_.FullName -notlike "*\components\layout\Topbar.tsx"
}

foreach ($file in $tsxFiles) {
    $original = Get-Content -Raw -LiteralPath $file.FullName
    $updated = $original

    # Remove legacy direct layout imports from all route/component files.
    $updated = $updated -replace 'import\s+Sidebar\s+from\s+["'']@/components/layout/Sidebar["''];\s*', ''
    $updated = $updated -replace 'import\s+Topbar\s+from\s+["'']@/components/layout/Topbar["''];\s*', ''

    # Remove rendered duplicate shell components.
    $updated = $updated -replace '<Sidebar\s*/>\s*', ''
    $updated = $updated -replace '<Topbar\s*/>\s*', ''
    $updated = $updated -replace '<Sidebar\s*>\s*</Sidebar>\s*', ''
    $updated = $updated -replace '<Topbar\s*>\s*</Topbar>\s*', ''

    # Remove legacy content offsets that were used when pages owned their own sidebar.
    $legacyOffsetTokens = @(
        'lg:ml-\[280px\]',
        'lg:pl-\[280px\]',
        'ml-\[280px\]',
        'pl-\[280px\]',
        'lg:ml-72',
        'lg:pl-72',
        'ml-72',
        'pl-72',
        'lg:ml-\[18rem\]',
        'lg:pl-\[18rem\]',
        'ml-\[18rem\]',
        'pl-\[18rem\]'
    )

    foreach ($token in $legacyOffsetTokens) {
        $updated = $updated -replace "\s*$token", ''
    }

    # Clean common empty spacing left in className strings.
    $updated = $updated -replace 'className="\s+', 'className="'
    $updated = $updated -replace '\s+"', '"'
    $updated = $updated -replace '\s{2,}', ' '

    if ($updated -ne $original) {
        Set-Content -LiteralPath $file.FullName -Value $updated -NoNewline
        Write-Host "Cleaned shell imports/offsets:" $file.FullName -ForegroundColor Yellow
    }
}

Write-Host "Removing stale Next cache..." -ForegroundColor Cyan
Remove-Item -Recurse -Force ".\.next" -ErrorAction SilentlyContinue

Write-Host "Verifying remaining direct Sidebar/Topbar imports..." -ForegroundColor Cyan
Select-String -Path ".\app\**\*.tsx", ".\components\**\*.tsx" -Pattern 'from "@/components/layout/Sidebar"|from "@/components/layout/Topbar"'

Write-Host "Cleanup complete. Expected remaining direct shell imports should be app\layout.tsx only." -ForegroundColor Green