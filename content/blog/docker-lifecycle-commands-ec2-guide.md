---
title: "Mastering Docker Lifecycle Commands on EC2"
date: "2026-01-20"
excerpt: "A comprehensive guide to managing Docker containers on AWS EC2. Learn the essential lifecycle commands: run, stop, start, exec, and rm."
author: "Tanmay Vaij"
readTime: "8 min read"
tags: ["Docker", "AWS", "EC2", "DevOps", "Containers"]
image: /blog-featured-images/docker_lifecycle_featured_image.png
---

# Installing Docker on AWS EC2 and Performing Container Lifecycle Operations

In this comprehensive tutorial, we’ll walk through the entire process of setting up Docker on an Amazon EC2 instance and then managing container lifecycles. You’ll learn how to launch an EC2 instance, install Docker, run containers, and perform operations like stop, start, pause, unpause, and kill. We’ll use Redis and Nginx containers as examples.

---

## Prerequisites

- An AWS account (Free Tier eligible)
- Basic familiarity with the AWS Management Console
- A terminal application (like Terminal on macOS/Linux or Git Bash on Windows)

---

## Step 1: Sign in to AWS Account

Navigate to [aws.amazon.com](https://aws.amazon.com) and click **Sign In to the Console**. Enter your credentials to access the AWS Management Console.

![AWS Console Login](/blog-content-images/lifecycle-1.png)

---

## Step 2: Go to EC2 Dashboard and Create a Security Group

In the AWS Management Console, search for **EC2** and select it. In the left sidebar, under **Network & Security**, click **Security Groups**. Then click the orange **Create security group** button.

![EC2 Dashboard - Security Groups](/blog-content-images/lifecycle-2.png)

---

## Step 3: Configure Security Group Inbound Rules (Ports 22, 80, 443)

Give your security group a name (e.g., `docker-sg`) and a description. In the **Inbound rules** section, add three rules:

| Type  | Protocol | Port Range | Source   |
| ----- | -------- | ---------- | -------- |
| SSH   | TCP      | 22         | My IP    |
| HTTP  | TCP      | 80         | Anywhere |
| HTTPS | TCP      | 443        | Anywhere |

In the **Outbound rules**, leave the default **All traffic** to allow all outbound communication. Click **Create security group**.

![Inbound Rules for Security Group](/blog-content-images/lifecycle-3.png)

---

## Step 4: (Optional) Allow Additional Ports Later

We’ll add port 7089 later for testing a web server. You can do that when needed.

![Allow Additional Ports](/blog-content-images/lifecycle-4.png)

---

## Step 5: Create a Key Pair

In the EC2 sidebar, under **Network & Security**, click **Key Pairs**. Then click **Create key pair**.

![Create Key Pair](/blog-content-images/lifecycle-5.png)

---

## Step 6: Name the Key and Set Options

Provide a name for your key pair (e.g., `docker-key`). Keep the default **RSA** as the key pair type and **.pem** as the private key file format. Click **Create key pair**. The key file will download automatically; store it securely—you’ll need it to SSH into your instance.

![Key Pair Settings](/blog-content-images/lifecycle-6.png)

---

## Step 7: Launch an EC2 Instance

In the EC2 dashboard, click the orange **Launch instances** button.

![Launch Instances](/blog-content-images/lifecycle-7.png)

---

## Step 8: Name the Instance and Select Ubuntu OS

Give your instance a name (e.g., `Docker-Host`). Under **Application and OS Images**, select **Ubuntu Server 22.04 LTS (HVM)** – it’s free tier eligible.

![Name Instance and Select Ubuntu](/blog-content-images/lifecycle-8.png)

---

## Step 9: Choose Security Group and Key Pair

Under **Key pair (login)**, select the key pair you created (`docker-key`). Under **Network settings**, click **Edit** and select the security group you created earlier (`docker-sg`). Keep the instance type as `t2.micro` (free tier). Then click **Launch instance**.

![Select Key Pair and Security Group](/blog-content-images/lifecycle-9.png)

---

## Step 10: Connect to the Instance

After the instance is running (status checks passed), select it in the Instances list and click the **Connect** button.

![Connect to EC2 Instance](/blog-content-images/lifecycle-10.png)

---

## Step 11: Use SSH Client to Connect

In the **Connect to instance** page, go to the **SSH client** tab. You’ll see an example command that looks like:

```bash
ssh -i "docker-key.pem" ubuntu@<your-instance-public-ip>
```

Copy this command and run it in your local terminal (make sure your key file has proper permissions: `chmod 400 docker-key.pem`).

![SSH Client Example](/blog-content-images/lifecycle-11.png)

---

## Step 12: Successfully Connected

After running the SSH command, you should see a welcome message and the Ubuntu command prompt. You are now logged into your EC2 instance.

![Connected to EC2 Instance via SSH](/blog-content-images/lifecycle-12.png)

---

## Step 13: Set Up Docker Repository

Now we’ll install Docker. First, update the package list and install required dependencies:

```bash
sudo apt-get update -y
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

![Install Dependencies](/blog-content-images/lifecycle-13.png)

---

## Step 14: Add Docker’s Official GPG Key and Repository

Add Docker’s GPG key to verify package signatures:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Then add the Docker repository:

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

![Add Docker Repository](/blog-content-images/lifecycle-14.png)

---

## Step 15: Install Docker Engine

Update the package list again and install Docker:

```bash
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```

![Install Docker Engine](/blog-content-images/lifecycle-15.png)

---

## Step 16: Start Docker and Enable on Boot

Start the Docker service and enable it to start automatically on system boot:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

Verify Docker is running:

```bash
sudo systemctl status docker
```

You can also run a test container:

```bash
sudo docker run hello-world
```

![Start Docker Service](/blog-content-images/lifecycle-16.png)

---

## Step 17: Add Port 7089 to Security Group Inbound Rules

We’ll later run a container that might use port 7089. To allow external access, add a new inbound rule to your security group:

- **Type**: Custom TCP
- **Port Range**: 7089
- **Source**: Anywhere (0.0.0.0/0)

You can do this from the AWS Console: go to EC2 → Security Groups → select your security group → Inbound rules → Edit inbound rules → Add rule.

![Add Port 7089 Inbound Rule](/blog-content-images/lifecycle-17.png)

---

## Step 18: Access Instance Public IP with Port 7089

Copy the public IPv4 address of your EC2 instance from the Instances dashboard. Paste it into a browser with port 7089, e.g., `http://<your-instance-ip>:7089`. You may not see anything yet because no container is listening on that port. We’ll run containers soon.

![Access Public IP with Port](/blog-content-images/lifecycle-18.png)

---

## Step 19: Run a Redis Container

Now let’s pull and run a Redis container in detached mode:

```bash
sudo docker run -d redis
```

This command downloads the Redis image (if not present) and starts a container in the background. Note the container ID printed (e.g., `cac37a609ad0`). You can list running containers with `sudo docker ps`.

![Run Redis Container](/blog-content-images/lifecycle-19.png)

---

## Step 20: Stop and Restart the Redis Container

Stop the Redis container using its container ID:

```bash
sudo docker stop cac37a609ad0
```

Verify it’s stopped with `sudo docker ps -a`. Then restart it:

```bash
sudo docker start cac37a609ad0
```

![Stop and Restart Redis](/blog-content-images/lifecycle-20.png)

---

## Step 21: Pause and Unpause the Redis Container

Pausing a container freezes its processes without stopping the container:

```bash
sudo docker pause cac37a609ad0
```

To unpause:

```bash
sudo docker unpause cac37a609ad0
```

You can see the status change in `docker ps`.

![Pause and Unpause Redis](/blog-content-images/lifecycle-21.png)

---

## Step 22: Kill the Redis Container

Killing a container sends a SIGKILL signal, forcefully stopping it:

```bash
sudo docker kill cac37a609ad0
```

After killing, the container is stopped. Use `docker ps -a` to see it with status “Exited”.

![Kill Redis Container](/blog-content-images/lifecycle-22.png)

---

## Step 23: Stop, Restart, and Pause an Nginx Container

Run an Nginx container (you can use a different ID each time):

```bash
sudo docker run -d nginx
```

Note its container ID (e.g., `0264361be967`). Now practice:

- Stop: `sudo docker stop 0264361be967`
- Restart: `sudo docker start 0264361be967`
- Pause: `sudo docker pause 0264361be967`

![Nginx Container Operations](/blog-content-images/lifecycle-23.png)

---

## Step 24: Unpause and Kill the Nginx Container

Finally, unpause and kill the Nginx container:

```bash
sudo docker unpause 0264361be967
sudo docker kill 0264361be967
```

![Unpause and Kill Nginx](/blog-content-images/lifecycle-24.png)

---

## Conclusion

You’ve successfully installed Docker on an AWS EC2 instance and performed various lifecycle operations on containers. You now know how to:

- Launch an EC2 instance with the right security groups
- Install Docker from the official repository
- Run, stop, start, pause, unpause, and kill containers
- Manage containers like Redis and Nginx

These fundamental Docker commands are the building blocks for more advanced container orchestration and microservices deployments.

---

## Cleanup

To avoid incurring charges, remember to:

- Terminate your EC2 instance
- Delete the security group (if no longer needed)
- Remove the key pair from AWS

---

_Need more help? Check the [Docker documentation](https://docs.docker.com/) or leave a comment below._

Happy containerizing! 🐳☁️
