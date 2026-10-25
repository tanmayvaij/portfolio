import Script from "next/script"

interface AdSenseScriptProps {
  clientId?: string
}

export function AdSenseScript({
  clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
}: AdSenseScriptProps) {
  // If user hasn't set their actual ID yet, don't inject the AdSense script
  const isConfigured = Boolean(clientId && clientId !== "ca-pub-0000000000000000")

  if (!isConfigured) {
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

