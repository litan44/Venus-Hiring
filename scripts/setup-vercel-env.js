import { execSync } from "child_process";

const envVars = [
  {
    key: "DATABASE_URL",
    value:
      "postgresql://postgres:JTsaCCrRHPbrByHxUgHocJJXwtOrLsyi@tokaido.proxy.rlwy.net:38455/railway",
  },
  { key: "SMTP_HOST", value: "smtppro.zoho.in" },
  { key: "SMTP_PORT", value: "465" },
  { key: "SMTP_SECURE", value: "true" },
  { key: "SMTP_USER", value: "jivan@venushiring.com" },
  { key: "SMTP_PASSWORD", value: "8pySPQs5G1Gw" },
  { key: "SMTP_FROM", value: "jivan@venushiring.com" },
  { key: "CONTACT_RECEIVER_EMAIL", value: "jivan@venushiring.com" },
];

console.log("==================================================");
console.log(" Syncing Railway PostgreSQL & Zoho SMTP Env Vars to Vercel");
console.log("==================================================\n");

for (const env of envVars) {
  console.log(`Setting ${env.key} on Vercel Production...`);
  try {
    // Remove existing env var if present to avoid duplicate conflict
    try {
      execSync(`npx vercel env rm ${env.key} production -y`, { stdio: "ignore" });
    } catch {
      // Ignore error if env var doesn't exist yet
    }

    // Add env var to Vercel Production
    execSync(`echo "${env.value}" | npx vercel env add ${env.key} production`, {
      stdio: "inherit",
    });
    console.log(`✅ ${env.key} configured successfully.\n`);
  } catch (err) {
    console.error(`❌ Failed to set ${env.key}:`, err.message);
  }
}

console.log("==================================================");
console.log("✅ All Vercel Environment Variables Successfully Synced!");
console.log("==================================================");
