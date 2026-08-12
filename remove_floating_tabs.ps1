$files = @(
    'c:\base\src\app\admissions\page.tsx',
    'c:\base\src\app\admission-process\page.tsx',
    'c:\base\src\app\about-us\philosophy\page.tsx',
    'c:\base\src\app\about-us\page.tsx',
    'c:\base\src\app\about-us\mandatory-disclosure\page.tsx',
    'c:\base\src\app\about-us\curriculum\page.tsx'
)

$pattern = '(?s)[ \t]*\{\/\* Floating Contact Tab \(Right edge\) \*\/\}.*?CONTACT\s*<\/a>\s*<\/div>\r?\n?'

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match $pattern) {
            $newContent = $content -replace $pattern, ''
            Set-Content $file -Value $newContent -NoNewline
            Write-Host "Removed from: $file"
        } else {
            Write-Host "Not found in: $file (might be slightly different formatting)"
        }
    }
}
