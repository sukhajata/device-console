A React app for viewing and configuring IoT devices.

helm upgrade --install \
    --namespace web-apps \
    --set namespace=web-apps,image.tag=1815 \
    device-console \
    powerpilot-admin-helm
