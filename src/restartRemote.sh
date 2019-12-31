echo "Pulling changes"
git pull
echo "Stopping existing container"
docker stop light-remote
echo "Remove existing container"
docker rm light-remote
echo "Build the new docker image"
docker build -t root/light-remote-image .
echo "Running the new container"
docker run --name light-remote --restart always -p 80:8000 -d root/light-remote-image
echo ""

echo "Complete"
echo ""