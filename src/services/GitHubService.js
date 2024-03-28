export const fetchUserRepos = async (username) => {
  const endpoint = `https://api.github.com/users/${username}/repos?type=public&sort=pushed`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('GitHub user not found.');
    }
    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error("There was an error fetching the user's repositories:", error);
    throw error;
  }
};