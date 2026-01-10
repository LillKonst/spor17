interface ProductFiltersProps {
  artist: string | null;
  onArtistChange: (value: string | null) => void;
  collection: string | null;
  onCollectionChange: (value: string | null) => void;
}

export default function ProductFilters({
  artist,
  onArtistChange, 
  collection, 
  onCollectionChange
}: ProductFiltersProps) {
  return (
    <div className="mb-6 flex gap-4 flex-wrap">
      <select
      value={artist ?? ""}
      onChange={(e) => onArtistChange(e.target.value || null)}
      className="border rounded px-3 py-2"
      >
        <option value="">Alle Kunstnere</option>
        <option value="Spor-17">Spor 17</option>
        <option value="linn-savert">Linn Savert</option>
      </select>

      <select
      value={collection ?? ""}
      onChange={(e) => onCollectionChange(e.target.value || null)}
      className="border rounded px-3 py-2"
      >
        <option value="">Alle kolleksjoner</option>
        <option value="Julekort">Julekort</option>
        <option value="Barnebursdag">Barnebursdag</option>
      </select>
    </div>
  );
}