hideLoader();
// showLoader();
/* APIs
  https://api.github.com/users/LetsTrie 
  https://api.github.com/users/LetsTrie/repos
*/
$('.user-details').hide()
function showLoader() {
  document.querySelector('.loader').style.display = 'block';
  document.querySelector('.user-details').style.display = 'none';
}

function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('.user-details').style.display = 'flex';
}

$('.gitProfile-btn').click(async e => {
  showLoader()
  const key = $('#gitProfile').val()
  console.log(key)

  let profile = await axios.get(`https://api.github.com/users/${key}`)
  let repos = await axios.get(`  https://api.github.com/users/${key}/repos`)

  profile = profile.data
  repos = repos.data

  // console.log(profile)
  $('.profile img').attr('src', profile.avatar_url)
  $('p.name').html(profile.name)
  $('p.login').html(profile.login)
  $('p.bio').html(profile.bio)
  $('.followers').html(profile.followers)
  $('.following').html(profile.following)
  // stars
  $('p.company').html(`<ion-icon name="business-outline"></ion-icon>
 ${profile.company}`)
 $('p.location').html(`<ion-icon name="location-outline"></ion-icon>${profile.location}`)
 $('p.mail').html(`<ion-icon name="mail-outline"></ion-icon>${profile.email}`)

 console.log(repos[0])
 repos.forEach(repo => {
   const repoName = repo.full_name.split('/')[1]
  //  console.log(repoName)
  const node = `<div class="repo">
  <div class="repo_name">
    <a href="#">${repoName}</a>
  </div>
  <p>
    <span class="circle"></span> ${repo.language}
    <ion-icon name="star-outline"></ion-icon> ${repo.watchers}
    <ion-icon name="git-branch-outline"></ion-icon> ${repo.forks_count}
  </p>
</div>`

$('.repos').append(node)
})
hideLoader()
$('.user-details').show()
})