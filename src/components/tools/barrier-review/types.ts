export interface RouletteItem {
  id: string;
  label: string;
  source: string;
  tempo?: string;
}

export interface RouletteResult {
  item: RouletteItem;
  timestamp: number;
  advice?: string;
}

export type CategoryMap = Record<string, RouletteItem[]>;
export type LevelMap = Record<string, CategoryMap>;
