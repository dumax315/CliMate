var SUPABASE_URL = 'https://cojqcyifdahcqmtondgm.supabase.co'
var SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvanFjeWlmZGFoY3FtdG9uZGdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIxODMzNjcsImV4cCI6MTk3Nzc1OTM2N30.5-5zcnE8P0naWUzXXu4dXDlPeE1PUMb20gWylsJlwd4'

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
window.userToken = null



document.addEventListener('DOMContentLoaded', function (event) {
  var signUpForm = document.querySelector('#sign-up')
  signUpForm.onsubmit = signUpSubmitted.bind(signUpForm)

  // var logInForm = document.querySelector('#log-in')
  // logInForm.onsubmit = logInSubmitted.bind(logInForm)

  var logInFormGithub = document.querySelector('#log-in-Github')
  logInFormGithub.onsubmit = logInSubmittedGithub.bind(logInFormGithub)

  var logInFormGoogle = document.querySelector('#log-in-Google')
  logInFormGoogle.onsubmit = signInWithGoogle.bind(logInFormGoogle)

  // var userDetailsButton = document.querySelector('#user-button')
  // userDetailsButton.onclick = fetchUserDetails.bind(userDetailsButton)

  // var logoutButton = document.querySelector('#logout-button')
  // logoutButton.onclick = logoutSubmitted.bind(logoutButton)

  // if(supabase.auth.user() == null){
  //   document.getElementById("signedin").style.display = "none"
  //   document.getElementById("notSignedin").style.display = "block"
  // }else{
  //   document.getElementById("signedin").style.display = "block"
  //   document.getElementById("notSignedin").style.display = "none"
  //   document.getElementById("accountEmail").innerText = JSON.stringify(supabase.auth.user().email)
  // }
  
  // console.log(supabase.auth.user())
})

const signUpSubmitted = (event) => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value

  supabase.auth
    .signUp({ email, password })
    .then((response) => {
      response.error ? alert(response.error.message) : setToken(response)
    })
    .catch((err) => {
      alert(err)
    })
}

const logInSubmitted = (event) => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value

  supabase.auth
    .signIn({ email, password })
    .then((response) => {
      response.error ? alert(response.error.message) : setToken(response)
    })
    .catch((err) => {
      alert(err.response.text)
    })
}

// const logInSubmittedGithub = (event) => {
//   event.preventDefault()
//   async function signInWithGithub() {
//     const { user, session, error } = await supabase.auth.signIn({
//       provider: 'github',
//     })
//   }  

//   // supabase.auth
//   //   .signIn({provider: 'github',})
//   //   .then((response) => {
//   //     response.error ? alert(response.error.message) : setToken(response)
//   //   })
//   //   .catch((err) => {
//   //     alert(err.response.text)
//   //   })
// }
async function logInSubmittedGithub(event) {
  event.preventDefault()

  // supabase.auth
  //   .signIn({provider: 'github',})
  //   .then((response) => {
  //     response.error ? alert(response.error.message) : setToken(response)
  //   })
  //   .catch((err) => {
  //     alert(err.response.text)
  //   })
  const res = await supabase.auth.signIn({
    provider: 'github',
  })
  console.log(res)
}  

async function signInWithGoogle() {
  event.preventDefault()
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  })
}
const fetchUserDetails = () => {
  alert(JSON.stringify(supabase.auth.user()))
}

const logoutSubmitted = (event) => {
  event.preventDefault()

  supabase.auth
    .signOut()
    .then((_response) => {
      document.querySelector('#access-token').value = ''
      document.querySelector('#refresh-token').value = ''
      alert('Logout successful')
    })
    .catch((err) => {
      alert(err.response.text)
    })
}

function setToken(response) {
  if (response.user.confirmation_sent_at && !response?.session?.access_token) {
    alert('Confirmation Email Sent')
  } else {
    console.log(response)
    document.querySelector('#access-token').value = response.session.access_token
    document.querySelector('#refresh-token').value = response.session.refresh_token
    alert('Logged in as ' + response.user.email)
  }
}