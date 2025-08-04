import Novel from "../models/novel.model.js";
import Genre from "../models/genre.model.js";
import User from "../models/user.model.js";
import Review from "../models/review.model.js";

const fetchTopNovels = async (req, res) => {
  try {
    const novels = await Novel.find().sort({ views: -1 }).limit(5).lean();
    return res.status(200).json(novels);
  } catch (error) {
    console.error("Error fetching top novels:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const encodeGenres = (novelGenre, allGenres) => {
  return allGenres.map((genre) => (novelGenre.includes(genre) ? 1 : 0));
};

const averageVectors = (vectors) => {
  if (vectors.length === 0) return [];

  const length = vectors[0].length;
  const avg = Array(length).fill(0);

  vectors.forEach((vec) => {
    for (let i = 0; i < length; i++) {
      avg[i] += vec[i];
    }
  });

  for (let i = 0; i < length; i++) {
    avg[i] /= vectors.length;
  }
  return avg;
};

const cosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
};

export const handleRecommendNovels = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return fetchTopNovels(req, res);
    }

    const userId = req.user._id.toString();

    const allGenres = await Genre.find().distinct("name").lean();

    const bookmarks = await User.findById(userId).select("bookmarks").lean();
    if (
      !bookmarks ||
      !bookmarks.bookmarks ||
      bookmarks.bookmarks.length === 0
    ) {
      return fetchTopNovels(req, res);
    }
    const allBookmarks = bookmarks.bookmarks;

    const reviewedNovels = await Review.find({ user: userId }).distinct(
      "novel"
    );

    const bookmarksStr = allBookmarks.map((id) => id.toString());
    const reviewedStr = reviewedNovels.map((id) => id.toString());

    const interactedNovelIds = [...new Set([...bookmarksStr, ...reviewedStr])];

    if (interactedNovelIds.length === 0) {
      return fetchTopNovels(req, res);
    }

    const interactedNovels = await Novel.find({
      _id: { $in: interactedNovelIds },
    })
      .select("genres")
      .lean();

    const interactedVectors = interactedNovels.map((novel) =>
      encodeGenres(novel.genres, allGenres)
    );

    const userProfileVector = averageVectors(interactedVectors);

    const candidateNovels = await Novel.find({
      _id: { $nin: interactedNovelIds },
    })
      .select("genres title image status")
      .lean();

    if (candidateNovels.length === 0) {
      return fetchTopNovels(req, res);
    }

    const scoredCandidates = candidateNovels.map((novel) => ({
      novel,
      score: cosineSimilarity(
        userProfileVector,
        encodeGenres(novel.genres, allGenres)
      ),
    }));

    scoredCandidates.sort((a, b) => b.score - a.score);

    let topCandidates = scoredCandidates.slice(0, 5).map(({ novel }) => novel);

    if (topCandidates.length < 5) {
      const topCandidateIds = topCandidates.map((novel) =>
        novel._id.toString()
      );
      const remainingCount = 5 - topCandidates.length;

      const popularFallbacks = await Novel.find({
        _id: {
          $nin: [...interactedNovelIds, ...topCandidateIds],
        },
      })
        .sort({ views: -1 })
        .limit(remainingCount)
        .select("genres title image status")
        .lean();

      topCandidates = [...topCandidates, ...popularFallbacks];
    }

    return res.status(200).json(topCandidates);
  } catch (error) {
    console.error("Error in handleRecommendNovels:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
