export type SessionStatus = "planned" | "in_progress" | "finished" | "canceled";
export type SessionType = "accreditation" | "lesson" | "exam";

export interface SessionRoom {
  id: number;
  name: string;
}

export interface SessionUser {
  id: number;
  name: string;
}

export interface Session {
  id: number;
  rooms: SessionRoom[];
  users: SessionUser[];
  type: {
    id: number;
    name: SessionType;
  };
  status: {
    id: number;
    name: SessionStatus;
  };
  module: string;
  start: string;
  end: string;
}

export interface SortConfig {
  key: "date" | null;
  dir: "asc" | "desc";
}
