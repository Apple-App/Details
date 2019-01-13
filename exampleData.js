const exampleData = [
  {
    MovieId: 100,
    Title: "Bumblebee",
    Theater: "AMC Loews 34th Street 14",
    Showtimes: {
      Standard: ["1:30 PM", "2:30 PM"],
      Imax: []
    },
    TheaterDetails: {
      Standard: [
        "Closed Caption",
        "Accessibility Devices Available",
        "Dolby Cinema @ AMC",
        "Recliner Seats",
        "Reserved Seating"
      ]
    },
    Trailer: {
      Links: ["url1", "url2"] //use youtube or something
    },
    Photos: {
      Links: ["url1", "url2"] //use a cache from somewhere, each on needs 10
    },
    Info: {
      Description: "long string",
      Rating: "PG-13 (for sequences of sci-fi action violence)",
      Genre: "Action & Adventure, Science Fiction & Fantasy",
      DirectedBy: "Travis Knight",
      WrittenBy: "Christina Hodson",
      ReleaseDate: " Dec 21, 2018  wide",
      Runtime: "114 minutes",
      Studio: "Paramount Pictures"
    },
    Cast: [
      { Name: "Selig Humbert", Photo: "https://picsum.photos/300/300/?random" },
      {
        Name: "Rodolphe Hyndson",
        Photo: "https://picsum.photos/300/300/?random"
      }
    ]
  }
];
