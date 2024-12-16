export interface BlogType {
  _id: string;
  title: string;
  category: string;
  content: string;
  image?: string;
  publish: boolean;
  likes?: number;
  dislikes?: number;
  author: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}
