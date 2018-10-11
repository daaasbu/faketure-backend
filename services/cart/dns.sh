#!/bin/bash

# Public IP address of your ingress controller
IP="23.99.252.164"

# Name to associate with public IP address
DNSNAME="faketure-aks-ingress"

# Get the resource-id of the public ip
PUBLICIPID=$(az network public-ip list --query "[?ipAddress!=null]|[?contains(ipAddress, '$IP')].[id]" --output tsv)

# Update public ip address with DNS name
az network public-ip update --ids $PUBLICIPID --dns-name $DNSNAME
