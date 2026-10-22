import Script from "next/script"

interface AdSenseScriptProps {
  clientId?: string
}

export function AdSenseScript({
  clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000",
}: AdSenseScriptProps) {
  // If user hasn't set their actual ID yet, we don't render live script in dev to prevent errors
  const isPlaceholder = clientId === "ca-pub-0000000000000000"

  if (isPlaceholder) {
    return null
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
    />
  )
}

