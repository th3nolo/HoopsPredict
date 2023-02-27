import { PlayersEntitySummary } from '../api/api.gamesummary.interfaces';

export interface ScoresHomeAndAway {
  homeScores: PlayersEntitySummary[];
  awayScores: PlayersEntitySummary[];
}
