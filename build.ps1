#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component metadata and set necessary variables
$component = Get-Content -Path "$PSScriptRoot/component.json" | ConvertFrom-Json
$buildImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)-build"
$container=$component.name

# Remove build files
if (Test-Path -Path "$PSScriptRoot/obj") {
    Remove-Item -Recurse -Force -Path "$PSScriptRoot/obj"
}

# Copy private keys to access git repo
if (-not (Test-Path -Path "$PSScriptRoot/docker/id_rsa")) {
    if (-not [string]::IsNullOrEmpty($env:GIT_PRIVATE_KEY)) {
        Write-Host "Creating docker/id_rsa from environment variable..."
        Set-Content -Path "$PSScriptRoot/docker/id_rsa" -Value $env:GIT_PRIVATE_KEY
    } elseif (Test-Path -Path "~/.ssh/id_rsa") {
        Write-Host "Copying ~/.ssh/id_rsa to docker..."
        Copy-Item -Path "~/.ssh/id_rsa" -Destination "docker"
    } else {
        Write-Host "Missing ~/.ssh/id_rsa file..."
        Set-Content -Path "$PSScriptRoot/docker/id_rsa" -Value ""
    }
}

# Copy .npmrc to docker folder to use it inside container
if (-not (Test-Path -Path "$PSScriptRoot/docker/.npmrc")) {
    if (-not [string]::IsNullOrEmpty($env:NPM_TOKEN)) {
        Write-Host "Creating docker/.npmrc from environment variable..."
        Set-Content -Path "$PSScriptRoot/docker/.npmrc" -Value "//registry.npmjs.org/:_authToken=$($env:NPM_TOKEN)"
    } elseif (Test-Path -Path "~/.npmrc") {
        Write-Host "Copying ~/.npmrc to docker..."
        Copy-Item -Path "~/.npmrc" -Destination "docker" 
    } else {
        Write-Host "Missing ~/.npmrc file..."
        Set-Content -Path "$PSScriptRoot/docker/.npmrc" -Value ""
    }
}

# Build docker image
docker build -f "$PSScriptRoot/docker/Dockerfile.build" -t $buildImage .

# Create and copy compiled files, then destroy
docker create --name $container $buildImage
docker cp "$($container):/app/obj" "$PSScriptRoot/obj"
docker rm $container

# Verify that obj folder was indeed created after build
if (-not (Test-Path -Path "$PSScriptRoot/obj")) {
    Write-Error "obj folder doesn't exist in root dir. Build failed. See logs above for more information."
}
