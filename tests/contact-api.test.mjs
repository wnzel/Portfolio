import assert from "node:assert/strict";
import test from "node:test";

process.env.NODE_ENV = "test";
process.env.SMTP_USER = "wenzelescudero@gmail.com";

const { default: handler, validateContactPayload } = await import(
  "../api/contact.js"
);

function invoke(method, body) {
  const result = { statusCode: null, body: null, headers: {} };
  const response = {
    setHeader(name, value) {
      result.headers[name] = value;
    },
    status(statusCode) {
      result.statusCode = statusCode;
      return this;
    },
    json(bodyValue) {
      result.body = bodyValue;
      return result;
    },
  };

  return Promise.resolve(handler({ method, body }, response)).then(() => result);
}

test("validates required contact fields", () => {
  assert.deepEqual(validateContactPayload({ name: "", message: "" }), {
    error: "Name, phone, email, and message are required.",
  });
});

test("rejects an invalid email address", () => {
  assert.deepEqual(
    validateContactPayload({
      name: "Jordan Lee",
      phone: "480-555-0100",
      email: "not-an-email",
      message: "I would like to discuss an automation project.",
    }),
    { error: "Enter a valid email address." },
  );
});

test("rejects non-POST requests", async () => {
  const result = await invoke("GET", null);
  assert.equal(result.statusCode, 405);
  assert.equal(result.headers.Allow, "POST");
});

test("sends a contact message with an optional company", async () => {
  const result = await invoke("POST", {
    name: "Jordan Lee",
    phone: "480-555-0100",
    email: "jordan@example.com",
    company: "Example Co",
    message: "I would like to discuss an automation project.",
  });

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, { ok: true });
});

test("sends a contact message without a company", async () => {
  const result = await invoke("POST", {
    name: "Jordan Lee",
    phone: "480-555-0100",
    email: "jordan@example.com",
    message: "I would like to discuss an automation project.",
  });

  assert.equal(result.statusCode, 200);
  assert.deepEqual(result.body, { ok: true });
});
