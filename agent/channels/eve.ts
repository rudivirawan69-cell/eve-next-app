/**
 * Browser channel auth for /eve/v1/*
 * Production default is fail-closed without this file.
 * none() is for local demo only — replace before production traffic.
 */
import { defineChannel } from "eve/channels";
import { localDev, none } from "eve/channels/auth";

export default defineChannel({
  auth: [localDev(), none()],
});
