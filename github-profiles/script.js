var APIURL = "https://api.github.com/users/";

var main = document.querySelector(".main");
var form = document.querySelector(".form");
var search = document.querySelector(".search");

async function getUser(username) {
  var response = await fetch(APIURL + username);
  var responseData = await response.json();
  createUserCard(responseData);
  getRepos(username);
}

async function getRepos(username) {
  var response = await fetch(APIURL + username + "/repos");
  var responseData = await response.json();
  addReposToCard(responseData);
}

function createUserCard(user) {
  var cardHTML = `
  <div class="card">
      <div class="image-wrapper">
        <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
      </div> 
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul class="info">
          <li>
          ${user.followers}
            <strong>
            Followers
            </strong>
          </li>
          <li>
          ${user.following} 
            <strong>
            Following
            </strong>
          </li>
          <li>
          ${user.public_repos}
            <strong>
            Repos
            </strong>
          </li>
        </ul>
        <div class="repos">
        
        </div>
      </div> 
  </div>
  `;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  var reposElement = document.querySelector(".repos");
  console.log(repos);
  console.log(reposElement);
  repos
    .sort(function sortRepos(a, b) {
      return b.stargazers_count - a.stargazers_count;
    })
    .slice(0, 10)
    .forEach(function processEachRepo(repo) {
      var repoElement = document.createElement("a");
      repoElement.classList.add("repo");
      repoElement.innerText = repo.name;
      repoElement.href = repo.html_url;
      repoElement.target = "_blank";
      reposElement.appendChild(repoElement);
    });
}

form.addEventListener("submit", function handleSubmit(e) {
  e.preventDefault();
  var user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
