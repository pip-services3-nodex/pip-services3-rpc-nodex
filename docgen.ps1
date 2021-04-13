#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json

$docsImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-docs"
$container=$component.name

# Remove documentation files
if (Test-Path "docs") {
    Remove-Item -Recurse -Force -Path "docs"
}

# Build docker image
docker build -f docker/Dockerfile.docs -t $docsImage .

# Create and copy compiled files, then destroy
docker create --name $container $docsImage
docker cp "$($container):/app/docs" ./docs
docker rm $container
