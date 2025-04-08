"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FAQsPage() {
  const [faqLikes, setFaqLikes] = useState<{ [key: number]: number }>(
    faqs.reduce((acc, faq) => ({ ...acc, [faq.id]: 0 }), {})
  );
  const [faqDislikes, setFaqDislikes] = useState<{ [key: number]: number }>(
    faqs.reduce((acc, faq) => ({ ...acc, [faq.id]: 0 }), {})
  );

  const handleLike = (faqId: number) => {
    setFaqLikes((prev) => ({
      ...prev,
      [faqId]: prev[faqId] + 1,
    }));
  };

  const handleDislike = (faqId: number) => {
    setFaqDislikes((prev) => ({
      ...prev,
      [faqId]: prev[faqId] + 1,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqs.map((faq) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <h2 className="text-2xl font-semibold">{faq.title}</h2>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {faq.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {faq.readTime}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{faq.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLike(faq.id)}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {faqLikes[faq.id]}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDislike(faq.id)}
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    {faqDislikes[faq.id]}
                  </Button>
                </div>
                <Link href={`/faqs/${faq.id}`}>
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