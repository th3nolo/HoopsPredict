export interface TeamProfile {
  id: string;
  name: string;
  market: string;
  alias: string;
  founded: number;
  sr_id: string;
  reference: string;
  venue: Venue;
  league: LeagueOrConferenceOrDivision;
  conference: LeagueOrConferenceOrDivision;
  division: LeagueOrConferenceOrDivision;
  coaches?: CoachesEntity[] | null;
  players?: PlayersEntity[] | null;
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
export interface LeagueOrConferenceOrDivision {
  id: string;
  name: string;
  alias: string;
}
export interface CoachesEntity {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  position: string;
  experience: string;
}
export interface PlayersEntity {
  id: string;
  status: string;
  full_name: string;
  first_name: string;
  last_name: string;
  abbr_name: string;
  height: number;
  weight: number;
  position: string;
  primary_position: string;
  jersey_number: string;
  experience: string;
  college?: string | null;
  high_school?: string | null;
  birth_place: string;
  birthdate: string;
  updated: string;
  sr_id: string;
  rookie_year?: number | null;
  reference: string;
  draft: Draft;
  injuries?: InjuriesEntity[] | null;
}
export interface Draft {
  year: number;
  team_id?: string | null;
  round?: string | null;
  pick?: string | null;
}
export interface InjuriesEntity {
  id: string;
  comment: string;
  desc: string;
  status: string;
  start_date: string;
  update_date: string;
}
