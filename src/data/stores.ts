/**
 * Store locations — SAMPLE DATA ONLY.
 *
 * No branch details have been supplied or verified. Every entry is marked
 * `sample: true` and the UI labels it as a sample. Null fields render as
 * "To be confirmed". Replace these with real branches (and set sample: false)
 * once the business provides addresses, hours and numbers.
 */
export type Store = {
  id: string;
  sample: boolean;
  name: string;
  area: string;
  address: string | null;
  hours: string | null;
  phone: string | null;
  mapUrl: string | null;
};

export type StoreRegion = { id: string; label: string; stores: Store[] };

export const storeRegions: StoreRegion[] = [
  {
    id: "region-1",
    label: "Region 1",
    stores: [
      { id: "s1", sample: true, name: "Flagship store", area: "Main market", address: null, hours: null, phone: null, mapUrl: null },
      { id: "s2", sample: true, name: "Neighbourhood store", area: "Residential area", address: null, hours: null, phone: null, mapUrl: null },
    ],
  },
  {
    id: "region-2",
    label: "Region 2",
    stores: [
      { id: "s3", sample: true, name: "Mall store", area: "Shopping centre", address: null, hours: null, phone: null, mapUrl: null },
    ],
  },
  {
    id: "region-3",
    label: "Region 3",
    stores: [
      { id: "s4", sample: true, name: "High-street store", area: "Town centre", address: null, hours: null, phone: null, mapUrl: null },
      { id: "s5", sample: true, name: "Experience store", area: "Business district", address: null, hours: null, phone: null, mapUrl: null },
    ],
  },
];

export const allStores = storeRegions.flatMap((r) => r.stores);
export const hasVerifiedStores = allStores.some((s) => !s.sample);
