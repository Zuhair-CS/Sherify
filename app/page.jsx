import Feed from "@components/Feed"
function Home() {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover and share
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center">Amazing Blogs</span>
        </h1>
        <p className="desc text-center">Sherify is a tool for modern world to discover, create and share creative Blogs</p>
        <Feed/>
    </section>
  )
}

export default Home