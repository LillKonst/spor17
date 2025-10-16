import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  
  return(
     <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Kontakt oss</h2>

      {submitted ? (
        <p className="text-green-600 text-center">
          Takk for meldingen din! Vi tar kontakt så snart vi kan.
        </p>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={() => setSubmitted(true)}
          className="flex flex-col gap-4"
        >
          {/* 🔒 Nødvendig for Netlify Forms */}
          <input type="hidden" name="form-name" value="contact" />

          <div>
            <label htmlFor="navn" className="block text-sm font-medium">
              Navn
            </label>
            <input
              id="navn"
              name="navn"
              type="text"
              required
              className="font-Garamond w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-green-200"
            />
          </div>

          <div>
            <label htmlFor="epost" className="block text-sm font-medium">
              E-postadresse
            </label>
            <input
              id="epost"
              name="epost"
              type="email"
              required
              className=" font-Garamondw-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-green-200"
            />
          </div>

          <div>
            <label htmlFor="melding" className="block text-sm font-medium">
              Melding
            </label>
            <textarea
              id="melding"
              name="melding"
              rows={5}
              required
              className="font-Garamond w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-green-200"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
          >
            Send melding
          </button>
        </form>
      )}
    </div>
  );
}