import { GamesEntity } from '../api/api.dailyschedule.interfaces';

export interface  GamesInfo {
  id: GamesEntity['id'];
  status: GamesEntity['status'];
  scheduled: GamesEntity['scheduled'];
  home: GamesEntity['home'];
  away: GamesEntity['away'];
  timeZones: GamesEntity['time_zones'];
}
