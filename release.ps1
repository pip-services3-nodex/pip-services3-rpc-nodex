#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$package = Get-Content -Path "package.json" | ConvertFrom-Json

# Verify component and package version
if ($component.version -ne $package.version) {
    Write-Error "Versions in component.json and package.json do not match"
}

# Automatically login to npm registry by npm-cli-login
if (-not [string]::IsNullOrEmpty($env:NPM_USER) -and`
    -not [string]::IsNullOrEmpty($env:NPM_PASS) -and`
    -not [string]::IsNullOrEmpty($env:NPM_EMAIL)) {
    if (npm whoami -ne $env:NPM_USER) {
        Write-Host "Logging to npmjs registry by npm-cli-login..."
        npm-cli-login
    }
} 

# Automatically login to npm registry by putting token to .npmrc
if (-not [string]::IsNullOrEmpty($env:NPM_TOKEN)) {
    Write-Host "Creating project scope .npmrc"
    Set-Content -Path ".npmrc" -Value '//registry.npmjs.org/:_authToken=${NPM_TOKEN}'
}

Write-Host "Getting $($package.name) versions from npm registry..."

# Check if version exist on npmjs
$npmjsPackageVersionsRaw = npm view $package.name versions
if ($npmjsPackageVersionsRaw[0] -ne "[") { # if npm returned str instead of array
    $npmjsPackageVersionsRaw = "[ '$npmjsPackageVersionsRaw' ]"
}
$npmjsPackageVersions = $npmjsPackageVersionsRaw | ConvertFrom-Json
if ($npmjsPackageVersions -contains $package.version) {
    Write-Host "Package already exists on npmjs, publish skipped."
} else {
    # Publish to npm repository
    Write-Host "Publishing $($package.name) to npm registry..."
    npm publish
}

# Check for successfull release
if ($LastExitCode -ne 0) {
    Write-Error "Error on npm publish."
}
