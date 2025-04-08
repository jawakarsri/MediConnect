"use client";

import { useState } from "react";
import { articles } from "@/data/articles";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ArticlesPage() {
  const [articleLikes, setArticleLikes] = useState<{ [key: number]: number }>(
    articles.reduce((acc, article) => ({ ...acc, [article.id]: 0 }), {})
  );
  const [articleDislikes, setArticleDislikes] = useState<{ [key: number]: number }>(
    articles.reduce((acc, article) => ({ ...acc, [article.id]: 0 }), {})
  );

  const handleLike = (articleId: number) => {
    setArticleLikes((prev) => ({
      ...prev,
      [articleId]: prev[articleId] + 1,
    }));
  };

  const handleDislike = (articleId: number) => {
    setArticleDislikes((prev) => ({
      ...prev,
      [articleId]: prev[articleId] + 1,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Health Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <h2 className="text-2xl font-semibold">{article.title}</h2>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLike(article.id)}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {articleLikes[article.id]}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDislike(article.id)}
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    {articleDislikes[article.id]}
                  </Button>
                </div>
                <Link href={`/articles/${article.id}`}>
                  <Button>Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 