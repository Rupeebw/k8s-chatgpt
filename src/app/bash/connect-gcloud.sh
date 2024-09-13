#!/bin/bash

# cluster_info.sh

# Set these variables
PROJECT_ID="your-project-id"
CLUSTER_NAME="your-cluster-name"
ZONE="your-cluster-zone"

# Set the project
gcloud config set project $PROJECT_ID

# Get cluster credentials
gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE

# Print cluster information
echo "Cluster Information:"
kubectl cluster-info

echo "\nNodes:"
kubectl get nodes

echo "\nPods across all namespaces:"
kubectl get pods --all-namespaces

echo "\nServices across all namespaces:"
kubectl get services --all-namespaces

echo "\nCluster events:"
kubectl get events --sort-by=.metadata.creationTimestamp

echo "\nComponent statuses:"
kubectl get componentstatuses

echo "\nResource usage - Nodes:"
kubectl top nodes

echo "\nResource usage - Pods:"
kubectl top pods --all-namespaces