import ContactForm from "../../components/ContactForm/ContactForm";
import ContactImg from "../../images/kontakt-img.jpg";

export default function Contact() {
  return (
    <div className="bg-white rounded w-full p-2 md:p-10 flex flex-col lg:flex-row gap-5">
      
      <div className="flex-1 p-2 md:p-10 flex flex-col gap-5">
        <h1 className="text-xl lg:text-2xl mb-3">Kontakt oss</h1>
        <p className="mb-5">Kontakt oss via epost: post@spor17.no, eller send oss en direkte beskjed via vårt kontaktskjema. Vi gleder oss til å motta både spørsmål og tilbakemeldigner!</p>
        <div className="rounded-xl overflow-hidden w-full md:max-w-[400px] self-center">
          <img src={ContactImg} alt="bilde" className="w-full object-cover"/>
        </div>
          
      </div>
      
      <ContactForm />
    </div>
  );
}