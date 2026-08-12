$files = @(
    'c:\base\src\components\Footer.tsx',
    'c:\base\src\components\HeroSection.tsx',
    'c:\base\src\components\ContactSection.tsx',
    'c:\base\src\components\GalleryView.tsx',
    'c:\base\src\components\MessagesSection.tsx',
    'c:\base\src\components\CoursesSection.tsx',
    'c:\base\src\components\ObjectivesSection.tsx',
    'c:\base\src\components\StatsSection.tsx',
    'c:\base\src\components\TestimonialsSection.tsx',
    'c:\base\src\components\EventsSection.tsx',
    'c:\base\src\components\About.tsx',
    'c:\base\src\components\Navbar.tsx',
    'c:\base\src\app\about-us\page.tsx',
    'c:\base\src\app\about-us\philosophy\page.tsx',
    'c:\base\src\app\about-us\leadership\page.tsx',
    'c:\base\src\app\about-us\curriculum\page.tsx',
    'c:\base\src\app\about-us\mandatory-disclosure\page.tsx',
    'c:\base\src\app\contact-us\page.tsx',
    'c:\base\src\app\gallery\page.tsx'
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace '#126b59', '#003262'
        $content = $content -replace '#F9A826', '#FDB515'
        $content = $content -replace '#f97316', '#FDB515'
        $content = $content -replace '#F97316', '#FDB515'
        $content = $content -replace '#fce354', '#FDB515'
        $content = $content -replace '#489196', '#003262'
        $content = $content -replace '#de5c6c', '#FDB515'
        $content = $content -replace '#312e81', '#003262'
        $content = $content -replace '#1e1b4b', '#001f3d'
        $content = $content -replace '#ea580c', '#e5a010'
        Set-Content $file -Value $content -NoNewline
        Write-Host "Updated: $file"
    } else {
        Write-Host "Not found: $file"
    }
}
Write-Host "Done!"
