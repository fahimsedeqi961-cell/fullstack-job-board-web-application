import crypto from "crypto"

export const createhashToken = (token) => {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  return tokenHash;
}

