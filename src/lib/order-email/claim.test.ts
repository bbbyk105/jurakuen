import assert from "node:assert/strict";
import test from "node:test";

import { CLAIM_TTL_MS, decideClaim } from "./claim";

test("empty metadata can be claimed", () => {
  assert.deepEqual(decideClaim(undefined, 1_000), { type: "claim", attempt: 1 });
});

test("sent metadata is not claimed again", () => {
  assert.deepEqual(decideClaim("sent", 1_000), { type: "already_sent" });
});

test("a fresh sending claim blocks a second worker", () => {
  const now = 10_000;
  assert.deepEqual(decideClaim(`sending:${now}:abc-def:1`, now + 1_000), {
    type: "in_progress",
  });
});

test("a stale sending claim can be taken over with the next attempt", () => {
  assert.deepEqual(decideClaim(`sending:100:abc-def:1`, 100 + CLAIM_TTL_MS), {
    type: "claim",
    attempt: 2,
  });
});

test("a failed attempt is retried with the next attempt number", () => {
  assert.deepEqual(decideClaim("failed:2", 1_000), { type: "claim", attempt: 3 });
});
