var SUPABASE_URL = 'https://cojqcyifdahcqmtondgm.supabase.co'
var SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvanFjeWlmZGFoY3FtdG9uZGdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIxODMzNjcsImV4cCI6MTk3Nzc1OTM2N30.5-5zcnE8P0naWUzXXu4dXDlPeE1PUMb20gWylsJlwd4'

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
window.userToken = null



document.addEventListener('DOMContentLoaded', function (event) {
  // code that runs after load
  // connects the important functions to log out and fetch user details

  var userDetailsButton = document.querySelector('#user-button')
  userDetailsButton.onclick = fetchUserDetails.bind(userDetailsButton)

  var logoutButton = document.querySelector('#logout-button')
  logoutButton.onclick = logoutSubmitted.bind(logoutButton)

  var getPointsButton = document.querySelector('#get-points-button')
  getPointsButton.onclick = getUserPoints.bind(getPointsButton)
  

  // configers the ui based on the loged in user
  if(supabase.auth.user() == null){
    document.getElementById("signedin").style.display = "none"
    document.getElementById("notSignedin").style.display = "block"
  }else{
    document.getElementById("signedin").style.display = "block"
    document.getElementById("notSignedin").style.display = "none"
    document.getElementById("accountEmail").innerText = JSON.stringify(supabase.auth.user().email)
  }
  
  console.log(supabase.auth.user())
})

// updates the loged in user in the envent of a laggy log in
supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN'){
    if(supabase.auth.user() == null){
      document.getElementById("signedin").style.display = "none"
      document.getElementById("notSignedin").style.display = "block"
    }else{
      document.getElementById("signedin").style.display = "block"
      document.getElementById("notSignedin").style.display = "none"
      document.getElementById("accountEmail").innerText = JSON.stringify(supabase.auth.user().email)
    }
    
    console.log(supabase.auth.user())
    console.log('SIGNED_IN', session)
  }
})


const fetchUserDetails = () => {
  alert(JSON.stringify(supabase.auth.user()))
}

const getUserPoints = async() =>  {
  // const { data, error } = await supabase.from('cities').select()
  
  // const { data, error } = await supabase.from('points').select()
  const { data, error } = await supabase
  .from('points')
  .insert([{ user_id: supabase.auth.user().id}])
  console.log(data)
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
  window.location.reload();
}
