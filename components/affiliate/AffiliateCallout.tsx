import { ExternalLink, Sparkles, Star, ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AffiliateCalloutProps {
  title: string
  description: string
  badge?: string
  affiliateUrl: string
  discountCode?: string
  toolName: string
  price?: string
  rating?: number
  merchant?: string
  imageUrl?: string | null
}

export function AffiliateCallout({
  title,
  description,
  badge = "Recommended",
  affiliateUrl,
  discountCode,
  toolName,
  price,
  rating,
  merchant = "Amazon",
  imageUrl,
}: AffiliateCalloutProps) {
  const isAmazon = merchant?.toLowerCase() === "amazon"

  return (
    <aside className="my-8 rounded-xl border border-primary/25 bg-gradient-to-r from-primary/5 via-card to-card p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          {imageUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imageUrl}
              alt={title}
              className="w-16 h-16 rounded-lg object-contain bg-muted/60 border border-border p-1 shrink-0 hidden sm:block"
            />
          )}
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                {isAmazon ? "Recommended Gear" : "Recommended Tool"}
              </span>
              <Badge variant="success" className="text-[10px] py-0 gap-1">
                <Sparkles className="h-2.5 w-2.5" />
                {badge}
              </Badge>
              {rating && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  {rating}
                </span>
              )}
              {price && (
                <span className="text-[11px] font-bold text-foreground bg-muted px-2 py-0.5 rounded-full">
                  {price}
                </span>
              )}
            </div>

            <h4 className="text-base font-bold text-foreground">{title}</h4>
            <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
              {description}
            </p>

            {discountCode && (
              <p className="text-xs text-muted-foreground pt-0.5">
                Promo code: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] font-bold text-foreground">{discountCode}</code>
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
          <Button asChild size="sm" className="text-xs h-8 px-4">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {isAmazon ? "View on Amazon" : `Get ${toolName}`}
              <ExternalLink className="h-3 w-3 ml-0.5" />
            </a>
          </Button>
          <span className="text-[10px] text-muted-foreground/70">
            {isAmazon ? "Paid Amazon link" : "Sponsored / Affiliate Link"}
          </span>
        </div>
      </div>
    </aside>
  )
}

