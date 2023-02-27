export interface Schedule {
  date: string;
  league: League;
  games?: GamesEntity[] | null;
}
export interface League {
  id: string;
  name: string;
  alias: string;
}
export interface GamesEntity {
  id: string;
  status: string;
  coverage: string;
  scheduled: string;
  home_points: number;
  away_points: number;
  track_on_court: boolean;
  sr_id: string;
  reference: string;
  time_zones: TimeZones;
  venue: Venue;
  broadcasts?: BroadcastsEntity[] | null;
  home: HomeOrAway;
  away: HomeOrAway;
}
export interface TimeZones {
  venue: string;
  home: string;
  away: string;
}
export interface Venue {
  id: string;
  name: string;
  capacity: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  sr_id: string;
}
export interface BroadcastsEntity {
  network: string;
  type: string;
  locale: string;
  channel?: string | null;
}
export interface HomeOrAway {
  name: string;
  alias: string;
  id: string;
  sr_id: string;
  reference: string;
}
