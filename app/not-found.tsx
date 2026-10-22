import Link from "next/link"
import { Home, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4 max-w-md">
        <span className="text-6xl font-extrabold text-primary">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Page Not Found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The technical article or resource you are looking for may have been relocated or updated.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button asChild size="sm">
            <Link href="/" className="gap-1.5">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/blog" className="gap-1.5">
              <BookOpen className="h-4 w-4" />
              Read Blog
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
