// imports come first
import UsersComponent from "./modules/UsersComponent.js";

Vue.component('player', {
  props: ['movie'],

  template: `
  <div>
    <h3 class="movie-title">{{ movie.videotitle }}</h3>
      <video :src="'video/' + movie.vidsource" controls autoplay></video>
      <div class="movie-details">
        <p>{{ movie.videodescription }}</p>
    </div>
  </div>
  `
})

const router = new VueRouter({
  routes: [
    { path: "/", name: "home", component: UsersComponent }
  ]
})


var vm = new Vue({
  el: "#app",

  router,

  data: {

    // mock up the user - this well eventually come from the database UMS (user management system)
    user: {
      isLoggedIn: true,
      settings: {}
    },

     // this data would also come from the database, but we'll just mock it up for now
    videodata: [
      { name: "Star Wars The Force Awakens", thumb: "forceawakens.jpg", vidsource: "forceawakens.mp4", description: "yet another star wars movie" },
      { name: "Stranger Things", thumb: "strangerthings.jpg", vidsource: "strangerthings.mp4", description: "don't get lost in the upside down" },
      { name: "Marvel's The Avengers", thumb: "avengers.jpg", vidsource: "avengers.mp4", description: "will they make black widow action figures this time?" }
    ],

    movie: {
      videotitle: "video title goes here",
      videosource: "",
      videodescription: "video description here"
    },

    showDetails: false
  },

  created: function() {
    // run a fetch cal and get the user data
    console.log('created lifecycle hook fired here, go get user data');
    // this.getUserData();
  },

  methods: {
    getUserData() {
      // do a fetch call here an get the user from the DB
      const url = './includes/index.php?getUser=1';

      fetch(url) // get data from the DB
      .then(res => res.json()) // translate JSON from DB to plain object
      .then(data => { // use the plain data object (the user)
       console.log(data); // log it to the console (testing)

       // put our DB data into Vue
       this.user.settings = data[0];
      })
      .catch((error) => console.error(error))
    },

    setUserPrefs() {
      // this is the preference control, hit the api when ready (or use a component)
      console.log('set user prefs here');
    },

    userLogin() {
      // call the login route, and/or load the login component
      console.log('do login / logout on click');
      
      // this is a ternary statement -> shorthand for if / else
      // the expressions eveluares to true or false - if its true , set the value equal to
      // the left fo the colon. if it's false, set the value equal to the right
      this.user.isLoggedIn = (this.user.isLoggedIn) ? false : true;
      },

      showMovieDetails({name, vidsource, description}) {
        //console.log('show these details: ', movie);

        this.movie.videotitle = name;
        this.movie.vidsource = vidsource;
        this.movie.videodescription = description;

        this.showDetails = true;
      }
  }
});
