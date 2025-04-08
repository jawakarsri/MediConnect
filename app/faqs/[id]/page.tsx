"use client";

import { faqs } from "@/data/faqs";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQPage({ params }: { params: { id: string } }) {
  const faq = faqs.find((f) => f.id === parseInt(params.id));
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  if (!faq) {
    return <div>FAQ not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Link href="/faqs">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to FAQs
        </Button>
      </Link>
      
      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">{faq.title}</h1>
        
        <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-8">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {faq.date}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {faq.readTime}
          </span>
        </div>

        <div className="whitespace-pre-wrap mb-8">{faq.content}</div>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLikes(likes + 1)}
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            {likes}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDislikes(dislikes + 1)}
          >
            <ThumbsDown className="w-4 h-4 mr-1" />
            {dislikes}
          </Button>
        </div>
      </article>
    </motion.div>
  );
} 