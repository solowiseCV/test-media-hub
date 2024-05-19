import { isValidObjectId } from 'mongoose';

export default function isObjectId(id) {
  return isValidObjectId(id);
}