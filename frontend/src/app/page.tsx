export default function HomePage() {
  return (
    <section className="px-4 py-12 max-w-5xl mx-auto space-y-24">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Hey, I'm Sweth 👋
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A fullstack developer building elegant and scalable applications.
          Welcome to my portfolio.
        </p>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold">About Me</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          I'm a developer with a passion for clean code, modern UIs, and
          building useful tools. I specialize in React, Next.js, FastAPI, and
          Python. When I’m not coding, I enjoy writing, learning, and
          contributing to open-source.
        </p>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <p className="text-muted-foreground">
          Coming soon: A showcase of my best work.
        </p>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold">Latest Blog Posts</h2>
        <p className="text-muted-foreground">
          Articles about web dev, tools, and tutorials — coming soon.
        </p>
      </div>
    </section>
  );
}
