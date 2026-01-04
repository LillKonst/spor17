// import { useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
// import ProductFilters from "../../components/ProductFilters/ProductFilters";

{/* TODO: Legg til filtere når flere kolleksjoner lanseres */}


export default function AllCards() {
  // const [artist, setArtist] = useState<string | null>(null);
  // const [collection, setCollection] = useState<string | null>(null);
  return (
  <div className="mx-5">
    <div>
      <h1 className="text-2xl">Kort</h1>
      <p>Morsomme kort når du ønsker å gi en hilsen.</p>
    </div>
   
   {/* TODO: Legg til filtere når flere kolleksjoner lanseres */} 
    {/* <div>
      <ProductFilters
        artist={artist}
        onArtistChange={setArtist}
        collection={collection}
        onCollectionChange={setCollection}
      />
    </div> */}

    <ProductList />
  </div>
  );
}