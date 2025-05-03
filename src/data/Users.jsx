import team15Photo from "../assets/team-15.jpg";
import joeMc95 from "../assets/joe_mc95.jpg";
import photoFab from "../assets/photo-fab.jpg";
import kjayGames from "../assets/kjay-games.jpg";
import abbySmith from "../assets/abby-smith.jpg";
import jrkt99 from "../assets/jrkt_99.jpg";
import speaknlove from "../assets/speaknlove.jpg";
import tngiahuy94 from "../assets/tngiahuy94.jpg";
import roshanravi from "../assets/roshanravi.jpg";

/**
 * An array of user objects representing the users of the application.
 * Each user object contains details such as username, full name, profile image,
 * social statistics, and status information.
 *
 * @constant {Array<Object>} Users
 * @property {number} id - The unique identifier for the user.
 * @property {string} username - The user's unique username.
 * @property {string} fullname - The user's full name.
 * @property {string} img - The path or URL to the user's profile image.
 * @property {number} friends - The number of friends the user has.
 * @property {number} saves - The number of items the user has saved.
 * @property {number} likes - The number of likes the user has received.
 * @property {number} collections - The number of collections the user has created.
 * @property {string} about - A short bio or description about the user.
 * @property {string} status - The user's current status (e.g., "online", "offline", "private").
 */
const Users = [
  {
    id: 0,
    username: "TEAM15",
    fullname: "Team 15",
    img: team15Photo,
    friends: 0,
    saves: 0,
    likes: 0,
    collections: 0,
    about: "Class of '25",
    status: "online",
  },
  {
    id: 1,
    username: "joe_mc95",
    fullname: "Joe McDonald",
    img: joeMc95,
    friends: 0,
    saves: 65,
    likes: 112,
    collections: 0,
    about:
      "😏 | Student | Into music, skateboarding, video games, and computers | Let's connect!",
    status: "online",
  },
  {
    id: 2,
    username: "photo.fab",
    fullname: "Rebecca Daniel",
    img: photoFab,
    friends: 0,
    saves: 100,
    likes: 470,
    collections: 0,
    about: "Photography is my passion.",
    status: "offline",
  },
  {
    id: 3,
    username: "kjay.games",
    fullname: "KJ Washington",
    img: kjayGames,
    friends: 0,
    saves: 92,
    likes: 80,
    collections: 0,
    about: "Bakersfield, CA // Meet me in cyberspace 🚀",
    status: "private",
  },
  {
    id: 4,
    username: "abby.smith",
    fullname: "Abby Smith",
    img: abbySmith,
    friends: 0,
    saves: 10,
    likes: 50,
    collections: 0,
    about: "I love to travel and explore new places!",
    status: "private",
  },
  {
    id: 5,
    username: "jrkt_99",
    fullname: "Jared K",
    img: jrkt99,
    friends: 0,
    saves: 6,
    likes: 11,
    collections: 0,
    about: "Why do I have to write something here?",
    status: "offline",
  },
  {
    id: 6,
    username: "speaknlove",
    fullname: "Alexa Smith",
    img: speaknlove,
    friends: 0,
    saves: 10,
    likes: 70,
    collections: 0,
    about: "A mom of 2. I take too many dog photos.",
    status: "online",
  },
  {
    id: 7,
    username: "tngiahuy94",
    fullname: "Gia-Huy Nguyen",
    img: tngiahuy94,
    friends: 0,
    saves: 34,
    likes: 60,
    collections: 0,
    about: "Just a guy who loves to code.",
    status: "private",
  },
  {
    id: 8,
    username: "roshanravi",
    fullname: "Ravi Roshan",
    img: roshanravi,
    friends: 0,
    saves: 3,
    likes: 12,
    collections: 0,
    about: "Tech enthusiast and software developer.",
    status: "online",
  },
];

export default Users;
