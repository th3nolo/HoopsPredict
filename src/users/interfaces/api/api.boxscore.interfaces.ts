export interface BoxScore {
  id: string;
  status: string;
  coverage: string;
  scheduled: string;
  duration: string;
  attendance: number;
  lead_changes: number;
  times_tied: number;
  clock: string;
  quarter: number;
  track_on_court: boolean;
  reference: string;
  entry_mode: string;
  sr_id: string;
  time_zones: TimeZones;
  home: HomeOrAway;
  away: HomeOrAway;
}
export interface TimeZones {
  venue: string;
  home: string;
  away: string;
}
export interface HomeOrAway {
  name: string;
  alias: string;
  market: string;
  id: string;
  points: number;
  bonus: boolean;
  sr_id: string;
  reference: string;
  scoring?: ScoringEntity[] | null;
  leaders: Leaders;
}
export interface ScoringEntity {
  type: string;
  number: number;
  sequence: number;
  points: number;
}
export interface Leaders {
  points?: PointsEntityOrReboundsEntityOrAssistsEntity[] | null;
  rebounds?: PointsEntityOrReboundsEntityOrAssistsEntity[] | null;
  assists?: PointsEntityOrReboundsEntityOrAssistsEntity[] | null;
}
export interface PointsEntityOrReboundsEntityOrAssistsEntity {
  full_name: string;
  jersey_number: string;
  id: string;
  position: string;
  primary_position: string;
  sr_id: string;
  reference: string;
  statistics: Statistics;
}
export interface Statistics {
  minutes: string;
  field_goals_made: number;
  field_goals_att: number;
  field_goals_pct: number;
  three_points_made: number;
  three_points_att: number;
  three_points_pct: number;
  two_points_made: number;
  two_points_att: number;
  two_points_pct: number;
  blocked_att: number;
  free_throws_made: number;
  free_throws_att: number;
  free_throws_pct: number;
  offensive_rebounds: number;
  defensive_rebounds: number;
  rebounds: number;
  assists: number;
  turnovers: number;
  steals: number;
  blocks: number;
  assists_turnover_ratio: number;
  personal_fouls: number;
  tech_fouls: number;
  flagrant_fouls: number;
  pls_min: number;
  points: number;
  double_double: boolean;
  triple_double: boolean;
  effective_fg_pct: number;
  efficiency: number;
  efficiency_game_score: number;
  points_in_paint: number;
  points_in_paint_att: number;
  points_in_paint_made: number;
  points_in_paint_pct: number;
  true_shooting_att: number;
  true_shooting_pct: number;
  fouls_drawn: number;
  offensive_fouls: number;
  points_off_turnovers: number;
  second_chance_pts: number;
}
