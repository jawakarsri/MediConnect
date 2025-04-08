"use client";

import { useState } from "react";
import { educationVideos } from "@/data/education-videos";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function EducationPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">Patient Education Videos</h1>
        <p className="text-muted-foreground mb-8">
          Learn about various health topics through our curated video collection
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedVideo(video.videoId)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mt-3">{video.title}</h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                      {video.category}
                    </span>
                    <span className="flex items-center ml-3">
                      <Clock className="w-4 h-4 mr-1" />
                      {video.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{video.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => setSelectedVideo(video.videoId)}
                  >
                    Watch Video
                    <Play className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 