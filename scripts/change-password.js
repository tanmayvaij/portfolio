const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { PrismaClient } = require("@prisma/client");

function updateEnvFile(filePath, newPassword) {
  if (!fs.existsSync(filePath)) {
    // If file doesn't exist, create it with ADMIN_PASSWORD
    fs.writeFileSync(filePath, `ADMIN_PASSWORD="${newPassword}"\n`, "utf-8");
    return true;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  const regex = /^ADMIN_PASSWORD=.*$/m;

  if (regex.test(content)) {
    content = content.replace(regex, `ADMIN_PASSWORD="${newPassword}"`);
  } else {
    content = content.trimEnd() + `\nADMIN_PASSWORD="${newPassword}"\n`;
  }

  fs.writeFileSync(filePath, content, "utf-8");
  return true;
}

async function updateDatabasePassword(newPassword) {
  const prisma = new PrismaClient();
  try {
    await prisma.aboutConfig.upsert({
      where: { id: "default" },
      update: { adminPassword: newPassword },
      create: { id: "default", adminPassword: newPassword },
    });
    return true;
  } catch (err) {
    console.warn("  ⚠ Database sync skipped or failed (offline / network error):", err.message);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function promptPassword() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("\n🔑 Enter new Admin Password: ", (pass1) => {
      if (!pass1 || pass1.trim().length === 0) {
        console.error("❌ Password cannot be empty.");
        rl.close();
        process.exit(1);
      }

      rl.question("🔒 Confirm new Admin Password: ", (pass2) => {
        rl.close();
        if (pass1 !== pass2) {
          console.error("❌ Passwords do not match. Aborting.");
          process.exit(1);
        }
        resolve(pass1.trim());
      });
    });
  });
}

async function main() {
  console.log("==================================================");
  console.log("  Tanmay Vaij Portfolio - Admin Password Manager   ");
  console.log("==================================================");

  let newPassword = process.argv[2];

  if (!newPassword || newPassword.trim().length === 0) {
    newPassword = await promptPassword();
  } else {
    newPassword = newPassword.trim();
  }

  if (newPassword.length < 4) {
    console.warn("⚠ Warning: Password is short (less than 4 characters).");
  }

  const rootDir = path.resolve(__dirname, "..");
  const envLocalPath = path.join(rootDir, ".env.local");
  const envPath = path.join(rootDir, ".env");

  console.log("\nApplying changes...");

  // 1. Update .env.local
  try {
    updateEnvFile(envLocalPath, newPassword);
    console.log("  ✔ Updated .env.local");
  } catch (err) {
    console.error("  ❌ Failed to update .env.local:", err.message);
  }

  // 2. Update .env
  try {
    updateEnvFile(envPath, newPassword);
    console.log("  ✔ Updated .env");
  } catch (err) {
    console.error("  ❌ Failed to update .env:", err.message);
  }

  // 3. Sync to Database (Neon Cloud PostgreSQL)
  console.log("  ⏳ Syncing to Neon PostgreSQL database...");
  const dbUpdated = await updateDatabasePassword(newPassword);
  if (dbUpdated) {
    console.log("  ✔ Synced to Neon database (instant effect in both local & production!)");
  }

  console.log("\n==================================================");
  console.log("  ✅ Admin password updated successfully!");
  console.log("==================================================");
  console.log("  You can now log in at /admin using your new password.\n");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});

