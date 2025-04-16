import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

// const movies = [
//   { id: 1, title: "Inception", release_date: "2010-07-16" },
//   { id: 2, title: "Interstellar", release_date: "2014-11-07" },
//   { id: 3, title: "Tenet", release_date: "2020-08-26" },
// ];

// // contoh pakai data dummy, dan kenapa ditaro diluar komponen Home karena data ini constant/tidak berubah-ubah. ditaro luar biar ga jadi beban, karena setiap render akan dihitung ulang

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // biasanya dalam fetching data dari API, kita harus setup 2 variable. 1 untuk menyimpan data, dan 1 lagi untuk menyimpan error yang kemungkinan terjadi.
  // dalam hal ini variable/state movies untuk menyimpan data, dan variable/state error untuk menyimpan error. sedangkan loading hanya untuk indicator yang menunjukan proses fetching data

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      console.log(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* search form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movie-grid">
          {/* {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(searchQuery) && (
                <MovieCard key={movie.id} movie={movie} />
              )
          )} */}

          {/* menggunakan filter dan some untuk probabilitas input dengan nama alias */}
          {movies
            .filter((movie) => {
              const possibleNames = [
                movie.title, // Judul yang diberikan API dalam bahasa utama. misal "Your Name"
                movie.original_title, // Judul asli dalam bahasa asli film. misal "Kimi no Nawa" (Japanese)
              ];

              return possibleNames.some(
                (name) =>
                  name && name.toLowerCase().includes(searchQuery.toLowerCase())
              );
            })
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;

// There is a problem when the user searches for “tenki no ko” (original title) instead of "weathering with you", then the movie does not appear. but when the value of the searchQuery is “” or deleted then the movie suddenly appears
