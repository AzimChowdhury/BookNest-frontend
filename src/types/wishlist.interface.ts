import IBook from "./book.interface";

export interface IWishlist {
  _id: string;
  user: string;
  nowReading: IBook[] | [];
  willRead: IBook[] | [];
  alreadyRead: IBook[] | [];
}
