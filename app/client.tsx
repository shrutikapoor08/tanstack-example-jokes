// app/client.tsx
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/start";
import { createRouter } from "./router";
import "./styles.css";

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
