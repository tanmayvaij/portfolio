"use client";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = ["all", "frontend", "backend", "fullstack", "android", "devops"];

export function CategoryTabs({ current }: { current: string }) {
  const router = useRouter();

  return (
    <Tabs defaultValue={current} onValueChange={(value) => router.push(`/projects/${value}`)}>
      <TabsList>
        {categories.map((cat) => (
          <TabsTrigger key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
