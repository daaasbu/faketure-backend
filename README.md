# faketure-backend

# prerequisites
 1. Minikube or K8s cluster 
 2. Helm installed
 3. Draft installed
 
 # setup and run project
 1. Set context to the proper cluster where you want to deploy yourr app
 2. Install cert manager helm chart (https://docs.microsoft.com/en-us/azure/aks/ingress-tls) use stage for minikube
 3. kubectl create -f services/<file.yaml> for each file in directory
 4. In services/cart and services/product run: draft up
 5. Wait for charts to be deployed to cluster
 6. To run each service individually for development: npm start
