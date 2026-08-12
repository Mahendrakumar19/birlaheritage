Get-ChildItem 'c:\base\src' -Recurse -Filter '*.tsx' | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content `
        -replace '#f97316', '#FDB515' `
        -replace '#F97316', '#FDB515' `
        -replace '#312e81', '#003262' `
        -replace '#489196', '#003262' `
        -replace '#de5c6c', '#FDB515' `
        -replace '#c94555', '#e5a010' `
        -replace '#ef7a08', '#FDB515' `
        -replace '#1e1b4b', '#001f3d'
    if ($newContent -ne $content) {
        Set-Content $_.FullName -Value $newContent -NoNewline
        Write-Host "Updated: $($_.Name)"
    }
}
Write-Host "All done!"
