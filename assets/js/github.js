// for programming language icons
import { devicons } from './devicons.js';

const username = 'ASISaga';
const maxPages = 3;
const hideForks = true;
const repoList = document.querySelector('.repo-list');
const reposSection = document.querySelector('.repos');
const filterInput = document.querySelector('.filter-repos');

// get information from github profile
const getProfile = async () => {
    const res = await fetch(
        `https://api.github.com/users/${username}`
        // {
        //     headers: {
        //         Accept: 'application/vnd.github+json',
        //         Authorization: 'token your-personal-access-token-here'
        //     }
        // }
    );
    const profile = await res.json();
    // Only attempt to display profile if the target container exists
    const userInfoEl = document.querySelector('.user-info');
    if (userInfoEl) displayProfile(profile);
};
getProfile();

// display information from github profile
const displayProfile = (profile) => {
    const userInfo = document.querySelector('.user-info');
    if (!userInfo) return; // container missing on this page, bail out
    userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
            <h2><a href=${profile.blog}><strong>${profile.name} - ${profile.login}</strong></a></h2>
            <p>${profile.bio}</p>
            <p>
                Followers: <strong>${profile.followers}</strong>
                Repos: <strong>${profile.public_repos}</strong>
                Gists: <strong>${profile.public_gists}</strong>
            </p>
            <p>
                Work: ${profile.company}
                Location: ${profile.location}
            </p>
        </div>
    `;
};

// get list of user's public repos
const getRepos = async () => {
    let repos = [];
    let res;
    for (let i = 1; i <= maxPages; i++) {
        res = await fetch(
            `https://api.github.com/users/${username}/repos?&sort=pushed&per_page=100&page=${i}`
            // {
            //     headers: {
            //         Accept: 'application/vnd.github+json',
            //         Authorization:
            //             'token your-personal-access-token-here'
            //     }
            // }
        );
        let data = await res.json();
        repos = repos.concat(data);
    }
    repos.sort((a, b) => b.forks_count - a.forks_count);
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    displayRepos(repos);
};
getRepos();

// display list of all user's public repos
const displayRepos = (repos) => {
    const userHome = `https://github.com/${username}`;
    // If there is no repo list or filter input on this page, skip rendering
    if (!repoList) return;
    if (filterInput) filterInput.classList.remove('hide');
    for (const repo of repos) {
        if (repo.fork && hideForks) {
            continue;
        }

        const langUrl = `${userHome}?tab=repositories&q=&language=${repo.language}`;
        const starsUrl = `${userHome}/${repo.name}/stargazers`;
        const forksUrl = `${userHome}/${repo.name}/network/members`;

        let listItem = document.createElement('li');
        listItem.classList.add('repo');
        listItem.innerHTML = `
            <h3 class='repo-name'>${repo.name}</h3>
            <span class='repo-description'>${repo.description}</span>
            <br/><br/>`;

        if (repo.stargazers_count > 0) {
            listItem.innerHTML += `<a href="${starsUrl}">
            <span>⭐ ${repo.stargazers_count}</span></a>`;
        }

        if (repo.language) {
            listItem.innerHTML += `<a href="${langUrl}">
            <span>${devicons[repo.language]}</span></a>`;
        }

        if (repo.forks_count > 0) {
            listItem.innerHTML += `<a href="${forksUrl}">
            <span>${devicons['Git']} ${repo.forks_count}</span></a>`;
        }

        if (repo.homepage && repo.homepage !== '') {
            listItem.innerHTML += `<br />
            <a class="link-btn" href=${repo.html_url}>${devicons['Github']} Code</a>
            <a class="link-btn" href=${repo.homepage}>${devicons['Chrome']} Live</a>
            <br />`;
        } else {
            listItem.innerHTML += `<br />
            <a class="link-btn" href=${repo.html_url}>${devicons['Github']} Code</a>
            <br />`;
        }

        repoList.append(listItem);
    }
};

// dynamic search
if (filterInput) {
    filterInput.addEventListener('input', (e) => {
        const search = e.target.value;
        const repos = document.querySelectorAll('.repo');
        const searchLowerText = search.toLowerCase();

        for (const repo of repos) {
            const lowerText = repo.innerText.toLowerCase();
            if (lowerText.includes(searchLowerText)) {
                repo.classList.remove('hide');
            } else {
                repo.classList.add('hide');
            }
        }
    });
}
