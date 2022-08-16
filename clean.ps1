#!/usr/bin/env pwsh

# Recreate image names using the data in the "$PSScriptRoot/component.json" file
$component = Get-Content -Path "$PSScriptRoot/component.json" | ConvertFrom-Json
$buildImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)-build"
$testImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)-test"
$docsImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)-docs"

# Remove docker images
docker rmi $buildImage --force
docker rmi $docsImage --force
docker rmi $testImage --force
docker rmi -f $(docker images -f "dangling=true" -q) # remove build container if build fails
docker image prune --force

# Remove existed containers
$exitedContainers = docker ps -a | Select-String -Pattern "Exit"
foreach($c in $exitedContainers) { docker rm $c.ToString().Split(" ")[0] }

# Remove unused volumes
docker volume rm -f $(docker volume ls -f "dangling=true")

# Clean up build directories
if (Test-Path -Path "$PSScriptRoot/obj") {
    Remove-Item -Recurse -Force "$PSScriptRoot/obj"
}
if (Test-Path -Path "$PSScriptRoot/node_modules") {
    Remove-Item -Recurse -Force "$PSScriptRoot/node_modules"
}
if (Test-Path -Path "$PSScriptRoot/package-lock.json") {
    Remove-Item -Recurse -Force "$PSScriptRoot/package-lock.json"
}