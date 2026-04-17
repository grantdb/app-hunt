export enum ApiEndpoint {
  Init = '/api/init',
  SubmitScore = '/api/submit-score',
  GetLeaderboard = '/api/get-leaderboard',
  OnPostCreate = '/internal/menu/post-create',
  OnAppInstall = '/internal/on-app-install',
}

export interface ScoreEntry {
  member: string;
  score: number;
}

export interface InitResponse {
  type: 'init';
  postId: string;
  username: string;
}

export interface LeaderboardResponse {
  type: 'leaderboard';
  postId: string;
  scores: ScoreEntry[];
  userBest: number;
}

export interface SubmitScoreRequest {
  score: number;
}
