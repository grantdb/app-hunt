import type { IncomingMessage, ServerResponse } from "node:http";
import { context, reddit, redis } from "@devvit/web/server";
import { once } from "node:events";

export async function serverOnRequest(
  req: IncomingMessage,
  rsp: ServerResponse,
): Promise<void> {
  try {
    const url = req.url;

    if (!url) {
        writeJSON(404, { error: "not found", status: 404 }, rsp);
        return;
    }

    if (url === "/internal/menu/post-create") {
        const post = await reddit.submitCustomPost({ title: "App Hunt: Search Challenge" });
        writeJSON(200, {
            showToast: { text: `App Hunt Post created!`, appearance: "success" },
            navigateTo: post.url,
        }, rsp);
        return;
    }

    if (url === "/api/init") {
        writeJSON(200, {
            type: "init",
            postId: context.postId,
            username: context.username ?? "user",
        }, rsp);
        return;
    }
    
    if (url === "/api/get-leaderboard") {
        if (!context.postId) {
             writeJSON(400, { error: "no post id", status: 400 }, rsp);
             return;
        }
        const leaderboardKey = `app_hunt_leaderboard_${context.postId}`;
        try {
            const topScores = await redis.zRange(leaderboardKey, 0, 9, { by: "rank", reverse: true });
            const scores = topScores.map(entry => ({
                member: entry.member,
                score: entry.score
            }));
            
            writeJSON(200, {
                type: "leaderboard",
                postId: context.postId,
                data: scores
            }, rsp);
        } catch (e) {
            writeJSON(500, { error: "failed to get leaderboard", status: 500 }, rsp);
        }
        return;
    }
    
    if (url === "/api/submit-score" && req.method === "POST") {
        const { score } = await readJSON(req);
        const username = context.username ?? "anonymous";
        if (context.postId) {
            const leaderboardKey = `app_hunt_leaderboard_${context.postId}`;
            await redis.zAdd(leaderboardKey, { member: username, score: Number(score) });
        }
        writeJSON(200, { success: true }, rsp);
        return;
    }

    writeJSON(404, { error: "not found", status: 404 }, rsp);
  } catch (err) {
    const msg = `server error; ${err instanceof Error ? err.stack : err}`;
    console.error(msg);
    writeJSON(500, { error: msg, status: 500 }, rsp);
  }
}

function writeJSON(
  status: number,
  json: any,
  rsp: ServerResponse,
): void {
  const body = JSON.stringify(json);
  const len = Buffer.byteLength(body);
  rsp.writeHead(status, {
    "Content-Length": len,
    "Content-Type": "application/json",
  });
  rsp.end(body);
}

async function readJSON(req: IncomingMessage): Promise<any> {
    const chunks: any[] = [];
    req.on("data", (chunk: any) => chunks.push(chunk));
    await once(req, "end");
    return JSON.parse(`${Buffer.concat(chunks)}`);
}
