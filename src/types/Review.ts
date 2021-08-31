export interface IReview {
  key?: string;
  user_name: string;
  content: string;
  location: string;
  star: IStar;
  image_list: string[];
  like_count?: number;
  comment_list?: IComment[];
  hash_tag_list?: string[];
  liker_list?: string[];
  post_date?: Date;
}

export interface IStar {
  flavor: number;
  atmosphere: number;
  price: number;
}

export interface IComment {
  user_name: string;
  content: string;
  post_date: Date;
}
