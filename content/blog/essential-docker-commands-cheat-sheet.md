---
title: "Essential Docker Commands: A Complete Cheat Sheet for Developers"
date: 2026-01-14
excerpt: Master Docker with this comprehensive guide to essential commands. From basic container operations to advanced image management, everything you need to work efficiently with Docker.
tags: [Docker, DevOps, Containers, CLI, Cheat Sheet]
image: /blog-featured-images/docker_commands_image.png
---

# Docker Basics: Essential Commands with Examples for Beginners

If you’re getting started with Docker, knowing the basic commands is the first step to managing containers and images effectively. This guide covers the most common Docker commands, explains what they do, and provides practical examples to help you get up and running quickly.

## Managing Docker Images

Docker images are the blueprints for containers. Here’s how to work with them.

### 1. `docker images`
Lists all Docker images stored locally.

**Example:**
```bash
docker images
```
**Output:**
```
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    abc123def456   2 weeks ago    133MB
ubuntu       20.04     xyz789uvw321   3 weeks ago    72.8MB
```

---

### 2. `docker pull`
Downloads an image from Docker Hub to your local machine.

**Syntax:**
```bash
docker pull <IMAGE_NAME>:<VERSION>
```
**Example:**
```bash
docker pull redis:alpine
```

---

### 3. `docker image rm`
Removes a specific image from your local registry.

**Syntax:**
```bash
docker image rm <IMAGE_ID>
```
**Example:**
```bash
docker image rm abc123def456
```

---

### 4. `docker rmi` (alternative)
Same as `docker image rm`, but shorter syntax.

**Example:**
```bash
docker rmi abc123def456
```

---

## Managing Docker Containers

Containers are running instances of images.

### 5. `docker ps`
Lists only running containers.

**Example:**
```bash
docker ps
```

---

### 6. `docker ps -a`
Lists all containers, including stopped ones.

**Example:**
```bash
docker ps -a
```

---

### 7. `docker run`
Creates and starts a new container from an image. If the image isn’t local, Docker pulls it first.

**Basic Syntax:**
```bash
docker run <IMAGE_NAME>:<VERSION>
```

**Common Options:**
- `--name <NAME>` – Assign a custom name to the container.
- `-p <HOST_PORT>:<CONTAINER_PORT>` – Map a host port to a container port.
- `-d` – Run the container in detached (background) mode.
- `-it` – Run interactively with a terminal.

**Example:**
```bash
docker run --name my-web -p 8080:80 -d nginx:latest
```
This runs an Nginx container named `my-web`, mapping host port 8080 to container port 80, in the background.

---

## Running and Stopping Containers

### 8. `docker stop`
Gracefully stops a running container.

**Syntax:**
```bash
docker stop <CONTAINER_ID_OR_NAME>
```
**Example:**
```bash
docker stop my-web
```

---

### 9. `docker start`
Restarts a stopped container.

**Example:**
```bash
docker start my-web
```

---

### 10. `docker restart`
Restarts a running container.

**Example:**
```bash
docker restart my-web
```

---

### 11. `docker pause` / `docker unpause`
Pauses or unpauses a running container without stopping it.

**Example:**
```bash
docker pause my-web
docker unpause my-web
```

---

### 12. `docker kill`
Forcibly stops a container (SIGKILL).

**Example:**
```bash
docker kill my-web
```

---

## Inspecting and Interacting with Containers

### 13. `docker logs`
Shows the logs of a container.

**Example:**
```bash
docker logs my-web
```

**Follow logs in real-time:**
```bash
docker logs -f my-web
```

---

### 14. `docker exec`
Runs a command inside a running container.

**Example:**
```bash
docker exec -it my-web /bin/bash
```
This opens an interactive bash shell inside the `my-web` container.

---

### 15. `docker inspect`
Returns detailed information about a container or image in JSON format.

**Example:**
```bash
docker inspect my-web
```

---

## Cleanup Commands

### 16. `docker container rm`
Removes a stopped container.

**Example:**
```bash
docker container rm my-web
```

**Force remove a running container:**
```bash
docker container rm -f my-web
```

---

### 17. Remove all stopped containers:
```bash
docker container prune
```

---

### 18. Remove all unused images:
```bash
docker image prune -a
```

---

### 19. Remove all images (forceful):
```bash
docker image rm -f $(docker images -aq)
```

---

### 20. Remove all containers (forceful):
```bash
docker container rm -f $(docker ps -aq)
```

---

## Extra Useful Commands

### 21. `docker build`
Builds an image from a Dockerfile.

**Example:**
```bash
docker build -t my-custom-image:1.0 .
```

---

### 22. `docker tag`
Tags an image with a new name or version.

**Example:**
```bash
docker tag my-image:latest my-image:v1
```

---

### 23. `docker network ls`
Lists all Docker networks.

**Example:**
```bash
docker network ls
```

---

### 24. `docker volume ls`
Lists all Docker volumes.

**Example:**
```bash
docker volume ls
```

---

### 25. `docker-compose up`
Starts services defined in a `docker-compose.yml` file.

**Example:**
```bash
docker-compose up -d
```

---

## Conclusion

These Docker commands form the foundation of container management. Practice them regularly to build confidence in deploying, managing, and troubleshooting containers. As you advance, explore Docker Compose, Docker Swarm, and Kubernetes for orchestration.

*Happy Dockering! 🐳*
