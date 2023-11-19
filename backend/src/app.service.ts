/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getCommits(username: string, repo: string): Promise<any> {
    const url: string = `https://api.github.com/repos/${username}/${repo}/commits`;

    try {
      const response = await axios.get(url);

      const commits = response.data.map((commit: any) => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
      }));

      return commits;
    } catch (error) {
      // eslint-disable-next-line prettier/prettier
      console.error('Error fetching commits:', error);
      throw new Error('Failed to fetch commits.');
    }
  }
}