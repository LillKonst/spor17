import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  
  return(
     <div className="bg-white px-10 mt-10 flex flex-col gap-3 flex-1">
      <h2 className="text-2xl mb-4 text-center">Send oss en melding her</h2>

      {submitted ? (
        <p className="bg-customGreen text-black text-center p-5 rounded-2xl">
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
              className=" font-Garamondw-full w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-green-200"
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
            className="bg-customGreen text-black font-semibold py-2 rounded-lg hover:bg-customHover transition"
          >
            Send melding
          </button>
        </form>
      )}
    </div>
  );
}

