import {
  WEDDING_FETCHED,
  WEDDING_SAVED,
  ADD_GUEST,
  UPDATE_GUEST,
  REMOVE_GUESTS,
} from '../actions/wedding.actions';
import Wedding from '../models/wedding.model';

export default function (wedding = new Wedding(), action) {
  switch (action.type) {
    case WEDDING_FETCHED:
    case WEDDING_SAVED:
      return new Wedding(action.wedding);
    case REMOVE_GUESTS:
      return wedding.removeGuests(action.guests);
    case ADD_GUEST:
      return wedding.addGuest(action.guest);
    case UPDATE_GUEST:
      return wedding.updateGuest(action.guest);
    default:
      return wedding;
  }
}
