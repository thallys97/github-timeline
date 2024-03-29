export const fetchUserRepos = async (username, page = 1) => {
  const endpoint = `https://api.github.com/users/${username}/repos?type=public&sort=created&per_page=30&page=${page}`;
  try {
    const response = await fetch(endpoint);
    if (response.status === 403) {
      throw new Error('Too many requisitions. Try again later.');
    }
    else if (!response.ok) {
      throw new Error('GitHub user not found.');
    }
    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error("There was an error fetching the user's repositories:", error);
    throw error;
  }
};

export const fetchAllUserRepos = async (username) => {
  let page = 1;
  let allRepos = [];
  let hasMore = true;

  while (hasMore) {
    const endpoint = `https://api.github.com/users/${username}/repos?type=public&sort=created&per_page=100&page=${page}`;
    const response = await fetch(endpoint);
    if (response.status === 403) {
      throw new Error('Too many requisitions. Try again later.');
    }
    else if (!response.ok) {
      throw new Error('GitHub user not found.');
    }
    const repos = await response.json();
    allRepos = allRepos.concat(repos);
    hasMore = repos.length === 100;
    page++;
  }

  return allRepos;
};