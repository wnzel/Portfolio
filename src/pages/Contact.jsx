import { useState } from "react";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  company: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message right now.");
      }

      setForm(initialForm);
      setStatus("success");
      setFeedback("Message sent successfully.");
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "Unable to send your message right now.");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <main className="flex flex-col gap-8 px-4 md:w-[736px] md:self-center">
      <div>
        <h1 className="text-xl font-medium tracking-tight text-base-content sm:text-2xl">
          Contact
        </h1>
        <p className="mt-2 text-sm font-light text-base-content/70 sm:text-base">
          Send me a message about an opportunity or project.
        </p>
      </div>

      <form
        onSubmit={submitForm}
        className="flex flex-col gap-5 border border-base-content/20 bg-base-100 p-5 sm:p-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-base-content">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            value={form.name}
            onChange={updateField}
            className="min-h-11 border border-base-content/20 bg-transparent px-3 py-2 text-base text-base-content outline-none transition-colors placeholder:text-base-content/30 focus:border-base-content/60"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-medium text-base-content">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              maxLength={30}
              autoComplete="tel"
              value={form.phone}
              onChange={updateField}
              className="min-h-11 min-w-0 border border-base-content/20 bg-transparent px-3 py-2 text-base text-base-content outline-none transition-colors placeholder:text-base-content/30 focus:border-base-content/60"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-base-content">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={form.email}
              onChange={updateField}
              className="min-h-11 min-w-0 border border-base-content/20 bg-transparent px-3 py-2 text-base text-base-content outline-none transition-colors placeholder:text-base-content/30 focus:border-base-content/60"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm font-medium text-base-content">
            Company <span className="font-light text-base-content/50">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            maxLength={120}
            autoComplete="organization"
            value={form.company}
            onChange={updateField}
            className="min-h-11 border border-base-content/20 bg-transparent px-3 py-2 text-base text-base-content outline-none transition-colors placeholder:text-base-content/30 focus:border-base-content/60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-base-content">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={8}
            value={form.message}
            onChange={updateField}
            className="resize-y border border-base-content/20 bg-transparent px-3 py-2 text-base leading-relaxed text-base-content outline-none transition-colors placeholder:text-base-content/30 focus:border-base-content/60"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="border border-base-content/40 px-5 py-2 text-sm font-medium text-base-content transition-colors hover:bg-base-content hover:text-base-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Sending…" : "Send message"}
          </button>

          {feedback && (
            <p
              role="status"
              aria-live="polite"
              className={`text-sm font-light ${
                status === "success" ? "text-success" : "text-error"
              }`}
            >
              {feedback}
            </p>
          )}
        </div>
      </form>
    </main>
  );
}

export default Contact;
