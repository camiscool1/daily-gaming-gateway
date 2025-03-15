
export interface Game {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnailUrl: string;
  category: string;
}

export const games: Game[] = [
  {
    id: "bandle",
    title: "Bandle",
    url: "https://bandle.app/",
    description: "Solve the band-based daily puzzle",
    thumbnailUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop",
    category: "Music"
  },
  {
    id: "costcodle",
    title: "Costcodle",
    url: "https://costcodle.com",
    description: "Guess the Costco item",
    thumbnailUrl: "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=600&auto=format&fit=crop",
    category: "Shopping"
  },
  {
    id: "guessthegame",
    title: "Guess the Game",
    url: "https://guessthe.game",
    description: "Daily video game screenshot challenge",
    thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    category: "Gaming"
  },
  {
    id: "spellcheckgame",
    title: "Spell Check",
    url: "https://spellcheckgame.com",
    description: "Test your spelling skills",
    thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
    category: "Words"
  },
  {
    id: "foodguessr",
    title: "Food Guessr",
    url: "https://foodguessr.com",
    description: "Identify foods from around the world",
    thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop",
    category: "Food"
  },
  {
    id: "disorderly",
    title: "Disorderly",
    url: "https://playdisorderly.com",
    description: "Organize jumbled items into categories",
    thumbnailUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&auto=format&fit=crop",
    category: "Puzzle"
  },
  {
    id: "huddle",
    title: "Huddle",
    url: "https://www.huddlegame.com/",
    description: "Test your sports knowledge",
    thumbnailUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=600&auto=format&fit=crop",
    category: "Sports"
  },
  {
    id: "connections-sports",
    title: "Connections: Sports Edition",
    url: "https://www.nytimes.com/athletic/connections-sports-edition",
    description: "Find connections in sports terms",
    thumbnailUrl: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=600&auto=format&fit=crop",
    category: "Sports"
  },
  {
    id: "movietomovie",
    title: "Movie to Movie",
    url: "https://movietomovie.com",
    description: "Connect movies through common actors",
    thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
    category: "Movies"
  },
  {
    id: "framed",
    title: "Framed",
    url: "https://framed.wtf/",
    description: "Identify movies from frames",
    thumbnailUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop",
    category: "Movies"
  },
  {
    id: "globle",
    title: "Globle",
    url: "https://globle-game.com/",
    description: "Guess the country by proximity",
    thumbnailUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=600&auto=format&fit=crop",
    category: "Geography"
  },
  {
    id: "worldle",
    title: "Worldle",
    url: "https://worldle.teuteuf.fr/",
    description: "Identify countries by their shape",
    thumbnailUrl: "https://images.unsplash.com/photo-1530095830103-cbd65eb2cba4?q=80&w=600&auto=format&fit=crop",
    category: "Geography"
  },
  {
    id: "travle",
    title: "Travle",
    url: "https://travle.earth/",
    description: "Test your geography knowledge",
    thumbnailUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop",
    category: "Geography"
  },
  {
    id: "connections",
    title: "Connections",
    url: "https://www.nytimes.com/games/connections",
    description: "Group words by their connections",
    thumbnailUrl: "https://images.unsplash.com/photo-1509228627152-72ae86a3be56?q=80&w=600&auto=format&fit=crop",
    category: "Words"
  },
  {
    id: "wordle",
    title: "Wordle",
    url: "https://www.nytimes.com/games/wordle/index.html",
    description: "Guess the five-letter word",
    thumbnailUrl: "https://images.unsplash.com/photo-1632953036398-7cc69e63d16a?q=80&w=600&auto=format&fit=crop",
    category: "Words"
  },
  {
    id: "tradle",
    title: "Tradle",
    url: "https://games.oec.world/en/tradle/",
    description: "Guess the country by its exports",
    thumbnailUrl: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=600&auto=format&fit=crop",
    category: "Economy"
  },
  {
    id: "whentaken",
    title: "When Taken",
    url: "https://whentaken.com/game",
    description: "Guess when a photo was taken",
    thumbnailUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=600&auto=format&fit=crop",
    category: "History"
  },
  {
    id: "wheretaken",
    title: "Where Taken",
    url: "https://wheretaken.com/game",
    description: "Guess where a photo was taken",
    thumbnailUrl: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=600&auto=format&fit=crop",
    category: "Geography"
  }
];
