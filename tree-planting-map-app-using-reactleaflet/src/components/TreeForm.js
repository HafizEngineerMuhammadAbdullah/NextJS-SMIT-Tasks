
"use client";

import Image from "next/image";
import { toast } from "react-toastify";

export default function TreeForm({
  location,
  formData,
  setFormData,
  onSave,
  saving = false,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      toast.info("Please select a location on the map.");
      return;
    }

    if (!formData.userName.trim() || !formData.treeName.trim()) {
      toast.error("Please enter your name and tree name.");
      return;
    }

    await onSave();
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-700 p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Image
              src="/assets/tree.png"
              width={36}
              height={36}
              alt=""
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">Plant a tree</h2>
            <p className="mt-1 text-sm text-emerald-100">
              Add your contribution to the map.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-5">
        <div>
          <label
            htmlFor="userName"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Your name
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            autoComplete="name"
            maxLength={60}
            value={formData.userName}
            onChange={handleChange}
            placeholder="e.g. Abdullah"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label
            htmlFor="treeName"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Tree species
          </label>
          <input
            id="treeName"
            name="treeName"
            type="text"
            maxLength={60}
            value={formData.treeName}
            onChange={handleChange}
            placeholder="e.g. Neem, Mango, Banyan"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-emerald-950">
              Planting coordinates
            </p>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
              {location ? "Selected" : "Not selected"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0">
              <label className="text-xs text-slate-500">Latitude</label>
              <p className="mt-1 break-all font-mono text-sm font-semibold text-slate-800">
                {location ? location.lat.toFixed(6) : "—"}
              </p>
            </div>
            <div className="min-w-0">
              <label className="text-xs text-slate-500">Longitude</label>
              <p className="mt-1 break-all font-mono text-sm font-semibold text-slate-800">
                {location ? location.lng.toFixed(6) : "—"}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!location || saving}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 font-bold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Saving tree...
            </>
          ) : (
            <>🌱 Plant my tree</>
          )}
        </button>

        <p className="text-center text-xs leading-5 text-slate-500">
          Your tree will appear on the shared map after it is saved.
        </p>
      </form>
    </section>
  );
}
