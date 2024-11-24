'use client'
import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from 'next/image'


const initialPosts = [
  { id: 1, imageUrl: "/placeholder.svg?height=300&width=300", comments: [
    { user: "user1", text: "Great photo!" },
    { user: "user2", text: "Love this!" }
  ]},
  { id: 2, imageUrl: "/placeholder.svg?height=300&width=300", comments: [
    { user: "user3", text: "Amazing shot!" }
  ]},
  { id: 3, imageUrl: "/placeholder.svg?height=300&width=300", comments: [
    { user: "user4", text: "Incredible!" },
    { user: "user5", text: "Wow!" }
  ]},
  { id: 4, imageUrl: "/placeholder.svg?height=300&width=300", comments: [
    { user: "user6", text: "Nice one!" }
  ]},
  { id: 5, imageUrl: "/placeholder.svg?height=300&width=300", comments: [
    { user: "user7", text: "Beautiful!" },
    { user: "user8", text: "Stunning!" },
    { user: "user9", text: "Fantastic!" }
  ]},
  { id: 6, imageUrl: "/placeholder.svg?height=300&width=300", comments: [
    { user: "user10", text: "Great work!" }
  ]},
];

export default function Gallery() {
  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useState(initialPosts);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef(null);

  const fetchMorePosts = async () => {
    // 포스트를 더 가져오는 로직
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMorePosts();
      }
    });

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [fetchMorePosts]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#b5c0d0' }}>
      <header className="border-b" style={{ backgroundColor: '#eed3d9' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div>
                <span className="text-2xl font-bold">주아의 선물 창고</span>
                <br />
                <span className="text-l font-bold">-오빠의 선택을 기다리는 물건들...........</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                {/* Avatar 컴포넌트 내용 */}
              </Avatar>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.map((post) => (
          <div key={post.id} className="mb-8">
             <Image
                src={post.imageUrl}
                alt={`Post ${post.id}`}
                width={500}
                height={500}
                layout="responsive"
              />
                <p>{post.comments.map(comment => (
                <span key={comment.user}>{comment.user}: {comment.text}<br/></span>
              ))}</p>
          </div>
        ))}
        <div ref={observerRef} />
      </main>
    </div>
  );
}