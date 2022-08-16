#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component metadata and set necessary variables
$component = Get-Content -Path "$PSScriptRoot/component.json" | ConvertFrom-Json
$docsImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)-docs"
$container=$component.name

# Remove documentation files
if (Test-Path -Path "$PSScriptRoot/docs") {
    Remove-Item -Recurse -Force -Path "$PSScriptRoot/docs"
}

# Build docker image
docker build -f "$PSScriptRoot/docker/Dockerfile.docs" -t $docsImage .

# Create and copy compiled files, then destroy
docker create --name $container $docsImage
docker cp "$($container):/app/docs" "$PSScriptRoot/docs"
docker rm $container

# Verify that docs folder was indeed created after generating documentation
if (-not (Test-Path "$PSScriptRoot/docs")) {
    Write-Error "docs folder doesn't exist in root dir. Build failed. See logs above for more information."
}
