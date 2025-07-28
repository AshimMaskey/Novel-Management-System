import {
  Star,
  BookOpen,
  MessageSquare,
  Eye,
  Share,
  Bookmark,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Make sure this exists in your UI kit
import { Link } from "react-router-dom";

export default function NovelPage() {
  return (
    <div className="min-h-screen containerBox from-purple-900 via-blue-900 to-green-800">
      <div className="absolute"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left - Cover */}
          <div className="flex-shrink-0">
            <div className="w-64 h-80 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-lg shadow-2xl overflow-hidden">
              {/* Cover content... */}
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <div className="text-center mb-4">
                  <div className="text-yellow-300 text-xl font-bold mb-2">
                    4人のママの
                  </div>
                  <div className="text-lg">せいで</div>
                  <div className="text-blue-200">俺のラブコメが</div>
                </div>
                <img
                  src="https://i.pinimg.com/1200x/a5/6e/f4/a56ef456eda88242fe7767863620e47b.jpg"
                  alt=""
                />
                <div className="text-center mt-4">
                  <div className="text-red-300 text-lg font-bold">
                    ママちゃんと
                  </div>
                  <div className="text-sm">ナックル</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Info + Tabs */}
          <div className="flex-1">
            {/* Title, Subtitle, Author */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Shadow Slave
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-2">
              Because of Four Moms, My Rom-Coms Turning into a Mom-Com
            </p>
            <p className="text-lg text-gray-300 mb-6">Knuckle Curve</p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2">
                <Bookmark className="w-5 h-5" />
                Add To Library
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Start Reading
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg">
                <Share className="w-5 h-5" />
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "SUGGESTIVE",
                "COMEDY",
                "HAREM",
                "WEBCOMIC",
                "SLICE OF LIFE",
                "SUPERNATURAL",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">
                  PUBLICATION: 2025, ONGOING
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-6 text-gray-300">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-orange-500" />
                <span className="text-orange-500 font-semibold">7.16</span>
              </div>
              <div className="flex items-center gap-1">
                <Bookmark className="w-5 h-5" />
                <span>13K</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-5 h-5" />
                <span>14</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-5 h-5" />
                <span>N/A</span>
              </div>
            </div>

            {/* Description + Tabs */}
            <Tabs defaultValue="description" className="w-full mt-6">
              <TabsList className="bg-gray-800 rounded-lg p-1 flex space-x-2">
                <TabsTrigger
                  value="description"
                  className="text-white data-[state=active]:bg-orange-500 px-4 py-2 rounded"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="chapters"
                  className="text-white data-[state=active]:bg-orange-500 px-4 py-2 rounded"
                >
                  Chapters
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="text-white data-[state=active]:bg-orange-500 px-4 py-2 rounded"
                >
                  Comments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
                  <p className="text-gray-200 leading-relaxed">
                    Takumi, a high school boy living with his overly
                    affectionate, beautiful stepmom and in love with his
                    childhood friend, is at that age where romance blooms. One
                    day, his stepmom mysteriously splits into four!? Each
                    mom—yandere, tsundere, childish, and more—has her own unique
                    personality and supports (or interferes with) Takumi's love
                    life in her own way. A heartwarming (?) "mom-com" with four
                    moms begins!
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="chapters" className="mt-4">
                <div className="bg-gray-900 rounded-lg p-4 text-white">
                  <ul className="space-y-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <Link to={"/chapter"}>
                        <li
                          key={i}
                          className="border-b border-gray-700 py-2 hover:text-orange-400 cursor-pointer"
                        >
                          Chapter {i + 1}: Title of Chapter {i + 1}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-4">
                <div className="bg-gray-900 rounded-lg p-4 text-white">
                  <p className="mb-2 text-gray-400">User Comments</p>
                  <ul className="space-y-4">
                    {[
                      "Great start!",
                      "Hilarious!",
                      "Can’t wait for next chapter",
                    ].map((comment, idx) => (
                      <li key={idx} className="border-b border-gray-700 pb-2">
                        <p className="text-sm">{comment}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          — User {idx + 1}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
