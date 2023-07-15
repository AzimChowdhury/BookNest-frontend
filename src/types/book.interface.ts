interface IBook {
  _id?: string;
  Title: string;
  Author: string;
  Genre: string;
  PublicationDate: string;
  Reviews: string[];
  user: string;
  image: string;
}

export default IBook;
