"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function ImageUpload({
  name = "image_url",
  bucket = "event-images",
  defaultValue,
}: {
  name?: string;
  bucket?: string;
  defaultValue?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(defaultValue ?? null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string>(defaultValue ?? "");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filename, file, { upsert: true });

    if (error) {
      alert(`Upload failed: ${error.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
    setUrl(data.publicUrl);
    setPreview(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={url} />
      {preview && (
        <img
          src={preview}
          alt="Event poster preview"
          className="w-full max-h-56 object-cover rounded border border-gray-300"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full text-sm text-gray-700 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-ucf-gold file:text-ucf-black hover:file:opacity-90 cursor-pointer"
      />
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}
