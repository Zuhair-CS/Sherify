import Link from "next/link"
const Form = ({ type, post, setPost ,submitting ,handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-center flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Post</span>
      </h1>
      <p className="desc text-center">
        {type} compelling blogs and share your voice with the world — unleash your creativity without limits
      </p>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-3xl flex flex-col gap-7 glassmorphism">
        <label >
          <span className="font-satoshi font-semibold text-base text-white ">Write Your Blog here.</span>
          <textarea value={post.blog} onChange={(e) => setPost({ ...post, blog: e.target.value })}
          placeholder="Write your blog here" className="form_textarea glassmorphism bg-gray-300" required></textarea>
        </label>
        <label >
          <span className="font-satoshi font-semibold text-base text-white">Tag {' '}
            <span>#morningThoughts, #webDevelopment, #Traveling </span>
          </span>
          <input value={post.tag} onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="#tag" className="form_textarea glassmorphism bg-gray-300" required ></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href ="/" className="text-white text-sm">Cancel</Link>
          <button type="submit" disabled = {submitting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {type }
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form