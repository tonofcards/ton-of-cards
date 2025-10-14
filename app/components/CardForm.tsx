'use client';
import { useState, FormEvent } from 'react';
export default function CardForm({ onSaved }: { onSaved?: () => void }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      let image_url: string | null = null;
      if (imageFile) {
        const uploadRes = await fetch('/upload', { method: 'POST', body: fd });
        const up = await uploadRes.json();
        if (up?.url) image_url = up.url;
      }
      const data = Object.fromEntries(fd.entries());
      const payload = {
        player: String(data.player || '').trim(),
        sport: String(data.sport || 'basketball'),
        year: data.year ? Number(data.year) : null,
        brand: data.brand ? String(data.brand) : null,
        set_name: data.set_name ? String(data.set_name) : null,
        card_number: data.card_number ? String(data.card_number) : null,
        parallel: data.parallel ? String(data.parallel) : null,
        serial_numbered: data.serial_numbered ? String(data.serial_numbered) : null,
        grade: data.grade ? String(data.grade) : null,
        purchase_price: data.purchase_price ? Number(data.purchase_price) : null,
        list_price: data.list_price ? Number(data.list_price) : null,
        market_value: data.market_value ? Number(data.market_value) : null,
        status: String(data.status || 'inventory'),
        image_url
      };
      const res = await fetch('/api/cards', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Failed to save card');
      onSaved?.(); (e.currentTarget as HTMLFormElement).reset(); setImageFile(null); alert('Saved!');
    } catch (err:any) { alert(err.message || 'Error'); } finally { setSaving(false); }
  }
  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="grid2">
        <input name="player" placeholder="Player *" required className="input" />
        <select name="sport" className="input"><option value="basketball">Basketball</option><option value="football">Football</option></select>
        <input name="year" placeholder="Year" type="number" className="input" />
        <input name="brand" placeholder="Brand (Topps, Panini, etc.)" className="input" />
        <input name="set_name" placeholder="Set (Prizm, Optic, etc.)" className="input" />
        <input name="card_number" placeholder="Card #" className="input" />
        <input name="parallel" placeholder="Parallel (Silver, Refractor…)" className="input" />
        <input name="serial_numbered" placeholder="Serial # (/99, 12/49…)" className="input" />
        <input name="grade" placeholder="Grade (PSA 10, BGS 9.5)" className="input" />
        <input name="purchase_price" placeholder="Purchase price" type="number" step="0.01" className="input" />
        <input name="list_price" placeholder="List price (BIN)" type="number" step="0.01" className="input" />
        <input name="market_value" placeholder="Market value (comp)" type="number" step="0.01" className="input" />
        <select name="status" className="input"><option value="inventory">Inventory</option><option value="listed">Listed</option><option value="sold">Sold</option></select>
      </div>
      <div className="pad"><input type="file" name="image" accept="image/*" onChange={(e)=>setImageFile(e.target.files?.[0]??null)} /></div>
      <button type="submit" disabled={saving} className="btn">{saving ? 'Saving…' : 'Save Card'}</button>
    </form>
  );
}
