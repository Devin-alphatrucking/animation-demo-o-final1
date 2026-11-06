/**
 * Accessory categories. These are generic product types, not a stock list.
 * The range carried per store has not been confirmed.
 */
export type AccessoryGroup = { id: string; name: string; items: string[] };

export const accessoryGroups: AccessoryGroup[] = [
  { id: "protection", name: "Protection", items: ["Cases and covers", "Screen guards", "Camera lens protectors"] },
  { id: "power", name: "Power", items: ["Wall chargers", "Cables", "Power banks", "Wireless and magnetic chargers"] },
  { id: "audio", name: "Audio", items: ["Wireless earbuds", "Neckbands", "Bluetooth speakers"] },
  { id: "wearables", name: "Wearables", items: ["Smartwatches", "Fitness bands"] },
  { id: "creator", name: "Creator kit", items: ["Mobile photography kits", "Tripods and grips", "Lens attachments"] },
];
