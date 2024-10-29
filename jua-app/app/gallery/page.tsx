import {  Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const posts = [
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
]

export default function InstagramGallery() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">주아의 선물 창고</span>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative group">
                <img
                  src={post.imageUrl}
                  alt={`Post ${post.id}`}
                  className="w-full h-auto object-cover aspect-square"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white text-center">
                    <p>{post.comments.length} comments</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-col space-y-2">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-semibold">{comment.user}:</span> {comment.text}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button variant="ghost" size="icon" className="rounded-l-none border-l-0">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}