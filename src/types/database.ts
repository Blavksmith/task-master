export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
  owner_id: string;
  owner?: {
    id: string;
    name: string;
  };
}


