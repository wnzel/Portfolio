import Landing from "@/components/Landing/Landing";
import FeaturedProjects from "@/components/Landing/FeaturedProjects/FeaturedProjects";
import Skills from "@/components/Landing/Skills/Skills";
import SpotifyNowPlaying from "@/components/SpotifyWidget/SpotifyWidget";

function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col gap-8 w-full md:w-[736px] md:self-center">
        <Landing />
        <FeaturedProjects />
        <Skills />
      </div>
      <SpotifyNowPlaying />
    </>
  );
}

export default Home;
